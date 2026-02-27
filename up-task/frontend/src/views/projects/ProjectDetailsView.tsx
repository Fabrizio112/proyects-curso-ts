import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../services/ProjectService";
import AddTaskModal from "../../components/tasks/AddTaskModal";
import TaskList from "../../components/tasks/TaskList";
import EditTaskData from "../../components/tasks/EditTaskData";
import TaskModalDetails from "../../components/tasks/TaskModalDetail";
import { useAuth } from "../../hooks/useAuth";
import isManager from "../../helper/policies";
import { useMemo } from "react";

function ProjectDetailsView() {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data: userData, isLoading: authLoading } = useAuth()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId)
    })

    const canEdit = useMemo(() => data?.manager == userData?._id, [data, userData])

    if (isLoading && authLoading) return "Cargando ..."
    if (isError) return <Navigate to="/404" />
    if (data && userData) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            {isManager(data.manager, userData._id) && (
                <nav className="my-5 flex gap-3">
                    <button type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate("?newTask=true")}>Agregar Tarea</button>
                    <Link to={"team"} className="bg-fuchsia-400 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors">Colaboradores</Link>
                </nav>
            )}

            <TaskList tasks={data.tasks} canEdit={canEdit} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}

export default ProjectDetailsView;