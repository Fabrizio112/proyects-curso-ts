import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Guitar from "./components/Guitar.jsx"
import { db } from "./data/db.js"
import { useState } from "react"
import useCart from "./hooks/useCart.js"

function GuitarlaApp() {

  const [guitars]=useState(db)
  const{cart,clearCart,addToCart,removeFromCart,addQuantity,decreaseQuantity}=useCart()

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
