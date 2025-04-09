import { Producto } from "../types";

type ProductoProps={
    item:Producto
    addItem:(item:Producto)=> void
}

function ProductoItem({item,addItem}:ProductoProps) {
    return ( 
    <>
    <button className="border-2 border-teal-400 rounded-xl w-full p-3 flex justify-between hover:bg-teal-200 cursor-pointer"
    onClick={()=>addItem(item)}>
        <p>{item.name}</p>
        <p className="font-black">$ {item.price}</p>
    </button>
    </>
     );
}

export default ProductoItem;