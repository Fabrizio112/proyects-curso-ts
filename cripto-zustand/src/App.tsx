import { useEffect } from "react"
import CryptoSearchForm from "./components/CryptoSearchForm"
import { useCriptoStore } from "./store/CriptoStore"
import CryptoPriceDisplay from "./components/CryptoPriceDisplay"

function App() {
  const fetchCriptos=useCriptoStore(state=> state.fetchCriptos)
  useEffect(()=>{
    fetchCriptos()
  },[])
  return (
    <>
     <div className="container">
        <h1 className="app-title">
          Cotizador de <span>Criptomonedas</span>
        </h1>
        <div className="content">
            <CryptoSearchForm/> 
            <CryptoPriceDisplay/>
        </div>
     </div>
    </>
  )
}

export default App
