"use client"
import type React from "react"
import Link from "next/link"
import { BarChart3, Dumbbell, LayoutDashboard, Settings, Users, UserCircle, UsersRound } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Groups",
    href: "/admin/groups",
    icon: UsersRound,
  },
  {
    title: "Workouts",
    href: "/admin/workouts",
    icon: Dumbbell,
  },
  {
    title: "Trainers",
    href: "/admin/trainers",
    icon: UserCircle,
  },
  {
    title: "Statistics",
    href: "/admin/statistics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  return (
    <nav className="grid items-start gap-2 p-4">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start gap-2 px-2")}
        >
          <item.icon className="h-5 w-5" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

