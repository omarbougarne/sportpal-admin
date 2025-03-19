import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { getUsers, getUserById, createUser, updateUser, deleteUser, updateUserRole } from "@/lib/api/users"
import type { User, CreateUserDto, UpdateUserDto, Role } from "@/lib/types/user"

interface UserState {
  users: User[]
  selectedUser: User | null
  isLoading: boolean
  error: string | null

  // Actions
  fetchUsers: () => Promise<void>
  fetchUserById: (id: string) => Promise<void>
  addUser: (userData: CreateUserDto) => Promise<void>
  editUser: (id: string, userData: UpdateUserDto) => Promise<void>
  removeUser: (id: string) => Promise<void>
  changeUserRole: (id: string, role: Role) => Promise<void>
  setSelectedUser: (user: User | null) => void
  clearError: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      users: [],
      selectedUser: null,
      isLoading: false,
      error: null,

      fetchUsers: async () => {
        set({ isLoading: true, error: null })
        try {
          const users = await getUsers()
          set({ users, isLoading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to fetch users",
            isLoading: false,
          })
        }
      },

      fetchUserById: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
          const user = await getUserById(id)
          set({ selectedUser: user, isLoading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to fetch user",
            isLoading: false,
          })
        }
      },

      addUser: async (userData: CreateUserDto) => {
        set({ isLoading: true, error: null })
        try {
          const newUser = await createUser(userData)
          set((state) => ({
            users: [...state.users, newUser],
            isLoading: false,
          }))
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to create user",
            isLoading: false,
          })
        }
      },

      editUser: async (id: string, userData: UpdateUserDto) => {
        set({ isLoading: true, error: null })
        try {
          const updatedUser = await updateUser(id, userData)
          set((state) => ({
            users: state.users.map((user) => (user._id === id ? updatedUser : user)),
            selectedUser: state.selectedUser?._id === id ? updatedUser : state.selectedUser,
            isLoading: false,
          }))
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to update user",
            isLoading: false,
          })
        }
      },

      removeUser: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
          await deleteUser(id)
          set((state) => ({
            users: state.users.filter((user) => user._id !== id),
            selectedUser: state.selectedUser?._id === id ? null : state.selectedUser,
            isLoading: false,
          }))
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to delete user",
            isLoading: false,
          })
        }
      },

      changeUserRole: async (id: string, role: Role) => {
        set({ isLoading: true, error: null })
        try {
          const updatedUser = await updateUserRole(id, role)
          set((state) => ({
            users: state.users.map((user) => (user._id === id ? updatedUser : user)),
            selectedUser: state.selectedUser?._id === id ? updatedUser : state.selectedUser,
            isLoading: false,
          }))
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to update user role",
            isLoading: false,
          })
        }
      },

      setSelectedUser: (user: User | null) => {
        set({ selectedUser: user })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    { name: "user-store" },
  ),
)

