import { Dispatch } from "react";
import { Producto } from "../types";
import { CalculadoraPropinasActions } from "../reducer/calculadoraPropinasReducer";

type ProductoProps={
    item:Producto
    dispatch:Dispatch<CalculadoraPropinasActions>
}

function ProductoItem({item,dispatch}:ProductoProps) {
    return ( 
    <>
    <button className="border-2 border-teal-400 rounded-xl w-full p-3 flex justify-between hover:bg-teal-200 cursor-pointer"
    onClick={()=>dispatch({type:"add_item",payload:{item}})}>
        <p>{item.name}</p>
        <p className="font-black">$ {item.price}</p>
    </button>
    </>
     );
}

export default ProductoItem;