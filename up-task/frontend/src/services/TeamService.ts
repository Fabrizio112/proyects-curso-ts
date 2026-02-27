import { isAxiosError } from "axios";
import { teamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from "../types";
import api from "../lib/axios";


export const findUserByEmail = async ({ projectId, formData }: { projectId: Project["_id"], formData: TeamMemberForm }) => {
    try {
        const url = `team/${projectId}/find`;
        const { data } = await api.post(url, formData);
        console.log(data)
        return data;
    } catch (error) {
        console.log('ERROR CAPTURADO:', error);
        if (isAxiosError(error) && error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}
export const addUserToProject = async ({ projectId, id }: { projectId: Project["_id"], id: TeamMember["_id"] }) => {
    try {
        const url = `/team/${projectId}`
        const { data } = await api.post(url, { id })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export const getProjectTeam = async (projectId: Project["_id"]) => {
    try {
        const url = `/team/${projectId}`
        const { data } = await api.get(url)
        const response = teamMembersSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export const removeUserFromProject = async ({ projectId, userId }: { projectId: Project["_id"], userId: TeamMember["_id"] }) => {
    try {
        const url = `/team/${projectId}/${userId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}