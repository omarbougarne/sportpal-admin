"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import {
  type User,
  createUserSchema,
  updateUserSchema,
  Role,
  Level,
  Availability,
  AccountStatus,
  Sport,
} from "@/lib/types/user"
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert"

interface UserFormProps {
  user?: User
  onSubmit: (data: any) => void
  isLoading: boolean
  error: string | null
  mode: "create" | "edit"
}

export function UserForm({ user, onSubmit, isLoading, error, mode }: UserFormProps) {
  const schema = mode === "create" ? createUserSchema : updateUserSchema

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "create"
        ? {
            name: "",
            email: "",
            password: "",
            role: Role.User,
            accountStatus: AccountStatus.Active,
            favoriteSports: [],
          }
        : {
            name: user?.name || "",
            email: user?.email || "",
            role: user?.role || Role.User,
            level: user?.level || undefined,
            availability: user?.availability || undefined,
            accountStatus: user?.accountStatus || AccountStatus.Active,
            profileImageUrl: user?.profileImageUrl || "",
            favoriteSports: user?.favoriteSports || [],
          },
  })

  useEffect(() => {
    if (user && mode === "edit") {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        level: user.level,
        availability: user.availability,
        accountStatus: user.accountStatus || AccountStatus.Active,
        profileImageUrl: user.profileImageUrl || "",
        favoriteSports: user.favoriteSports || [],
      })
    }
  }, [user, form, mode])

  const sportOptions = Object.values(Sport).map((sport) => ({
    value: sport,
    label: sport.charAt(0).toUpperCase() + sport.slice(1),
  }))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertIcon.Error className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mode === "create" && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Role).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fitness Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Level).map((level) => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Availability).map((availability) => (
                    <SelectItem key={availability} value={availability}>
                      {availability.charAt(0).toUpperCase() + availability.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(AccountStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profileImageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="favoriteSports"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Sports</FormLabel>
              <FormControl>
                <MultiSelect
                  options={sportOptions}
                  selected={field.value || []}
                  onChange={field.onChange}
                  placeholder="Select sports"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : mode === "create" ? "Create User" : "Update User"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

