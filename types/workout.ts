

export interface Workout {
    _id: string;
    title: string;
    description?: string;
    exercises: Exercise[];
    difficulty: string;
    duration: number;
    muscleGroups: string[];
    creator: string;
    createdAt: string;
    updatedAt: string;
}

export interface Exercise {
    name: string;
    sets: number;
    reps: number;
    restTime?: number;
    weight?: number;
}

export interface WorkoutQuery {
    page?: number;
    limit?: number;
    search?: string;
    difficulty?: string;
    muscleGroup?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface WorkoutCreateData {
    title: string;
    description?: string;
    exercises: Exercise[];
    difficulty: string;
    duration: number;
    muscleGroups: string[];
}

export interface WorkoutUpdateData {
    title?: string;
    description?: string;
    exercises?: Exercise[];
    difficulty?: string;
    duration?: number;
    muscleGroups?: string[];
}

