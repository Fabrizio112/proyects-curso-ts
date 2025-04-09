import OrdenContent from "./components/OrdenContent"
import ProductoItem from "./components/Producto"
import { Productos } from "./data/db"
import useOrder from "./hooks/useOrder"

function CalculadoraApp() {

    const{order,setPropina,addItem,removeItem,isEmpty,subtotalAPagar,propinaAPagar,totalAPagar,saveOrder}=useOrder()
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
        <ProductoItem key={item.id} item={item} addItem={addItem}/>)}
        </div>
      </div>
      <div className="mt-5 border-gray-200 border-2 p-4 rounded-xl">
        {isEmpty ?
        <OrdenContent order={order} subtotalAPagar={subtotalAPagar} removeItem={removeItem} setPropina={setPropina} saveOrder={saveOrder} propinaAPagar={propinaAPagar} totalAPagar={totalAPagar}/>
        :<h2 className="text-center">La orden esta vacia</h2>}
        
      </div>
    </main>
    </>
  )
}

export default CalculadoraApp
