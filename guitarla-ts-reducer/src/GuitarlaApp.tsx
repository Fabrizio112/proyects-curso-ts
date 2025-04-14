import Header from "./components/Header.tsx"
import Footer from "./components/Footer.tsx"
import Guitar from "./components/Guitar.tsx"
import { guitarlaReducer, initialStateCart } from "./reducer/guitarlaReducer.ts"
import { useEffect, useReducer } from "react"

function GuitarlaApp() {

  const[state,dispatch]=useReducer(guitarlaReducer,initialStateCart)
   useEffect(()=>{
      localStorage.setItem("cart",JSON.stringify(state?.cart))
    },[state?.cart])

  return (
    <>
    <Header dispatch={dispatch} cart={state.cart} />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {state.guitars.map(el =>
            <Guitar 
            key={el.id}
            guitar={el}
            dispatch={dispatch}
             />)}
        </div>
    </main>
   <Footer/>
   
    </>
  )
}

export default GuitarlaApp
