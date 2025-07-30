import { Link, useLoaderData} from "react-router-dom";
import { obtenerProductos } from "../service/ProductService";
import ProductDetails from "../components/ProductDetails";
import type { Product } from "../schemas/productSchemas";

export async function loader(){
    const products=await obtenerProductos()
    return products
}

function Products() {
    const products=useLoaderData() as Product[]
    return ( 
    <>
    <div className="flex justify-between">
        <h2 className="text-4xl font-black text-salte-500"> Productos</h2>
        <Link to="/productos/nuevo" className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"> Agregar Producto</Link>
    </div>
    <div className="p-2">
        <table className="w-full mt-5 table-auto">
            <thead className="bg-slate-800 text-white">
                <tr>
                    <th className="p-2">Producto</th>
                    <th className="p-2">Precio</th>
                    <th className="p-2">Disponibilidad</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => <ProductDetails key={p.id} product={p} />)}
            </tbody>
        </table>
    </div>
    </> );
}

export default Products;