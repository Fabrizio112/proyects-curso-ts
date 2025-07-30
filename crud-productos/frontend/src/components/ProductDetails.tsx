import { Form, Link, redirect, type ActionFunctionArgs } from "react-router-dom";
import type { Product } from "../schemas/productSchemas";
import { cambiarDisponibilidad, eliminarProducto } from "../service/ProductService";

type ProductDetailsType={
    product:Product
}

export async function action({params}: ActionFunctionArgs){
    const respuestaUsuario=confirm("Desea eliminar este producto")
    if(params.id && respuestaUsuario){
        await eliminarProducto(+params.id)
    }
    return redirect("/")
}

const handleChangeAvailavility=async (product:Product)=>{
    await cambiarDisponibilidad(product.id)
    window.location.reload()
}


function ProductDetails({product}:ProductDetailsType) {

    const isAvailable=product.availability
    return (  <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {product.price}
        </td>
        <td className="p-3 text-lg text-gray-800 text-center">
            <button onClick={()=>handleChangeAvailavility(product)} className={`rounded rounded-lg border border-gray-300 px-6 py-2 hover:border-gray-600 cursor-pointer font-bold uppercase text-sm ${isAvailable? "" : "text-red-600"}`}>{isAvailable ? "Disponible" : "No Disponible" }</button>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex flex-row gap-2 items-center">
                <Link
                to={`/productos/${product.id}/editar`}
                className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                >
                Editar 
                </Link>
                <Form className="w-full" method="POST" action={`productos/${product.id}/eliminar`}>
                    <input type="submit" value="Eliminar" className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer" />
                </Form>
            </div>
          
        </td>
    </tr>  );
}

export default ProductDetails;