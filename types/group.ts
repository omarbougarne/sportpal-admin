// Define group types as JavaScript objects to avoid runtime errors
export const GroupType = {
    Class: "class",
    Challenge: "challenge",
    Club: "club",
    Team: "team",
} as const

export type GroupType = (typeof GroupType)[keyof typeof GroupType]

export const GroupStatus = {
    Active: "active",
    Inactive: "inactive",
    Archived: "archived",
    Pending: "pending",
} as const

export type GroupStatus = (typeof GroupStatus)[keyof typeof GroupStatus]

export interface MemberInfo {
    userId: string;
    name: string;
    profileImageUrl?: string;
}

export interface Location {
    type: string;
    coordinates: number[];
    city?: string;
    address?: string;
}

export interface Group {
    _id: string;
    name: string;
    description?: string;
    members: MemberInfo[];
    sport?: string;
    activity?: string;
    location?: Location | string;
    organizer: {
        userId: string;
        name: string;
        profileImageUrl?: string;
    };
    messages?: string[];
    createdAt?: string;
    updatedAt?: string;
}