import { useEffect, useMemo } from "react"
import DashboardPrincipal from "./components/DashboardPrincipal"
import FiltrarGastos from "./components/FiltrarGastos"
import DefinirPresupuesto from "./components/FormDefinirPresupuesto"
import HeaderCP from "./components/HeaderApp"
import useBudget from "./hooks/useBudget"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"

function App() {
  const{state}=useBudget()
  const isBudgetDefined=useMemo(()=>state.budget > 0,[state.budget])
  useEffect(()=>{
    localStorage.setItem("budget",state.budget.toString())
    localStorage.setItem("expenses",JSON.stringify(state.expense))
  },[state])
  return (
    <>
      <HeaderCP />
      {!isBudgetDefined ? 
      <DefinirPresupuesto/>
      :
      <>
       <DashboardPrincipal/>
       <FiltrarGastos/>
       <ExpenseList/> 
       <ExpenseModal/>
      </>
     }

    </>
  )
}

export default App
