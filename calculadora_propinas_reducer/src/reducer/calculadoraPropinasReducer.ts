import { Producto, ProductoOrder } from "../types";

export type CalculadoraPropinasActions=
{type:"add_item",payload:{item:Producto}}|
{type:"remove_item",payload:{id:Producto["id"]}}|
{type:"save_order"}|
{type:"set_propina",payload:{propina:number}}

type CalculadoraPropinasInitialStateType={
    order:ProductoOrder[],
    propina:number
}

export const initialStateCalculadoraPropinas:CalculadoraPropinasInitialStateType={
    order:[],
    propina:0
}

export const calculadoraPropinasReducer=(
    state:CalculadoraPropinasInitialStateType=initialStateCalculadoraPropinas,
    action:CalculadoraPropinasActions
)=>{
    if(action.type == "add_item"){
        const productoExist=state.order.find(producto => producto.id === action.payload.item.id)
        let stateUpdated:ProductoOrder[]=[]
        if(productoExist){
            const productoUpdated=state.order.map(producto=> producto.id === action.payload.item.id 
                ?
                {...producto,quantity:producto.quantity+1}
                :producto)
            stateUpdated=productoUpdated
        }else{
            const newItem ={...action.payload.item,quantity:1}
            stateUpdated=[...state.order,newItem]
        }
        return{
            ...state,
            order:stateUpdated
        }
    }
    if(action.type == "remove_item"){
        return{
            ...state,
            order:state.order.filter(item => item.id != action.payload.id )
        }
    }
    if(action.type == "save_order"){
        return{
            order:[],
            propina:0
        }
    }
    if(action.type == "set_propina"){
        return{
            ...state,
            propina:action.payload.propina
        }
    }
}