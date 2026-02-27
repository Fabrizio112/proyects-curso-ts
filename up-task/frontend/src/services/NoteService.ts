import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { Note, NoteFormData, Project, Task } from "../types"

type NoteApiType = {
    formData: NoteFormData,
    projectId: Project["_id"],
    taskId: Task["_id"],
    noteId: Note["_id"]
}


export async function createNote({ projectId, taskId, formData }: Pick<NoteApiType, "projectId" | "taskId" | "formData">) {
    try {
        const url = `/notes/${projectId}/tasks/${taskId}`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error("Hubo un error al crear la nota")
        }
    }
}

export async function deleteNote({ projectId, taskId, noteId }: Pick<NoteApiType, "projectId" | "taskId" | "noteId">) {
    try {
        const url = `/notes/${projectId}/tasks/${taskId}/${noteId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error("Hubo un error al crear la nota")
        }
    }
}