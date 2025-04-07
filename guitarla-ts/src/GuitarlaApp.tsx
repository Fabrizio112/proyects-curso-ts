import Header from "./components/Header.tsx"
import Footer from "./components/Footer.tsx"
import Guitar from "./components/Guitar.tsx"
import useCart from "./hooks/useCart.ts"

function GuitarlaApp() {

  const{guitars,cart,clearCart,addToCart,removeFromCart,addQuantity,decreaseQuantity,isEmpty,totalPrice}=useCart()

  return (
    <>
    <Header cart={cart} remove={removeFromCart} add={addQuantity} decrease={decreaseQuantity} clear={clearCart} isEmpty={isEmpty} totalPrice={totalPrice} />
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
