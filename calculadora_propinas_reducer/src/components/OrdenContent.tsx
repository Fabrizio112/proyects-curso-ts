import { Dispatch } from "react";
import {ProductoOrder } from "../types";
import OrdenTotal from "./OrdenTotal";
import ProductoOrden from "./ProductoOrden";
import Propinas from "./Propinas";
import { CalculadoraPropinasActions } from "../reducer/calculadoraPropinasReducer";

type OrdenContentProps={
    order:ProductoOrder[]
    propina:number
    dispatch:Dispatch<CalculadoraPropinasActions>

}

function OrdenContent({order,propina,dispatch}:OrdenContentProps) {
    return (
        <div>
          <h2 className="text-4xl font-black mb-6">Consumo</h2>
          <div className="flex flex-col gap-4">
          {order.map((item)=> <ProductoOrden key={item.id} item={item} dispatch={dispatch}/>)}
          </div>
          <Propinas dispatch={dispatch}/>
          <OrdenTotal dispatch={dispatch} order={order} propina={propina}/>
        </div>
      );
}

export default OrdenContent;