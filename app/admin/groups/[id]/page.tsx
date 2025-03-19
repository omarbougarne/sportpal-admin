"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { ArrowLeft, Calendar, MapPin, Users, Trash2, Edit, UserPlus, UserMinus } from 'lucide-react'
import useGroupStore from "@/store/useGroupStore"
import { type Group } from "@/types/group"

export default function GroupDetailPage() {
  const params = useParams()
  const router = useRouter()
  const groupId = params.id as string
  const { fetchGroupById, selectedGroup, isLoading, error, deleteGroup, removeMember, isOfflineMode } = useGroupStore()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null)

  useEffect(() => {
    if (groupId) {
      fetchGroupById(groupId)
    }
  }, [groupId, fetchGroupById])

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(groupId)
      router.push("/admin/groups")
    } catch (err) {
      console.error("Error deleting group:", err)
    }
  }

  const handleRemoveMember = async () => {
    if (memberToRemove) {
      await removeMember(groupId, memberToRemove)
      setMemberToRemove(null)
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Groups
        </Button>
        {!isLoading && selectedGroup && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push(`/admin/groups/${groupId}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Group
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Group
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
      ) : selectedGroup ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedGroup.name}</CardTitle>
                  <CardDescription>{selectedGroup.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {selectedGroup.sport && (
                    <Badge variant="outline" className="capitalize">
                      {selectedGroup.sport}
                    </Badge>
                  )}
                  {selectedGroup.activity && (
                    <Badge variant="outline" className="capitalize">
                      {selectedGroup.activity}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="members">Members ({selectedGroup.members.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Group Information</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center p-3 border rounded-md">
                          <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Created</p>
                            <p>{formatDate(selectedGroup.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 border rounded-md">
                          <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Members</p>
                            <p>{selectedGroup.members.length}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedGroup.location && typeof selectedGroup.location !== 'string' && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Location</h3>
                        <div className="p-3 border rounded-md">
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Address</p>
                              <p>{selectedGroup.location.city || 'Location coordinates available'}</p>
                              {selectedGroup.location.coordinates && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {selectedGroup.location.coordinates[1].toFixed(4)}, {selectedGroup.location.coordinates[0].toFixed(4)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Organizer</h3>
                    <div className="flex items-center p-3 border rounded-md">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={selectedGroup.organizer.profileImageUrl} alt={selectedGroup.organizer.name} />
                        <AvatarFallback>{getInitials(selectedGroup.organizer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedGroup.organizer.name}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="members" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Group Members</h3>
                    <Button size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                  </div>

                  {selectedGroup.members && selectedGroup.members.length > 0 ? (
                    <div className="space-y-4">
                      {selectedGroup.members.map((member) => (
                        <div key={member.userId} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.profileImageUrl} alt={member.name} />
                              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              {member.userId === selectedGroup.organizer.userId && (
                                <Badge variant="outline">Organizer</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {member.userId !== selectedGroup.organizer.userId && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive"
                                onClick={() => setMemberToRemove(member.userId)}
                              >
                                <UserMinus className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No members found in this group.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Delete Group Confirmation Dialog */}
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete the group <span className="font-semibold">{selectedGroup.name}</span> and remove all
                  associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteGroup}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Remove Member Confirmation Dialog */}
          <AlertDialog open={!!memberToRemove} onOpenChange={(open) => !open && setMemberToRemove(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove member?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove this member from the group?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRemoveMember}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : null}
    </div>
  )
}