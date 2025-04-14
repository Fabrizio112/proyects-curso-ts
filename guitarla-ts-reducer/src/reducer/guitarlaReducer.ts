import { db } from "../data/db"
import { Guitar, GuitarCart, GuitarId } from "../types"

const MAX_CART=5
const MIN_CART=1


export type GuitarlaActions=
{type:"clean_cart"} |
{type: "add_cart",payload:{new_guitar:Guitar}}|
{type:"remove_cart",payload:{id:GuitarId}}|
{type:"add_quantity",payload:{id:GuitarId}}|
{type:"decrease_quantity",payload:{id:GuitarId}}


export const initialCart=() : GuitarCart[]=>{
    const localStorageCart=localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

type initialStateCartType={
    guitars:Guitar[]
    cart:GuitarCart[]
}

export const initialStateCart : initialStateCartType={
    guitars:db,
    cart:initialCart()
}

export const guitarlaReducer=(
    state:initialStateCartType = initialStateCart,
    action:GuitarlaActions
)=>{
    if(action.type == "clean_cart"){
        return{
            ...state,
            cart:[]
        }
    }
    if(action.type == "add_cart"){
        const indexCart=state.cart.find((cart)=> cart.id === action.payload.new_guitar.id)
        let updatedCart:GuitarCart[]=[]
        if(indexCart){
            updatedCart=state.cart.map(guitar=>{
                if(guitar.id == action.payload.new_guitar.id){
                    if(guitar.quantity < MAX_CART){
                        return {...guitar,quantity:guitar.quantity + 1}
                    }else{
                        return guitar
                    }
                }else{
                    return guitar
                }
            })
          }
          else{
            const newItem : GuitarCart = {...action.payload.new_guitar,quantity:1}
            updatedCart=[...state.cart,newItem]
          } 
          return{
            ...state,
            cart:updatedCart
          }
    }
    if(action.type == "remove_cart"){
        return{
            ...state,
            cart:state.cart.filter( guitar => guitar.id != action.payload.id)     
        }
    }
    if(action.type=="add_quantity"){
        const copyCart=[...state.cart]
        copyCart.forEach(guitar =>{ 
            if(guitar.id == action.payload.id && guitar.quantity < MAX_CART){
                guitar.quantity++
            }
        })
        return{
            ...state,
            cart:copyCart
        }
    }
    if(action.type=="decrease_quantity"){
        const copyCart=[...state.cart]
        copyCart.forEach(guitar=>{
            if(guitar.id == action.payload.id && guitar.quantity > MIN_CART){
                guitar.quantity--
         }
        })
        return{
            ...state,
            cart:copyCart
        }
    }
}