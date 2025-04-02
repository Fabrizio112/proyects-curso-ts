import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Guitar from "./components/Guitar.jsx"
import { db } from "./data/db.js"
import { useEffect, useState } from "react"

function GuitarlaApp() {

  const initialCart=()=>{
    const localStorageCart=localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [guitars,setGuitars]=useState(db)
  const[cart,setCart]=useState(initialCart())
  const MAX_CART=5
  const MIN_CART=1

  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])


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

  return (
    <>
    <Header cart={cart} remove={removeFromCart} add={addQuantity} decrease={decreaseQuantity} clear={clearCart} />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {guitars.map(el =>
            <Guitar 
            key={el.id}
            guitar={el}
            addToCart={addToCart} />)}
        </div>
    </main>
   <Footer/>
   
    </>
  )
}

export default GuitarlaApp
