import {createContext, ReactNode, useReducer } from "react";
import { ContadorCaloriasActions, contadorCaloriasReducer, ContadorCaloriasState, initialState } from "../reducer/contadorCaloriasReducer";

type ContadorContextProps={
    state:ContadorCaloriasState
    dispatch:React.Dispatch<ContadorCaloriasActions>
}

export const ContadorContext=createContext<ContadorContextProps>(null!)

type ContadorProviderProps={
    children:ReactNode
}

export const ContadorProvider=({children}: ContadorProviderProps)=>{

    const[state,dispatch]=useReducer(contadorCaloriasReducer,initialState)
    return  (
    <ContadorContext.Provider
    value={ {state,dispatch}}>
        {children}
    </ContadorContext.Provider>)
}