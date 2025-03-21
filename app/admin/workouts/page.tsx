"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useWorkoutStore from "@/store/useWorkoutStore"
import { type Workout, WorkoutType } from "@/types/workout"
import { formatDistanceToNow } from "date-fns"

export default function WorkoutsPage() {
  const { workouts = [], isLoading, error, fetchWorkouts, deleteWorkout } = useWorkoutStore()
  const [workoutToDelete, setWorkoutToDelete] = useState<Workout | null>(null)

  useEffect(() => {
    fetchWorkouts()
  }, [fetchWorkouts])

  const handleDeleteWorkout = async () => {
    if (workoutToDelete) {
      await deleteWorkout(workoutToDelete._id)
      setWorkoutToDelete(null)
    }
  }

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case WorkoutType.Strength:
        return "default"
      case WorkoutType.Cardio:
        return "secondary"
      case WorkoutType.Flexibility:
        return "outline"
      case WorkoutType.HIIT:
        return "destructive"
      case WorkoutType.CrossFit:
        return "default"
      default:
        return "outline"
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown"
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "Unknown date"
    }
  }

  // Ensure workouts is always an array
  const workoutsList = Array.isArray(workouts) ? workouts : []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Workouts</h2>
        <Button onClick={() => window.location.href = "/admin/workouts/create"}>
          Create Workout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workout Management</CardTitle>
          <CardDescription>Manage your fitness workouts and routines.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4">Error: {error}</div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workout Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-5 w-[200px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-[100px]" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-9 w-[100px] ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : workoutsList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      No workouts found
                    </TableCell>
                  </TableRow>
                ) : (
                  workoutsList.map((workout) => (
                    <TableRow key={workout._id}>
                      <TableCell className="font-medium">{workout.title}</TableCell>
                      <TableCell>
                        <Badge variant={getTypeBadgeVariant(workout.type)} className="capitalize">
                          {workout.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(workout.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Workout Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => window.location.href = `/admin/workouts/${workout._id}`}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `/admin/workouts/${workout._id}/edit`}>
                              Edit Workout
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setWorkoutToDelete(workout)}
                            >
                              Delete Workout
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Workout Confirmation Dialog */}
      <AlertDialog open={!!workoutToDelete} onOpenChange={(open) => !open && setWorkoutToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the workout <span className="font-semibold">{workoutToDelete?.title}</span> and remove all
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
    </div>
  )
}