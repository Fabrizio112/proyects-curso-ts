import { FormEvent, useMemo, useState } from "react";
import useBudget from "../hooks/useBudget";

function DefinirPresupuesto() {
    const{dispatch}=useBudget()

    const[budget,setBudget]=useState(0)
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setBudget(+e.target.value)
    }
    const isValid=useMemo(()=>budget > 0 ,[budget])
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({type:"add-budget",payload:{budget}})
    }


    return ( 
    <section className="bg-white mx-auto max-w-3xl shadow-lg rounded-lg mt-10 p-10">
        <h2 className="text-center text-3xl text-blue-600 font-bold">Definir Presupuesto</h2>
        <form action="" className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
            <input onChange={handleChange} type="number" placeholder="Define tu presupuesto" value={budget} className="p-2 border-slate-200 border-1 rounded-md"/>
            <button disabled={!isValid} type="submit" className="bg-blue-700 p-2 text-white uppercase font-bold disabled:opacity-10 cursor-pointer">Definir Presupuesto</button>
        </form>
    </section> );
}

export default DefinirPresupuesto;