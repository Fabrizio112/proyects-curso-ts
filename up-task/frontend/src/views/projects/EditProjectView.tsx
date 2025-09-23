import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getProjectById } from "../../services/ProjectService";
import EditProjectForm from "../../components/projects/EditProjectForm";

function EditProjectView() {
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId)
    })
    if (isLoading) return "Cargando ..."
    if (isError) return <Navigate to="/404" />
    if (data) return <EditProjectForm data={data} projectId={projectId} />
}

export default EditProjectView;