import { useMemo, useReducer } from "react"
import OrdenContent from "./components/OrdenContent"
import ProductoItem from "./components/Producto"
import { Productos } from "./data/db"
import { calculadoraPropinasReducer, initialStateCalculadoraPropinas } from "./reducer/calculadoraPropinasReducer"

function CalculadoraApp() {

    const[state,dispatch]=useReducer(calculadoraPropinasReducer,initialStateCalculadoraPropinas)
    const isEmpty=useMemo(()=>state.order.length>0,[state.order])
  return (
    <>
    <header className="bg-teal-400 py-5 ">
      <h1 className="text-4xl text-center font-black">Calculadora de Propinas y Consumo</h1>
    </header>
    <main className="max-w-7xl mx-auto mt-5 grid md:grid-cols-2  ">
      <div className="p-5">
        <h2 className="text-4xl font-black">Menú</h2>
        <div className="space-y-3 mt-8">
        {Productos.map(item => 
        <ProductoItem key={item.id} item={item} dispatch={dispatch}/>)}
        </div>
      </div>
      <div className="mt-5 border-gray-200 border-2 p-4 rounded-xl">
        {isEmpty ?
        <OrdenContent order={state.order} propina={state.propina} dispatch={dispatch}/>
        :<h2 className="text-center">La orden esta vacia</h2>}
        
      </div>
    </main>
    </>
  )
}

export default CalculadoraApp
