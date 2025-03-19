import axiosClient from "./axios-client"
import type { User, Role } from "@/types/user"

// Define the API endpoints for user management
const USERS_API = {
  getAll: () => axiosClient.get<User[]>("/users"),
  getById: (id: string) => axiosClient.get<User>(`/users/${id}`),
  create: (userData: Partial<User>) => axiosClient.post<User>("/users", userData),
  update: (id: string, userData: Partial<User>) => axiosClient.patch<User>(`/users/${id}`, userData),
  delete: (id: string) => axiosClient.delete<User>(`/users/${id}`),
  updateRole: (id: string, role: Role) => axiosClient.patch<User>(`/users/${id}`, { role }),
}

export default USERS_API

