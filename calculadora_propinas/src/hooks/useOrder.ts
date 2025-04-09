import { useMemo, useState } from "react"
import type { Producto, ProductoOrder } from "../types"

const useOrder=()=>{
    const[order,setOrder]=useState<ProductoOrder[]>([])
    const[propina,setPropina]=useState(0)

    const addItem=(item : Producto)=>{
        const productoExist=order.find(producto => producto.id === item.id)
        if(productoExist){
            const productoUpdated=order.map(producto=> producto.id === item.id 
                ?
                {...producto,quantity:producto.quantity+1}
                :producto)
            setOrder(productoUpdated)
        }else{
            const newItem ={...item,quantity:1}
            setOrder([...order,newItem])
        }
       
    }
    const removeItem=(id:Producto["id"])=>{
        setOrder(order.filter(item => item.id != id ))
    }

    const saveOrder=()=>{
        setOrder([])
        setPropina(0)
    }

    const isEmpty=useMemo(()=>order.length>0,[order])
    const subtotalAPagar=useMemo(()=>order.reduce((total,item)=>total+(item.price*item.quantity),0),[order])
    const propinaAPagar=useMemo(()=>propina == 0 ? 0 : subtotalAPagar * propina,[order,propina])
    const totalAPagar=useMemo(()=>subtotalAPagar + propinaAPagar,[propina,order])
    return {
        order,
        propina,
        setPropina,
        addItem,
        removeItem,
        isEmpty
        ,subtotalAPagar
        ,propinaAPagar
        ,totalAPagar 
        ,saveOrder
    }
}

export default useOrder