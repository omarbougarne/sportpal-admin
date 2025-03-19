import type { CreateUserDto, UpdateUserDto, User } from "@/lib/types/user"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch users:", error)
    throw error
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch user with ID ${id}:`, error)
    throw error
  }
}

export async function createUser(userData: CreateUserDto): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to create user:", error)
    throw error
  }
}

export async function updateUser(id: string, userData: UpdateUserDto): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to update user with ID ${id}:`, error)
    throw error
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
  } catch (error) {
    console.error(`Failed to delete user with ID ${id}:`, error)
    throw error
  }
}

export async function updateUserRole(id: string, role: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users/${id}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ role }),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to update role for user with ID ${id}:`, error)
    throw error
  }
}

