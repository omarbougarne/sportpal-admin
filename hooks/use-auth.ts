"use client"

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { Role } from "@/lib/types/user"

interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
    role: Role
  } | null
  isLoading: boolean

  // Actions
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isLoading: true,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          // Mock login for now - replace with actual API call
          // const response = await fetch('/api/auth/login', {...})

          // Simulate successful login
          await new Promise((resolve) => setTimeout(resolve, 500))

          set({
            isAuthenticated: true,
            user: {
              id: "1",
              name: "Admin User",
              email,
              role: Role.Admin,
            },
            isLoading: false,
          })
        } catch (error) {
          console.error("Login failed:", error)
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          // Mock logout - replace with actual API call
          // await fetch('/api/auth/logout', {...})

          // Simulate successful logout
          await new Promise((resolve) => setTimeout(resolve, 300))

          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          })
        } catch (error) {
          console.error("Logout failed:", error)
          set({ isLoading: false })
          throw error
        }
      },

      checkAuth: async () => {
        set({ isLoading: true })
        try {
          // Mock auth check - replace with actual API call
          // const response = await fetch('/api/auth/me', {...})

          // Simulate auth check
          await new Promise((resolve) => setTimeout(resolve, 500))

          // For demo purposes, we'll assume the user is authenticated
          set({
            isAuthenticated: true,
            user: {
              id: "1",
              name: "Admin User",
              email: "admin@example.com",
              role: Role.Admin,
            },
            isLoading: false,
          })
        } catch (error) {
          console.error("Auth check failed:", error)
          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          })
        }
      },
    }),
    { name: "auth-store" },
  ),
)

