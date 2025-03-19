import { create } from 'zustand';
import WORKOUTS_API from '@/lib/api/workout-api';
import type { Workout } from '@/types/workout';

interface WorkoutQuery {
    page?: number;
    limit?: number;
    search?: string;
    difficulty?: string;
    muscleGroup?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

interface WorkoutState {
    workouts: Workout[];
    selectedWorkout: Workout | null;
    isLoading: boolean;
    error: string | null;
    totalWorkouts: number;

    // Admin actions
    fetchWorkouts: (query?: WorkoutQuery) => Promise<void>;
    fetchWorkoutById: (id: string) => Promise<void>;
    createWorkout: (data: Omit<Workout, '_id' | 'createdAt' | 'updatedAt'>) => Promise<Workout>;
    updateWorkout: (id: string, data: Partial<Workout>) => Promise<Workout>;
    deleteWorkout: (id: string) => Promise<void>;
    fetchUserWorkouts: (userId: string) => Promise<void>;
    fetchMyWorkouts: () => Promise<void>;
}

const useWorkoutStore = create<WorkoutState>((set, get) => ({
    workouts: [],
    selectedWorkout: null,
    isLoading: false,
    error: null,
    totalWorkouts: 0,

    fetchWorkouts: async (query?: WorkoutQuery) => {
        set({ isLoading: true, error: null });
        try {
            const response = await WORKOUTS_API.getAll(query);
            set({
                workouts: Array.isArray(response.data) ? response.data : response.data || [],
                totalWorkouts: 'total' in response ? (response.total as number) : response.data.length,
                isLoading: false
            });
        } catch (err: any) {
            console.error("Error fetching workouts:", err);
            set({ isLoading: false, error: err.message || 'Failed to fetch workouts' });
        }
    },

    fetchWorkoutById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const workout = await WORKOUTS_API.getById(id);
            set({ selectedWorkout: workout.data, isLoading: false });
        } catch (err: any) {
            console.error("Error fetching workout details:", err);
            set({ isLoading: false, error: err.message || 'Failed to fetch workout details' });
        }
    },

    createWorkout: async (data: Omit<Workout, '_id' | 'createdAt' | 'updatedAt'>) => {
        set({ isLoading: true, error: null });
        try {
            const response = await WORKOUTS_API.create(data);
            const newWorkout = response.data;
            set(state => ({
                workouts: [newWorkout, ...state.workouts],
                isLoading: false
            }));
            return newWorkout;
        } catch (err: any) {
            console.error("Error creating workout:", err);
            set({ isLoading: false, error: err.message || 'Failed to create workout' });
            throw err;
        }
    },

    updateWorkout: async (id: string, data: Partial<Workout>) => {
        set({ isLoading: true, error: null });
        try {
            const response = await WORKOUTS_API.update(id, data);
            const updatedWorkout = response.data;
            set(state => ({
                workouts: state.workouts.map(workout =>
                    workout._id === id ? updatedWorkout : workout
                ),
                selectedWorkout: updatedWorkout,
                isLoading: false
            }));
            return updatedWorkout;
        } catch (err: any) {
            console.error("Error updating workout:", err);
            set({ isLoading: false, error: err.message || 'Failed to update workout' });
            throw err;
        }
    },

    deleteWorkout: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await WORKOUTS_API.delete(id);
            set(state => ({
                workouts: state.workouts.filter(workout => workout._id !== id),
                isLoading: false
            }));
        } catch (err: any) {
            console.error("Error deleting workout:", err);
            set({ isLoading: false, error: err.message || 'Failed to delete workout' });
            throw err;
        }
    },

    fetchUserWorkouts: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await WORKOUTS_API.getUserWorkouts(userId);
            set({
                workouts: response.data,
                isLoading: false
            });
        } catch (err: any) {
            console.error("Error fetching user workouts:", err);
            set({ isLoading: false, error: err.message || 'Failed to fetch user workouts' });
        }
    },

    fetchMyWorkouts: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await WORKOUTS_API.getMyWorkouts();
            set({
                workouts: response.data,
                isLoading: false
            });
        } catch (err: any) {
            console.error("Error fetching my workouts:", err);
            set({ isLoading: false, error: err.message || 'Failed to fetch my workouts' });
        }
    }
}));

export default useWorkoutStore;