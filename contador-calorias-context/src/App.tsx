import { useEffect, useMemo } from "react"
import Formulario from "./components/Form"
import ContadorCaloriasList from "./components/ContadorCaloriasList"
import CaloriesTracker from "./components/CaloriesTracker"
import { useContador } from "./hooks/useContador"

function App() {
  const{state,dispatch}=useContador()
  useEffect(()=>{
    localStorage.setItem("activities",JSON.stringify(state?.activities))
  },[state?.activities])

const restartApp=useMemo(()=>state.activities.length > 0,[state.activities])

  return (
    <>
     <header className="bg-lime-300 py-3">
      <div className="max-w-4xl flex justify-between w-full mx-auto">
        <h1 className="font-black text-2xl text-white text-center">Contador de Calorias</h1>
        <button 
        disabled={!restartApp} 
        className="bg-gray-800 hover:bg-grey-900 disabled:bg-gray-200 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm"
        onClick={()=>dispatch({type:"restart-app"})} >
          Reiniciar App
        </button>
      </div>
     </header>
     <section className="bg-lime-500 py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <Formulario/>
      </div>

    <section className="bg-gray-800 py-10">
      <div className="max-w-4xl mx-auto">
        <CaloriesTracker/>
      </div>
    </section>


     </section>
     <section className="p-10 mx-auto max-w-4xl">
        <ContadorCaloriasList/>
     </section>
    </>
  )
}

export default App
