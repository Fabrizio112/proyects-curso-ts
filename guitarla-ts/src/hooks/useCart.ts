import { useEffect, useMemo, useState } from "react"
import { db } from "../data/db"
import type {Guitar, GuitarCart, GuitarId } from "../types"

const useCart=()=>{  
  const initialCart=() : GuitarCart[]=>{
    const localStorageCart=localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }  
  const [guitars]=useState(db)
  const[cart,setCart]=useState(initialCart())
  const MAX_CART=5
  const MIN_CART=1
 
  const clearCart=()=> setCart([])

  const addToCart=(item : Guitar)=>{
    const indexCart=cart.findIndex((cart)=> cart.id === item.id) 
    if(indexCart != -1){
      const cartDuplicate=[...cart]
      if(cartDuplicate[indexCart].quantity < MAX_CART){
        cartDuplicate[indexCart].quantity++
        setCart([...cartDuplicate])
      }
    }
    else{
      const newItem : GuitarCart = {...item,quantity:1}
      setCart([...cart,newItem])
    }
  }
  const removeFromCart=(id : GuitarId)=>{
    const copyCart= cart.filter( guitar => guitar.id != id)
    setCart(copyCart)
  }
  const addQuantity=(id:GuitarId)=>{
    const copyCart=[...cart]
    copyCart.forEach(guitar =>{ 
      if(guitar.id == id && guitar.quantity < MAX_CART){
         guitar.quantity++
        }
    })
    setCart(copyCart)
  }
  const decreaseQuantity=(id:GuitarId)=>{
    const copyCart=[...cart]
    copyCart.forEach(guitar=>{
      if(guitar.id == id && guitar.quantity > MIN_CART){
        guitar.quantity--
      }
    })
    setCart(copyCart)
  }

  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])
  const isEmpty =useMemo(() => cart.length === 0 ,[cart])
  const totalPrice =useMemo( () => cart.reduce((total,guitar)=> total + (guitar.price * guitar.quantity) ,0),[cart])

    return {
        guitars,
        cart,
        clearCart,
        addToCart,
        removeFromCart,
        addQuantity,
        decreaseQuantity,
        isEmpty,
        totalPrice
    }
}

export default useCart