import { Dispatch } from "react";
import { ProductoOrder } from "../types";
import { CalculadoraPropinasActions } from "../reducer/calculadoraPropinasReducer";

type ProductoOrdenProps={
    item:ProductoOrder
    dispatch:Dispatch<CalculadoraPropinasActions>
}


function ProductoOrden({item,dispatch} : ProductoOrdenProps) {
    return (
    <div className="border-t border-gray-200  flex justify-between py-4 last-of-type:border-b">
        <div className="flex flex-col">
            <p>{item.name} - ${item.price}</p>
            <p className="font-black">Cantidad: {item.quantity} - ${item.quantity*item.price}</p>
        </div>
        <div className="flex justify-center items-center">
        <button className="text-white bg-red-600  rounded-full w-10 h-10 text-xl font-bold cursor-pointer" onClick={()=>dispatch({type:"remove_item",payload:{id:item.id}})}> X</button>
        </div>

    </div>  );
}

export default ProductoOrden;