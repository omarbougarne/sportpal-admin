"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/hooks/use-auth"
import type { Role } from "@/lib/types/user"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: Role
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { isAuthenticated, user, isLoading, checkAuth } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check authentication status when component mounts
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=" + encodeURIComponent(pathname))
      return
    }

    // If authenticated but doesn't have required role, redirect to dashboard
    if (!isLoading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      router.push("/admin")
    }
  }, [isLoading, isAuthenticated, user, router, pathname, requiredRole])

  // Show nothing while loading or if not authenticated
  if (isLoading || !isAuthenticated) {
    return null
  }

  // If role is required and user doesn't have it, show nothing
  if (requiredRole && user?.role !== requiredRole) {
    return null
  }

  // Otherwise, render children
  return <>{children}</>
}

