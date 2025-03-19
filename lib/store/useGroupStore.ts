import { create } from "zustand"
import { devtools } from "zustand/middleware"
import GROUPS_API from "@/lib/api/group-api"
import type { Group, GroupStatus } from "@/types/group"

// Fallback mock data for when the API is unavailable
const MOCK_GROUPS: Group[] = [
    {
        _id: "1",
        name: "Morning HIIT",
        description: "High-intensity interval training every morning",
        sport: "fitness",
        activity: "hiit",
        members: [
            {
                userId: "1",
                name: "John Doe",
                profileImageUrl: "/placeholder.svg?height=40&width=40"
            },
            {
                userId: "2",
                name: "Jane Smith",
                profileImageUrl: "/placeholder.svg?height=40&width=40"
            }
        ],
        organizer: {
            userId: "1",
            name: "John Doe",
            profileImageUrl: "/placeholder.svg?height=40&width=40"
        },
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    },
    {
        _id: "2",
        name: "Yoga Enthusiasts",
        description: "A group for yoga lovers of all levels",
        sport: "yoga",
        activity: "stretching",
        members: [
            {
                userId: "1",
                name: "John Doe",
                profileImageUrl: "/placeholder.svg?height=40&width=40"
            },
            {
                userId: "3",
                name: "Alice Johnson",
                profileImageUrl: "/placeholder.svg?height=40&width=40"
            }
        ],
        organizer: {
            userId: "3",
            name: "Alice Johnson",
            profileImageUrl: "/placeholder.svg?height=40&width=40"
        },
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    },
    {
        _id: "3",
        name: "Weekend Warriors",
        description: "For those who train hard on weekends",
        sport: "crossfit",
        activity: "strength",
        members: [
            {
                userId: "2",
                name: "Jane Smith",
                profileImageUrl: "/placeholder.svg?height=40&width=40"
            },
            {
                userId: "4",
                name: "Bob Williams",
                profileImageUrl: "/placeholder.svg?height=40&width=40"
            }
        ],
        organizer: {
            userId: "4",
            name: "Bob Williams",
            profileImageUrl: "/placeholder.svg?height=40&width=40"
        },
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    },
    {
        _id: "4",
        name: "Running Club",
        description: "Weekly running sessions for all levels",
        sport: "running",
        activity: "cardio",
        members: [
            {
                userId: "1",
                name: "John Doe",
                profileImageUrl: "/placeholder.svg?height=40&width=40"
            },
            {
                userId: "5",
                name: "Sarah Miller",
                profileImageUrl: "/placeholder.svg?height=40&width=40"
            }
        ],
        organizer: {
            userId: "5",
            name: "Sarah Miller",
            profileImageUrl: "/placeholder.svg?height=40&width=40"
        },
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    },
]

interface GroupState {
    groups: Group[]
    selectedGroup: Group | null
    isLoading: boolean
    error: string | null
    isOfflineMode: boolean

    // Actions
    fetchGroups: () => Promise<void>
    fetchGroupById: (id: string) => Promise<void>
    createGroup: (groupData: Partial<Group>) => Promise<void>
    updateGroup: (id: string, groupData: Partial<Group>) => Promise<void>
    deleteGroup: (id: string) => Promise<void>
    joinGroup: (groupName: string) => Promise<void>
    leaveGroup: (groupId: string) => Promise<void>
    removeMember: (groupId: string, userId: string) => Promise<void>
    searchGroups: (searchTerm: string) => Promise<void>
    getUserGroups: (userId: string) => Promise<void>
    setSelectedGroup: (group: Group | null) => void
    clearError: () => void
}

