import type React from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Role } from "@/lib/types/user"

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthGuard requiredRole={Role.Admin}>{children}</AuthGuard>
}

