import { Producto, ProductoOrder } from "../types";
import OrdenTotal from "./OrdenTotal";
import ProductoOrden from "./ProductoOrden";
import Propinas from "./Propinas";

type OrdenContentProps={
    order:ProductoOrder[]
    subtotalAPagar:number
    removeItem:(id:Producto["id"])=> void
    setPropina:React.Dispatch<React.SetStateAction<number>>
    saveOrder:()=> void
    propinaAPagar:number
    totalAPagar:number

}

function OrdenContent({order,subtotalAPagar,removeItem,setPropina,saveOrder,propinaAPagar, totalAPagar}:OrdenContentProps) {
    return (
        <div>
          <h2 className="text-4xl font-black mb-6">Consumo</h2>
          <div className="flex flex-col gap-4">
          {order.map((item)=> <ProductoOrden key={item.id} item={item} removeItem={removeItem}/>)}
          </div>
          <Propinas setPropina={setPropina}/>
          <OrdenTotal subtotalAPagar={subtotalAPagar} saveOrder={saveOrder} propinaAPagar={propinaAPagar} totalAPagar={totalAPagar}/>
        </div>
      );
}

export default OrdenContent;