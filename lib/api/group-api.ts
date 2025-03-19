import axiosClient from "./axios-client"
import type { Group, MemberInfo } from "@/types/group"

// Define the API endpoints for group management
const GROUPS_API = {
    getAll: () => axiosClient.get<Group[]>("/groups"),
    getById: (id: string) => axiosClient.get<Group>(`/groups/${id}`),
    create: (groupData: Partial<Group>) => axiosClient.post<Group>("/groups/create", groupData),
    update: (id: string, groupData: Partial<Group>) => axiosClient.patch<Group>(`/groups/${id}`, groupData),
    delete: (id: string) => axiosClient.delete<void>(`/groups/${id}`),

    // Member management
    getMembers: (id: string) => axiosClient.get<MemberInfo[]>(`/groups/${id}/members`),
    joinGroup: (groupName: string) => axiosClient.post<Group>(`/groups/${groupName}/join`, {}),
    leaveGroup: (id: string) => axiosClient.post<Group>(`/groups/${id}/leave`, {}),
    removeMember: (groupId: string, userId: string) =>
        axiosClient.delete<void>(`/groups/${groupId}/members/${userId}`),

    // Search
    searchGroups: (searchTerm: string) => axiosClient.get<Group[]>(`/groups/search?name=${searchTerm}`),

    // User's groups
    getUserGroups: (userId: string) => axiosClient.get<Group[]>(`/groups/member/${userId}`),
}

export default GROUPS_API