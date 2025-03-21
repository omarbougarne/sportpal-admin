import { create } from "zustand"
import { devtools } from "zustand/middleware"
import WORKOUTS_API from "@/lib/api/workout-api"
import type { Workout, CreateWorkoutDto, UpdateWorkoutDto, QueryWorkoutDto } from "@/types/workout"

interface WorkoutState {
    workouts: Workout[]
    selectedWorkout: Workout | null
    isLoading: boolean
    error: string | null

    // Actions
    fetchWorkouts: (query?: QueryWorkoutDto) => Promise<void>
    fetchWorkoutById: (id: string) => Promise<void>
    deleteWorkout: (id: string) => Promise<void>
    setSelectedWorkout: (workout: Workout | null) => void
    clearError: () => void
}

const useWorkoutStore = create<WorkoutState>()(
    devtools(
        (set) => ({
            workouts: [], // Initialize as empty array
            selectedWorkout: null,
            isLoading: false,
            error: null,

            fetchWorkouts: async (query?: QueryWorkoutDto) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await WORKOUTS_API.getAll(query)
                    // Ensure response.data is an array
                    const workoutsData = Array.isArray(response.data) ? response.data : []
                    set({ workouts: workoutsData, isLoading: false })
                } catch (error) {
                    console.error("Error fetching workouts:", error)
                    set({
                        workouts: [], // Reset to empty array on error
                        error: error instanceof Error ? error.message : "Failed to fetch workouts",
                        isLoading: false,
                    })
                }
            },

            fetchWorkoutById: async (id: string) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await WORKOUTS_API.getById(id)
                    set({ selectedWorkout: response.data, isLoading: false })
                } catch (error) {
                    console.error("Error fetching workout:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to fetch workout",
                        isLoading: false,
                    })
                }
            },

            deleteWorkout: async (id: string) => {
                set({ isLoading: true, error: null })
                try {
                    await WORKOUTS_API.delete(id)
                    set(state => ({
                        workouts: state.workouts.filter(workout => workout._id !== id),
                        selectedWorkout: state.selectedWorkout?._id === id ? null : state.selectedWorkout,
                        isLoading: false,
                    }))
                } catch (error) {
                    console.error("Error deleting workout:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to delete workout",
                        isLoading: false,
                    })
                }
            },

            setSelectedWorkout: (workout: Workout | null) => {
                set({ selectedWorkout: workout })
            },

            clearError: () => {
                set({ error: null })
            },
        }),
        { name: "workout-store" }
    )
)

export default useWorkoutStore