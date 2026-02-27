import { useMemo } from "react";
import { formatDate } from "../../helper";
import { useAuth } from "../../hooks/useAuth";
import type { Note } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/NoteService";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
    note: Note
}
function NoteDetail({ note }: NoteDetailProps) {
    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const querySearch = new URLSearchParams(location.search)
    const taskId = querySearch.get("viewTask")!
    const { data, isLoading } = useAuth()
    const queryClient = useQueryClient()

    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["task", taskId] })
            toast.success(data)
        }
    })
    if (isLoading) return "Cargando ..."
    const handleDelete = () => {
        mutate({ projectId, taskId, noteId: note._id })
    }
    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por : <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500 ">
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete && <button onClick={handleDelete} className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors rounded-lg">Eliminar</button>}
        </div>);
}

export default NoteDetail;