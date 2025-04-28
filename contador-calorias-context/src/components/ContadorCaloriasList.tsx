import { ContadorCalorias } from "../types";
import {PencilSquareIcon, XCircleIcon} from "@heroicons/react/24/outline"
import { useContador } from "../hooks/useContador";


function ContadorCaloriasList() {

    const{state,dispatch}=useContador()
    const {activities}=state
    const handleEdit=(id : ContadorCalorias["id"])=>{
        dispatch({type:"set-activityID",payload:{id:id}})
    }
    const handleDelete=(id : ContadorCalorias["id"])=>{
        dispatch({type:"delete-activity",payload:{id:id}})
    }


    return ( 
    <>
    <h2 className="text-4xl font-bold text-slate-600 text-center"> Comida y Actividades</h2>
    {activities.length > 0 ?
    activities.map(activity =>
    <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
        <div className="space-y-2 relative">
            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"}`}>
                {activity.category == 1 ? "Comida": "Ejercicio"}
            </p>
            <p className="text-2xl font-bold pt-5">
                {activity.activity}
            </p>
            <p className="font-black text-4xl text-lime-500">
                {activity.calories} {""}
                <span></span>
            </p>
        </div>
        <div className="flex gap-5 items-center">
            <button className="cursor-pointer" onClick={()=>handleEdit(activity.id)}>
                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
            </button>
            <button className="cursor-pointer" onClick={()=>handleDelete(activity.id)}>
                <XCircleIcon className="h-8 w-8 text-red-500" />
            </button>
        </div>
    </div>) : <h2 className="text-center my-5 ">No comida y/o actividades aun ...</h2>}
    </> );
}

export default ContadorCaloriasList;