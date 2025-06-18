import {create} from "zustand"
import type { CryptoCurrencies, CryptoPrice, PairState } from "../types"
import { getCryptos, getCurrentCryptoPrice } from "../service/CryptoService"


type CriptoStoreProps={
    cryptoCurrencies:CryptoCurrencies
    result:CryptoPrice
    loading:boolean
    fetchCriptos:()=>Promise<void>
    fetchData:(pair:PairState)=>Promise<void>
}



export const useCriptoStore=create<CriptoStoreProps>((set)=>({
    cryptoCurrencies:[],
    result:{} as CryptoPrice,
    loading:false,
    fetchCriptos:async()=>{
        const result=await getCryptos()
        set(()=>({
            cryptoCurrencies:result
        }))
    },
    fetchData:async(pair)=>{
        set(()=>({
            loading:true
        }))
        const result=await getCurrentCryptoPrice(pair)
        set(()=>({
            result:result,
            loading:false
        }))
    }
}))