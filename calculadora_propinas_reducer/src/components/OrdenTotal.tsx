import { Dispatch, useMemo } from "react"
import { CalculadoraPropinasActions } from "../reducer/calculadoraPropinasReducer"
import { ProductoOrder } from "../types"

type OrdenTotalProps={
    order:ProductoOrder[]
    propina:number
    dispatch:Dispatch<CalculadoraPropinasActions>
}

function OrdenTotal({dispatch,order,propina}:OrdenTotalProps) {
const subtotalAPagar=useMemo(()=>order.reduce((total,item)=>total+(item.price*item.quantity),0),[order])
  const propinaAPagar=useMemo(()=>propina == 0 ? 0 : subtotalAPagar * propina,[order,propina])
  const totalAPagar=useMemo(()=>subtotalAPagar + propinaAPagar,[propina,order])
    return (
    <div className="mt-4 flex flex-col gap-3">
        <h4 className="font-black text-2xl">Totales y Propina:</h4>
        <p>Subtotal a Pagar: <span className="font-black">${subtotalAPagar}</span></p>
        <p>Propina: <span className="font-black">$ {propinaAPagar}</span> </p>
        <p>Total a Pagar: <span className="font-black">${totalAPagar}</span></p>
        <button className="cursor-pointer w-full text-center bg-black text-white p-2 " onClick={()=>dispatch({type:"save_order"})}>GUARDAR ORDEN</button>
      </div> );
}

export default OrdenTotal;