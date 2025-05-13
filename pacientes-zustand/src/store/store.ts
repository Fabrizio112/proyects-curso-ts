import { create } from "zustand";
import { Patient, PatientDraf } from "../types";
import { devtools ,persist} from "zustand/middleware";
import {v4 as uuidv4} from  "uuid"
 type PacienteState={
    patients:Patient[]
    activeId:Patient["id"]
    addPatient:(data:PatientDraf)=> void
    deletePatient:(id:Patient["id"])=>void
    getPatientById:(id:Patient["id"])=> void
    editPatient:(data:PatientDraf)=>void
}

const createPatient=(patient : PatientDraf) : Patient=>{
    return {...patient,id:uuidv4()}
}

export const usePacienteStore= create<PacienteState>()(
    devtools(
    persist((set)=>({
     patients:[],
     activeId:"",
     addPatient:(data)=>{
        const newPatient=createPatient(data)
        set((state)=>({
            patients:[...state.patients,newPatient]
        }))
     },
     deletePatient:(id)=>{
        set((state)=>({
            patients:state.patients.filter(paciente => paciente.id != id)
        }))
     },
     getPatientById:(id)=>{
        set(()=>({
            activeId:id
        }))
     },
     editPatient:(data)=>{
        set((state)=>({
            patients:state.patients.map(patient => patient.id === state.activeId ? {...data,id:state.activeId} :patient),
            activeId:""
        }))
     }
    }),{
        name:"patient-storage"
    })
))