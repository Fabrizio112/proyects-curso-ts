import { useEffect, useState } from "react"

const useCart=()=>{  
  const initialCart=()=>{
    const localStorageCart=localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }  
  const[cart,setCart]=useState(initialCart())
  const MAX_CART=5
  const MIN_CART=1
 
  const clearCart=()=> setCart([])

  const addToCart=(item)=>{
    const indexCart=cart.findIndex((cart)=> cart.id === item.id) 
    if(indexCart != -1){
      const cartDuplicate=[...cart]
      if(cartDuplicate[indexCart].quantity < MAX_CART){
        cartDuplicate[indexCart].quantity++
        setCart([...cartDuplicate])
      }
    }
    else{
      item.quantity=1
      setCart([...cart,item])
    }
  }
  const removeFromCart=(id)=>{
    const copyCart= cart.filter( guitar => guitar.id != id)
    setCart(copyCart)
  }
  const addQuantity=(id)=>{
    const copyCart=[...cart]
    copyCart.forEach(guitar =>{ 
      if(guitar.id == id && guitar.quantity < MAX_CART){
         guitar.quantity++
        }
    })
    setCart(copyCart)
  }
  const decreaseQuantity=(id)=>{
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

    return {
        cart,
        clearCart,
        addToCart,
        removeFromCart,
        addQuantity,
        decreaseQuantity
    }
}

export default useCart