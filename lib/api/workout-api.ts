import axiosClient from "./axios-client"
import type { Workout, Exercise } from "@/types/workout"

// Define the API endpoints for workout management
const WORKOUTS_API = {
    // Basic CRUD operations
    getAll: (query?: {
        page?: number;
        limit?: number;
        search?: string;
        difficulty?: string;
        muscleGroup?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }) => axiosClient.get<Workout[]>("/workouts", { params: query }),

    getById: (id: string) => axiosClient.get<Workout>(`/workouts/${id}`),

    create: (workoutData: Omit<Workout, '_id' | 'createdAt' | 'updatedAt'>) =>
        axiosClient.post<Workout>("/workouts", workoutData),

    update: (id: string, workoutData: Partial<Workout>) =>
        axiosClient.patch<Workout>(`/workouts/${id}`, workoutData),

    delete: (id: string) => axiosClient.delete<void>(`/workouts/${id}`),

    // User-specific operations
    getUserWorkouts: (userId: string) =>
        axiosClient.get<Workout[]>(`/workouts/user/${userId}`),

    getMyWorkouts: () => axiosClient.get<Workout[]>("/workouts/my-workouts"),

    // Search and filtering
    searchWorkouts: (searchTerm: string) =>
        axiosClient.get<Workout[]>(`/workouts?search=${searchTerm}`),

    getByDifficulty: (difficulty: string) =>
        axiosClient.get<Workout[]>(`/workouts?difficulty=${difficulty}`),

    getByMuscleGroup: (muscleGroup: string) =>
        axiosClient.get<Workout[]>(`/workouts?muscleGroup=${muscleGroup}`),
}

export default WORKOUTS_API