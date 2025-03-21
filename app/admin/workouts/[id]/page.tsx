"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Calendar, Clock, Dumbbell, Trash2, Edit } from 'lucide-react'
import useWorkoutStore from "@/store/useWorkoutStore"
import { type Workout, Exercise } from "@/types/workout"

export default function WorkoutDetailPage() {
  const params = useParams()
  const router = useRouter()
  const workoutId = params.id as string
  const { fetchWorkoutById, selectedWorkout, isLoading, error, deleteWorkout, isOfflineMode } = useWorkoutStore()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    if (workoutId) {
      fetchWorkoutById(workoutId)
    }
  }, [workoutId, fetchWorkoutById])

  const handleDeleteWorkout = async () => {
    try {
      await deleteWorkout(workoutId)
      router.push("/admin/workouts")
    } catch (err) {
      console.error("Error deleting workout:", err)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "N/A"
    if (minutes < 60) {
      return `${minutes} minutes`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes > 0 ? `${remainingMinutes} minutes` : ''}`
  }

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "strength":
        return "default"
      case "cardio":
        return "secondary"
      case "flexibility":
        return "outline"
      case "hiit":
        return "destructive"
      case "crossfit":
        return "default"
      default:
        return "outline"
    }
  }

  const getDifficultyBadgeVariant = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "outline"
      case "intermediate":
        return "secondary"
      case "advanced":
        return "destructive"
      default:
        return "outline"
    }
  }

  const renderExerciseDetails = (exercise: Exercise) => {
    const details = []

    if (exercise.sets) details.push(`${exercise.sets} sets`)
    if (exercise.reps) details.push(`${exercise.reps} reps`)
    if (exercise.weight) details.push(`${exercise.weight} lbs`)
    if (exercise.duration) {
      if (exercise.duration < 60) {
        details.push(`${exercise.duration} sec`)
      } else {
        const minutes = Math.floor(exercise.duration / 60)
        const seconds = exercise.duration % 60
        details.push(`${minutes}:${seconds.toString().padStart(2, '0')} min`)
      }
    }
    if (exercise.distance) details.push(`${exercise.distance} miles`)

    return details.length > 0 ? details.join(' • ') : 'No details provided'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workouts
        </Button>
        {!isLoading && selectedWorkout && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push(`/admin/workouts/${workoutId}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Workout
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Workout
            </Button>
          </div>
        )}
      </div>

      {isLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <Skeleton className="h-40 w-full md:w-1/3 rounded-md" />
              <div className="space-y-4 flex-1">
                <Skeleton className="h-6 w-1/2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">{error}</div>
            <Button className="mt-4" onClick={() => router.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      ) : selectedWorkout ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedWorkout.title}</CardTitle>
                  <CardDescription>{selectedWorkout.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getTypeBadgeVariant(selectedWorkout.type)} className="capitalize">
                    {selectedWorkout.type}
                  </Badge>
                  {selectedWorkout.difficulty && (
                    <Badge variant={getDifficultyBadgeVariant(selectedWorkout.difficulty)} className="capitalize">
                      {selectedWorkout.difficulty}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center p-3 border rounded-md">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p>{formatDuration(selectedWorkout.duration)}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 border rounded-md">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p>{formatDate(selectedWorkout.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 border rounded-md">
                  <Dumbbell className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Exercises</p>
                    <p>{selectedWorkout.exercises.length} exercises</p>
                  </div>
                </div>
              </div>

              {selectedWorkout.tags && selectedWorkout.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorkout.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator className="my-6" />

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Exercises</h3>
                <div className="space-y-4">
                  {selectedWorkout.exercises.map((exercise, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{exercise.name}</h4>
                        <span className="text-sm text-muted-foreground">#{index + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{renderExerciseDetails(exercise)}</p>
                      {exercise.notes && (
                        <p className="text-sm mt-2 italic">{exercise.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delete Workout Confirmation Dialog */}
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete the workout <span className="font-semibold">{selectedWorkout.title}</span> and remove all
                  associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteWorkout}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : null}
    </div>
  )
}