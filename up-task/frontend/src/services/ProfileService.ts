import { isAxiosError } from "axios";
import type { UpdatePasswordProfile, UserProfileForm } from "../types";
import api from "../lib/axios";


export async function updateProfile(formData: UserProfileForm) {
    try {
        const { data } = await api.put<string>("/profile", formData)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error("Hubo un error al crear la nota")
        }
    }
}
export async function updatePassword(formData: UpdatePasswordProfile) {
    try {
        const { data } = await api.post<string>("/profile/update-password", formData)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error("Hubo un error al crear la nota")
        }
    }
}