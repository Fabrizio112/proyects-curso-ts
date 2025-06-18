import { useMemo } from "react";
import { useCriptoStore } from "../store/CriptoStore";
import SpinnerLoading from "./SpinnerLoading";

function CryptoPriceDisplay() {
    const result=useCriptoStore(state=>state.result)
    const loading=useCriptoStore(state=>state.loading)
    const hasResult=useMemo(()=>result.PRICE == undefined,[result])
    return (
        <div className="result-wrapper">
            {loading ?<SpinnerLoading/> :!hasResult && (
                <>
            <h2>Cotizacion:</h2>
            <div className="result"> 
                <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="Imagen Crypto" />
                <div>
                    <p>El precio es de : <span>{result.PRICE}</span></p>
                    <p>Precio mas alto del dia : <span>{result.HIGHDAY}</span></p>
                    <p>Precio mas bajo del dia : <span>{result.LOWDAY}</span></p>
                    <p>Variacion ultimas 24 horas : <span>{result.CHANGEPCT24HOUR}</span></p>
                    <p>Ultima actualizacion : <span>{result.LASTUPDATE}</span></p>
                </div>
            </div>
                </>)}
          
        </div>
     );
}

export default CryptoPriceDisplay;