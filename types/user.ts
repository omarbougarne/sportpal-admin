// Define enums as JavaScript objects so they exist at runtime
export const Role = {
  Admin: "admin",
  User: "user",
  Trainer: "trainer",
  Manager: "manager",
} as const

export type Role = (typeof Role)[keyof typeof Role]

export const AccountStatus = {
  Active: "active",
  Inactive: "inactive",
  Suspended: "suspended",
  Pending: "pending",
} as const

export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus]

export enum Level {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
  Expert = "expert",
}

export enum Availability {
  Weekdays = "weekdays",
  Weekends = "weekends",
  Evenings = "evenings",
  Mornings = "mornings",
  Flexible = "flexible",
}

export enum Sport {
  Running = "running",
  Swimming = "swimming",
  Cycling = "cycling",
  Yoga = "yoga",
  Weightlifting = "weightlifting",
  Basketball = "basketball",
  Soccer = "soccer",
  Tennis = "tennis",
  Hiking = "hiking",
  CrossFit = "crossfit",
}

export interface User {
  _id: string
  name: string
  email: string
  password?: string
  profileImageUrl?: string
  favoriteSports?: Sport[]
  level?: Level
  availability?: Availability
  role: Role
  preferences?: Record<string, any>
  contactInfo?: Record<string, any>
  accountStatus?: AccountStatus
  location?: {
    type: string
    coordinates: number[]
  }
  createdAt?: string
  updatedAt?: string
}