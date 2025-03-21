import axiosClient from "./axios-client"
import type { Workout, CreateWorkoutDto, UpdateWorkoutDto, QueryWorkoutDto } from "@/types/workout"

// Define the API endpoints for workout management
const WORKOUTS_API = {
    getAll: (query?: QueryWorkoutDto) => {
        const queryParams = new URLSearchParams();

        if (query) {
            Object.entries(query).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const queryString = queryParams.toString();
        return axiosClient.get<Workout[]>(`/workouts${queryString ? `?${queryString}` : ''}`);
    },

    getById: (id: string) => axiosClient.get<Workout>(`/workouts/${id}`),

    getWorkouts: () => axiosClient.get<Workout[]>('/workouts'),

    create: (workoutData: CreateWorkoutDto) => axiosClient.post<Workout>('/workouts', workoutData),

    update: (id: string, workoutData: UpdateWorkoutDto) =>
        axiosClient.patch<Workout>(`/workouts/${id}`, workoutData),

    delete: (id: string) => axiosClient.delete<void>(`/workouts/${id}`),
}

export default WORKOUTS_API