import axios from "axios"
import { CryptoCurrenciesSchema, CryptoPriceSchema } from "../schema/currency-schema"
import type { PairState } from "../types"

export async function getCryptos(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
    const {data:{Data}}= await axios(url)
    const result=CryptoCurrenciesSchema.safeParse(Data) 
    if(result.success){
        return result.data
    }
} 

export async function getCurrentCryptoPrice(pair:PairState){
    const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`
    const {data:{DISPLAY}}=await axios(url)
    const result=CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])
    if(result.success){
        return result.data
    }
}