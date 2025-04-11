import { useEffect, useMemo, useReducer } from "react"
import Formulario from "./components/Form"
import { contadorCaloriasReducer, initialState } from "./reducer/contadorCaloriasReducer"
import ContadorCaloriasList from "./components/ContadorCaloriasList"
import CaloriesTracker from "./components/CaloriesTracker"

function App() {
  const[state,dispatch]=useReducer(contadorCaloriasReducer,initialState)
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
        <Formulario dispatch={dispatch} state={state}/>
      </div>

    <section className="bg-gray-800 py-10">
      <div className="max-w-4xl mx-auto">
        <CaloriesTracker activities={state.activities}/>
      </div>
    </section>


     </section>
     <section className="p-10 mx-auto max-w-4xl">
        <ContadorCaloriasList activities={state.activities} dispatch={dispatch}/>
     </section>
    </>
  )
}

export default App
