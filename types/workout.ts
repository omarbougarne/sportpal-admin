// Define workout types
export const WorkoutType = {
    Strength: "strength",
    Cardio: "cardio",
    Flexibility: "flexibility",
    HIIT: "hiit",
    CrossFit: "crossfit",
    Custom: "custom",
} as const

export type WorkoutType = (typeof WorkoutType)[keyof typeof WorkoutType]

export const WorkoutStatus = {
    Draft: "draft",
    Published: "published",
    Archived: "archived",
} as const

export type WorkoutStatus = (typeof WorkoutStatus)[keyof typeof WorkoutStatus]

export interface Exercise {
    name: string;
    sets?: number;
    reps?: number;
    duration?: number;
    distance?: number;
    weight?: number;
    notes?: string;
}

export interface Workout {
    _id: string;
    title: string;
    description?: string;
    type: WorkoutType;
    status: WorkoutStatus;
    duration?: number; // in minutes
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    exercises: Exercise[];
    tags?: string[];
    creator: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateWorkoutDto {
    title: string;
    description?: string;
    type: WorkoutType;
    status?: WorkoutStatus;
    duration?: number;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    exercises: Exercise[];
    tags?: string[];
    creator?: string; // This will be set by the backend
}

export interface UpdateWorkoutDto {
    title?: string;
    description?: string;
    type?: WorkoutType;
    status?: WorkoutStatus;
    duration?: number;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    exercises?: Exercise[];
    tags?: string[];
}

export interface QueryWorkoutDto {
    type?: WorkoutType;
    status?: WorkoutStatus;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    creator?: string;
    search?: string;
    limit?: number;
    page?: number;
}