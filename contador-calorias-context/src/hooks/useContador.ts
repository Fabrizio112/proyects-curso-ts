import { useContext } from "react"
import { ContadorContext } from "../context/ContadorContext"


export const useContador=()=>{
    const{dispatch,state}=useContext(ContadorContext)
    return{
        state,dispatch
    }
}