const useGroupStore = create<GroupState>()(
    devtools(
        (set, get) => ({
            groups: [],
            selectedGroup: null,
            isLoading: false,
            error: null,
            isOfflineMode: false,

            fetchGroups: async () => {
                set({ isLoading: true, error: null })
                try {
                    const response = await GROUPS_API.getAll()
                    set({ groups: response.data, isLoading: false, isOfflineMode: false })
                } catch (error) {
                    console.error("Error fetching groups:", error)

                    // If it's a network error, switch to offline mode with mock data
                    if (error instanceof Error && error.message === "Network Error") {
                        console.log("Network error detected, switching to offline mode with mock data")
                        set({
                            groups: MOCK_GROUPS,
                            error: "Network error: Using offline mode with sample data. Please check your API connection.",
                            isLoading: false,
                            isOfflineMode: true,
                        })
                    } else {
                        set({
                            error: error instanceof Error ? error.message : "Failed to fetch groups",
                            isLoading: false,
                        })
                    }
                }
            },

            fetchGroupById: async (id: string) => {
                set({ isLoading: true, error: null })
                try {
                    // If in offline mode, find the group in the mock data
                    if (get().isOfflineMode) {
                        const group = MOCK_GROUPS.find(g => g._id === id)
                        if (group) {
                            set({ selectedGroup: group, isLoading: false })
                        } else {
                            set({
                                error: "Group not found in offline mode",
                                isLoading: false
                            })
                        }
                        return
                    }

                    const response = await GROUPS_API.getById(id)
                    set({ selectedGroup: response.data, isLoading: false })
                } catch (error) {
                    console.error("Error fetching group:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to fetch group",
                        isLoading: false,
                    })
                }
            },

            createGroup: async (groupData: Partial<Group>) => {
                set({ isLoading: true, error: null })
                try {
                    // If in offline mode, simulate creating a group
                    if (get().isOfflineMode) {
                        const newGroup: Group = {
                            _id: `mock-${Date.now()}`,
                            name: groupData.name || "New Group",
                            description: groupData.description || "",
                            members: [{
                                userId: "1", // Mock user ID
                                name: "Current User",
                                profileImageUrl: "/placeholder.svg?height=40&width=40"
                            }],
                            organizer: {
                                userId: "1", // Mock user ID
                                name: "Current User",
                                profileImageUrl: "/placeholder.svg?height=40&width=40"
                            },
                            ...groupData,
                            createdAt: new Date().toISOString(),
                        } as Group

                        set(state => ({
                            groups: [...state.groups, newGroup],
                            isLoading: false
                        }))
                        return
                    }

                    const response = await GROUPS_API.create(groupData)
                    set(state => ({
                        groups: [...state.groups, response.data],
                        isLoading: false,
                    }))
                } catch (error) {
                    console.error("Error creating group:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to create group",
                        isLoading: false,
                    })
                }
            },

            updateGroup: async (id: string, groupData: Partial<Group>) => {
                set({ isLoading: true, error: null })
                try {
                    // If in offline mode, update the group in the local state
                    if (get().isOfflineMode) {
                        set(state => ({
                            groups: state.groups.map(group =>
                                group._id === id ? { ...group, ...groupData } : group
                            ),
                            selectedGroup: state.selectedGroup?._id === id
                                ? { ...state.selectedGroup, ...groupData }
                                : state.selectedGroup,
                            isLoading: false,
                        }))
                        return
                    }

                    const response = await GROUPS_API.update(id, groupData)
                    set(state => ({
                        groups: state.groups.map(group =>
                            group._id === id ? response.data : group
                        ),
                        selectedGroup: state.selectedGroup?._id === id
                            ? response.data
                            : state.selectedGroup,
                        isLoading: false,
                    }))
                } catch (error) {
                    console.error("Error updating group:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to update group",
                        isLoading: false,
                    })
                }
            },

            deleteGroup: async (id: string) => {
                set({ isLoading: true, error: null })
                try {
                    // If in offline mode, just remove from local state
                    if (get().isOfflineMode) {
                        set(state => ({
                            groups: state.groups.filter(group => group._id !== id),
                            selectedGroup: state.selectedGroup?._id === id ? null : state.selectedGroup,
                            isLoading: false,
                        }))
                        return
                    }

                    await GROUPS_API.delete(id)
                    set(state => ({
                        groups: state.groups.filter(group => group._id !== id),
                        selectedGroup: state.selectedGroup?._id === id ? null : state.selectedGroup,
                        isLoading: false,
                    }))
                } catch (error) {
                    console.error("Error deleting group:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to delete group",
                        isLoading: false,
                    })
                }
            },

            joinGroup: async (groupName: string) => {
                set({ isLoading: true, error: null })
                try {
                    // If in offline mode, simulate joining a group
                    if (get().isOfflineMode) {
                        const groupIndex = get().groups.findIndex(g => g.name === groupName)
                        if (groupIndex === -1) {
                            throw new Error("Group not found")
                        }

                        const updatedGroups = [...get().groups]
                        const group = { ...updatedGroups[groupIndex] }

                        // Add current user to members
                        group.members = [
                            ...group.members,
                            {
                                userId: "1", // Mock user ID
                                name: "Current User",
                                profileImageUrl: "/placeholder.svg?height=40&width=40"
                            }
                        ]

                        updatedGroups[groupIndex] = group

                        set({
                            groups: updatedGroups,
                            selectedGroup: get().selectedGroup?._id === group._id ? group : get().selectedGroup,
                            isLoading: false
                        })
                        return
                    }

                    const response = await GROUPS_API.joinGroup(groupName)

                    // Update the groups list and selected group if needed
                    set(state => {
                        const updatedGroups = state.groups.map(group =>
                            group.name === groupName ? response.data : group
                        )

                        return {
                            groups: updatedGroups,
                            selectedGroup: state.selectedGroup?.name === groupName
                                ? response.data
                                : state.selectedGroup,
                            isLoading: false
                        }
                    })
                } catch (error) {
                    console.error("Error joining group:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to join group",
                        isLoading: false,
                    })
                }
            },

            leaveGroup: async (groupId: string) => {
                set({ isLoading: true, error: null })
                try {
                    // If in offline mode, simulate leaving a group
                    if (get().isOfflineMode) {
                        const groupIndex = get().groups.findIndex(g => g._id === groupId)
                        if (groupIndex === -1) {
                            throw new Error("Group not found")
                        }

                        const updatedGroups = [...get().groups]
                        const group = { ...updatedGroups[groupIndex] }

                        // Remove current user from members
                        group.members = group.members.filter(member => member.userId !== "1") // Mock user ID

                        updatedGroups[groupIndex] = group

                        set({
                            groups: updatedGroups,
                            selectedGroup: get().selectedGroup?._id === groupId ? group : get().selectedGroup,
                            isLoading: false
                        })
                        return
                    }

                    const response = await GROUPS_API.leaveGroup(groupId)

                    // Update the groups list and selected group if needed
                    set(state => {
                        const updatedGroups = state.groups.map(group =>
                            group._id === groupId ? response.data : group
                        )

                        return {
                            groups: updatedGroups,
                            selectedGroup: state.selectedGroup?._id === groupId
                                ? response.data
                                : state.selectedGroup,
                            isLoading: false
                        }
                    })
                } catch (error) {
                    console.error("Error leaving group:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to leave group",
                        isLoading: false,
                    })
                }
            },

            removeMember: async (groupId: string, userId: string) => {
                set({ isLoading: true, error: null })
                try {
                    // If in offline mode, simulate removing a member
                    if (get().isOfflineMode) {
                        const groupIndex = get().groups.findIndex(g => g._id === groupId)
                        if (groupIndex === -1) {
                            throw new Error("Group not found")
                        }

                        const updatedGroups = [...get().groups]
                        const group = { ...updatedGroups[groupIndex] }

                        // Remove member
                        group.members = group.members.filter(member => member.userId !== userId)

                        updatedGroups[groupIndex] = group

                        set({
                            groups: updatedGroups,
                            selectedGroup: get().selectedGroup?._id === groupId ? group : get().selectedGroup,
                            isLoading: false
                        })
                        return
                    }

                    await GROUPS_API.removeMember(groupId, userId)

                    // Update the groups list and selected group if needed
                    set(state => {
                        const updatedGroups = state.groups.map(group => {
                            if (group._id === groupId) {
                                return {
                                    ...group,
                                    members: group.members.filter(member => member.userId !== userId)
                                }
                            }
                            return group
                        })

                        let updatedSelectedGroup = state.selectedGroup
                        if (state.selectedGroup?._id === groupId) {
                            updatedSelectedGroup = {
                                ...state.selectedGroup,
                                members: state.selectedGroup.members.filter(member => member.userId !== userId)
                            }
                        }

                        return {
                            groups: updatedGroups,
                            selectedGroup: updatedSelectedGroup,
                            isLoading: false
                        }
                    })
                } catch (error) {
                    console.error("Error removing member:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to remove member",
                        isLoading: false,
                    })
                }
            },

            searchGroups: async (searchTerm: string) => {
                set({ isLoading: true, error: null })
                try {
                    // If in offline mode, filter the mock data
                    if (get().isOfflineMode) {
                        const filteredGroups = MOCK_GROUPS.filter(group =>
                            group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (group.sport && group.sport.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (group.activity && group.activity.toLowerCase().includes(searchTerm.toLowerCase()))
                        )

                        set({
                            groups: filteredGroups,
                            isLoading: false
                        })
                        return
                    }

                    const response = await GROUPS_API.searchGroups(searchTerm)
                    set({
                        groups: response.data,
                        isLoading: false
                    })
                } catch (error) {
                    console.error("Error searching groups:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to search groups",
                        isLoading: false,
                    })
                }
            },

            getUserGroups: async (userId: string) => {
                set({ isLoading: true, error: null })
                try {
                    // If in offline mode, filter the mock data
                    if (get().isOfflineMode) {
                        const userGroups = MOCK_GROUPS.filter(group =>
                            group.members.some(member => member.userId === userId)
                        )

                        set({
                            groups: userGroups,
                            isLoading: false
                        })
                        return
                    }

                    const response = await GROUPS_API.getUserGroups(userId)
                    set({
                        groups: response.data,
                        isLoading: false
                    })
                } catch (error) {
                    console.error("Error fetching user groups:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to fetch user groups",
                        isLoading: false,
                    })
                }
            },

            setSelectedGroup: (group: Group | null) => {
                set({ selectedGroup: group })
            },

            clearError: () => {
                set({ error: null })
            },
        }),
        { name: "group-store" }
    )
)

export default useGroupStore