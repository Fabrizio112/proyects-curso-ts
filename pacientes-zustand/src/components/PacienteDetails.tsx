import { usePacienteStore } from "../store/store";
import { Patient } from "../types";
import PacienteItemDetail from "./PacienteDetailItem";
import {toast} from "react-toastify"
type PacienteDetailsProps={
    paciente:Patient
}

function PacienteDetails({paciente}:PacienteDetailsProps) {
    const deletePatient=usePacienteStore((state)=> state.deletePatient)
    const getPatientById=usePacienteStore((state)=> state.getPatientById)

    const handleClick=()=>{
        deletePatient(paciente.id)
        toast.error("Paciente eliminado correctamente")
    }
    return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
        <PacienteItemDetail label="ID" data={paciente.id} />
        <PacienteItemDetail label="Nombre" data={paciente.name} />
        <PacienteItemDetail label="Cuidador" data={paciente.caretaker} />
        <PacienteItemDetail label="Email" data={paciente.email} />
        <PacienteItemDetail label="Simtomas" data={paciente.symptoms} />
        <div className="flex flex-row justify-between">
            <button onClick={()=>getPatientById(paciente.id)}className="cursor-pointer py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white font-bold uppercase rounded-lg">Editar</button>
            <button onClick={handleClick} className="cursor-pointer py-2 px-10 bg-red-600 hover:bg-red-800 text-white font-bold uppercase rounded-lg">Eliminar</button>
        </div>
    </div> );
}

export default PacienteDetails;