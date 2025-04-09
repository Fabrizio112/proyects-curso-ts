type OrdenTotalProps={
    subtotalAPagar:number
    saveOrder:()=> void
    propinaAPagar:number
    totalAPagar:number
}

function OrdenTotal({subtotalAPagar,saveOrder,propinaAPagar,totalAPagar}:OrdenTotalProps) {
    return (
    <div className="mt-4 flex flex-col gap-3">
        <h4 className="font-black text-2xl">Totales y Propina:</h4>
        <p>Subtotal a Pagar: <span className="font-black">${subtotalAPagar}</span></p>
        <p>Propina: <span className="font-black">$ {propinaAPagar}</span> </p>
        <p>Total a Pagar: <span className="font-black">${totalAPagar}</span></p>
        <button className="cursor-pointer w-full text-center bg-black text-white p-2 " onClick={saveOrder}>GUARDAR ORDEN</button>
      </div> );
}

export default OrdenTotal;