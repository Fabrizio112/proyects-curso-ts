import { useState } from "react";
import { currencies } from "../data";
import { useCriptoStore } from "../store/CriptoStore";
import type { PairState } from "../types";

function CryptoSearchForm() {
    const cryptoCurrencies=useCriptoStore(state=> state.cryptoCurrencies)
    const fetchData=useCriptoStore(state=> state.fetchData)
    const[pair,setPair]=useState<PairState>({
        currency:"",
        criptocurrency:""
    })
    const [error,setError]=useState("")

    const handleChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
        setPair({
            ...pair, 
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(Object.values(pair).includes("")){
            setError("Todos los campos son obligatorios")
            return
        }
        setError("")
        fetchData(pair)
    }

    return (
    <form className="form" onSubmit={handleSubmit}>
        {error && <h1 className="error">⚠️{error}⚠️</h1>}
        <div className="field">
            <label htmlFor="currency">Moneda</label>
            <select name="currency" id="currency" onChange={handleChange} value={pair.currency}>
                <option value="">--- Seleccione ---</option>
                {currencies.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
        </div>
        <div className="field">
            <label htmlFor="criptocurrency">Critomoneda</label>
            <select name="criptocurrency" id="criptocurrency" onChange={handleChange} value={pair.criptocurrency}>
                <option value="">--- Seleccione ---</option>
                {cryptoCurrencies.map(c=> <option key={c.CoinInfo.Name} value={c.CoinInfo.Name}>{c.CoinInfo.FullName}</option>)}
            </select>
        </div>
        <input type="submit" value="Cotizar"/>
    </form> );
}

export default CryptoSearchForm;