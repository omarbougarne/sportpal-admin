"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
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
import { ArrowLeft, MapPin, Calendar, Mail, Phone, Trash2, UserCog } from 'lucide-react'
import USERS_API from "@/lib/api/users-api"
import { type User, Role, AccountStatus } from "@/types/user"
import useUserStore from "@/store/useUserStore"

// Update the component to use the store for offline mode
export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string
  const { isOfflineMode } = useUserStore()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        // If in offline mode, get user from the store
        if (isOfflineMode) {
          const { users } = useUserStore.getState()
          const foundUser = users.find((u) => u._id === userId)
          if (foundUser) {
            setUser(foundUser)
          } else {
            setError("User not found in offline mode")
          }
          setIsLoading(false)
          return
        }

        const response = await USERS_API.getById(userId)
        setUser(response.data)
      } catch (err) {
        console.error("Error fetching user:", err)
        setError("Failed to load user details")
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId, isOfflineMode])

  const handleDeleteUser = async () => {
    try {
      if (isOfflineMode) {
        // Use the store's delete method which handles offline mode
        await useUserStore.getState().deleteUser(userId)
        router.push("/admin/users")
        return
      }

      await USERS_API.delete(userId)
      router.push("/admin/users")
    } catch (err) {
      console.error("Error deleting user:", err)
      setError("Failed to delete user")
    }
  }

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case Role.Admin:
        return "destructive"
      case Role.Trainer:
        return "strength"
      case Role.Manager:
        return "cardio"
      default:
        return "secondary"
    }
  }

  const getStatusBadgeVariant = (status?: string) => {
    switch (status) {
      case AccountStatus.Active:
        return "success"
      case AccountStatus.Inactive:
        return "secondary"
      case AccountStatus.Suspended:
        return "destructive"
      case AccountStatus.Pending:
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
        {!isLoading && user && (
          <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete User
          </Button>
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
              <Skeleton className="h-40 w-40 rounded-full mx-auto md:mx-0" />
              <div className="space-y-4 flex-1">
                <Skeleton className="h-6 w-1/2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-12 w-full" />
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
      ) : user ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getStatusBadgeVariant(user.accountStatus)}>{user.accountStatus || "Active"}</Badge>
                  <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="mx-auto md:mx-0">
                  <Avatar className="h-40 w-40">
                    <AvatarImage src={user.profileImageUrl} alt={user.name} />
                    <AvatarFallback className="text-4xl">{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-semibold">User Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 border rounded-md">
                      <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <UserCog className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Role</p>
                        <p className="capitalize">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-md">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Joined</p>
                        <p>{formatDate(user.createdAt)}</p>
                      </div>
                    </div>
                    {user.contactInfo?.phone && (
                      <div className="flex items-center p-3 border rounded-md">
                        <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p>{user.contactInfo.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Fitness Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {user.level && (
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground">Fitness Level</p>
                      <p className="font-medium capitalize">{user.level}</p>
                    </div>
                  )}
                  {user.availability && (
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground">Availability</p>
                      <p className="font-medium capitalize">{user.availability}</p>
                    </div>
                  )}
                  {user.location && (
                    <div className="p-4 border rounded-md">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        <p className="font-medium">
                          {user.location.coordinates[1].toFixed(2)}, {user.location.coordinates[0].toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {user.favoriteSports && user.favoriteSports.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Favorite Sports</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.favoriteSports.map((sport) => (
                        <Badge key={sport} variant="outline" className="capitalize">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete the user account for <span className="font-semibold">{user.name}</span>. This action
                  cannot be undone and all user data will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteUser}
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