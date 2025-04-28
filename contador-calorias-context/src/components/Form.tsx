import { ChangeEvent, FormEvent, useMemo, useState, useEffect } from "react";
import type { ContadorCalorias } from "../types";
import {v4 as uuidv4} from "uuid"
import { useContador } from "../hooks/useContador";

function Formulario() {
    const{state,dispatch}=useContador()
    const initialStateCalorias : ContadorCalorias={
        id:uuidv4(),
        category:1,
        activity:"",
        calories:0
    }
    const[contadorCalorias,setContadorCalorias]=useState<ContadorCalorias>(initialStateCalorias)
    useEffect(()=>{
        if(state.activityID){
            const activitySelected=state.activities.filter(activity => activity.id == state.activityID)[0]
            setContadorCalorias(activitySelected)
        }
    },[state.activityID])

    const handleChange=(e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
        const isNumberField=["category","calories"].includes(e.target.id)

        setContadorCalorias({
            ...contadorCalorias,
            [e.target.id]:isNumberField ? +e.target.value:e.target.value
                })
    }  
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        dispatch({type:"save-activity",payload:{newActivity:contadorCalorias}})
       
        setContadorCalorias({
            ...initialStateCalorias,
            id:uuidv4()
        })
    }
    const isFull=useMemo(()=>contadorCalorias.activity.trim() != "" && contadorCalorias.calories > 0 ,[contadorCalorias])

    return ( 
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
            <label htmlFor="category" className="font-bold">Categoria : </label>
            <select 
            name="" 
            id="category" 
            className="border border-slate-300 p-2 rounded-lg" 
            value={contadorCalorias.category}
            onChange={handleChange}>
                <option value="1">Comida</option>
                <option value="2">Ejercicio</option>
            </select>
        </div>
        <div className="flex flex-col gap-3">
            <label htmlFor="activity" className="font-bold">Actividad : </label>
            <input 
            value={contadorCalorias.activity} 
            type="text" 
            id="activity" 
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej: Comida ,Jugo de Naranja, Ejercicio ,Pesas ,Saltar la soga"
            onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-3">
            <label htmlFor="calories" className="font-bold">Calorias : </label>
            <input 
            value={contadorCalorias.calories} 
            type="number" 
            id="calories" 
            className="border border-slate-300 p-2 rounded-lg" 
            placeholder="Ej: 300 o 600"
            onChange={handleChange}/>
        </div>
        <input disabled={!isFull} type="submit" className="bg-gray-800 disabled:bg-gray-400 hover:bg-gray-900 w-full p-2 font-bold text-white uppercase cursor-pointer" value={contadorCalorias.category == 1 ? "Agregar Comida" : "Agregar Ejercicio"}  />
    </form> );
}

export default Formulario;