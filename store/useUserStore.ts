import { create } from "zustand"
import { devtools } from "zustand/middleware"
import USERS_API from "@/lib/api/users-api"
import type { User } from "@/types/user"
import type { Role } from "@/types/user"

// Fallback mock data for when the API is unavailable
const MOCK_USERS: User[] = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin", // Use string value directly
    accountStatus: "active", // Use string value directly
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "trainer", // Use string value directly
    accountStatus: "active", // Use string value directly
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user", // Use string value directly
    accountStatus: "inactive", // Use string value directly
    createdAt: new Date().toISOString(),
  },
]

interface UserState {
  users: User[]
  isLoading: boolean
  error: string | null
  selectedUser: User | null
  isOfflineMode: boolean

  // Actions
  fetchUsers: () => Promise<void>
  deleteUser: (id: string) => Promise<void>
  updateUserRole: (id: string, role: Role) => Promise<void>
  selectUser: (user: User | null) => void
}

const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      users: [],
      isLoading: false,
      error: null,
      selectedUser: null,
      isOfflineMode: false,

      fetchUsers: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await USERS_API.getAll()
          set({ users: response.data, isLoading: false, isOfflineMode: false })
        } catch (error) {
          console.error("Error fetching users:", error)

          // If it's a network error, switch to offline mode with mock data
          if (error instanceof Error && error.message === "Network Error") {
            console.log("Network error detected, switching to offline mode with mock data")
            set({
              users: MOCK_USERS,
              error: "Network error: Using offline mode with sample data. Please check your API connection.",
              isLoading: false,
              isOfflineMode: true,
            })
          } else {
            set({
              error: error instanceof Error ? error.message : "Failed to fetch users",
              isLoading: false,
            })
          }
        }
      },

      deleteUser: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
          // If in offline mode, just update the local state
          if (get().isOfflineMode) {
            set((state) => ({
              users: state.users.filter((user) => user._id !== id),
              isLoading: false,
            }))
            return
          }

          await USERS_API.delete(id)
          // Remove the deleted user from the state
          set((state) => ({
            users: state.users.filter((user) => user._id !== id),
            isLoading: false,
          }))
        } catch (error) {
          console.error("Error deleting user:", error)
          set({
            error: error instanceof Error ? error.message : "Failed to delete user",
            isLoading: false,
          })
        }
      },

      updateUserRole: async (id: string, role: Role) => {
        set({ isLoading: true, error: null })
        try {
          // If in offline mode, just update the local state
          if (get().isOfflineMode) {
            set((state) => ({
              users: state.users.map((user) => (user._id === id ? { ...user, role } : user)),
              isLoading: false,
            }))
            return
          }

          await USERS_API.updateRole(id, role)
          // Update the user in the state
          set((state) => ({
            users: state.users.map((user) => (user._id === id ? { ...user, role } : user)),
            isLoading: false,
          }))
        } catch (error) {
          console.error("Error updating user role:", error)
          set({
            error: error instanceof Error ? error.message : "Failed to update user role",
            isLoading: false,
          })
        }
      },

      selectUser: (user: User | null) => {
        set({ selectedUser: user })
      },
    }),
    { name: "user-store" }
  )
)

export default useUserStore