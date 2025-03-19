import { z } from "zod"

// Enums from your schema
export enum Role {
  Admin = "admin",
  User = "user",
  Trainer = "trainer",
  GroupAdmin = "groupAdmin",
}

export enum Level {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
  Professional = "professional",
}

export enum Availability {
  Weekdays = "weekdays",
  Weekends = "weekends",
  Evenings = "evenings",
  Mornings = "mornings",
  Flexible = "flexible",
}

export enum AccountStatus {
  Active = "active",
  Inactive = "inactive",
  Suspended = "suspended",
  Pending = "pending",
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

// Zod schema for validation
export const userSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  profileImageUrl: z.string().url().optional().nullable(),
  favoriteSports: z.array(z.nativeEnum(Sport)).optional(),
  level: z.nativeEnum(Level).optional(),
  availability: z.nativeEnum(Availability).optional(),
  role: z.nativeEnum(Role).default(Role.User),
  preferences: z.record(z.any()).optional(),
  contactInfo: z.record(z.any()).optional(),
  accountStatus: z.nativeEnum(AccountStatus).optional(),
  location: z
    .object({
      type: z.string().default("Point"),
      coordinates: z.array(z.number()).length(2),
    })
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type User = z.infer<typeof userSchema>

export const createUserSchema = userSchema.omit({ _id: true, createdAt: true, updatedAt: true })
export type CreateUserDto = z.infer<typeof createUserSchema>

export const updateUserSchema = userSchema
  .omit({ _id: true, password: true, createdAt: true, updatedAt: true })
  .partial()
export type UpdateUserDto = z.infer<typeof updateUserSchema>

