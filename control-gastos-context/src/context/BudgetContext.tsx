import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialStateBudget } from "../reducer/budgerReducer"

type BudgetContextProps={
    state:BudgetState
    dispatch:Dispatch<BudgetActions>
    totalExpenses:number
    remainingBudget:number
}

type BudgetProviderProps={
    children:ReactNode
}

export const BudgetContext  = createContext<BudgetContextProps>(null!)


export const BudgetProvider=({children}:BudgetProviderProps)=>{
    const[state,dispatch]=useReducer(budgetReducer,initialStateBudget)
    const totalExpenses=useMemo(()=>state.expense.reduce((total,expense)=> expense.amount + total,0),[state.expense])
    const remainingBudget=state.budget - totalExpenses

    
    return (
        <BudgetContext.Provider value={{
            state,dispatch,totalExpenses,remainingBudget
        }}>{children}</BudgetContext.Provider>
    )
}