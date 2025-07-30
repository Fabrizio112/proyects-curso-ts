import axios from "axios";
import { DataSchema, ProductSchema, ProductsSchema, type Product } from "../schemas/productSchemas";

type DataType={
     [k: string]: FormDataEntryValue;
}

export async function crearProducto(data : DataType ){
    try {
        const result=DataSchema.safeParse({
            name:data.name,
            price:+data.price
        })          
        if(result.success){
            const url=`${import.meta.env.VITE_URL_API}/api/products` 
            await axios.post(url,{
                name:result.data.name,
                price:result.data.price
            })

        }else{
            throw new Error("Datos no validos")
        }
    } catch (error) {
        console.error(error)
    }
}

export async function obtenerProductos(){
    try {
        const url=`${import.meta.env.VITE_URL_API}/api/products` 
        const {data}= await axios(url)
        const response= ProductsSchema.safeParse(data.products)
        if(response.success){
            return response.data
        }else{
            throw new Error("Hubo un error ...")
        }

    } catch (error) {
        console.error(error)
    }
}
export async function obtenerProductoPorID(id: Product["id"]){
    try {
        const url=`${import.meta.env.VITE_URL_API}/api/products/${id}` 
        const {data}= await axios(url)
        const response= ProductSchema.safeParse(data.data)
        if(response.success){
            return response.data
        }else{
            throw new Error("Hubo un error ...")
        }

    } catch (error) {
        console.error(error)
    }
}

export async function editarProducto(data : DataType,id:Product["id"]){
try {
        const result=ProductSchema.safeParse({
            id,
            name:data.name,
            price:+data.price,
            availability:data.availability == "true"
        })          
        if(result.success){
            const url=`${import.meta.env.VITE_URL_API}/api/products/${id}` 
            await axios.put(url,{
                name:result.data.name,
                price:result.data.price,
                availability:result.data.availability
            })

        }else{
            throw new Error("Datos no validos")
        }
    } catch (error) {
        console.error(error)
    }
}

export async function eliminarProducto(id:Product["id"]){
try {
        const url=`${import.meta.env.VITE_URL_API}/api/products/${id}` 
        await axios.delete(url) 
    } catch (error) {
        console.error(error)
    }
}
export async function cambiarDisponibilidad(id:Product["id"]){
try {
    console.log(id)
        const url=`${import.meta.env.VITE_URL_API}/api/products/${id}` 
        await axios.patch(url) 
    } catch (error) {
        console.error(error)
    }
}