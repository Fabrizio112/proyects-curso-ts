import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {
    const{state}=useBudget()
    const filteredExpenses=state.filterCategory ?state.expense.filter(exp => exp.category == state.filterCategory ) :state.expense
    const isEmpty=useMemo(()=>filteredExpenses.length === 0,[filteredExpenses])
    return ( 
    <div className="mx-auto max-w-3xl rounded-lg my-10 ">
        {isEmpty
        ?
        <p className="text-gray-600 text-2xl font-bold ">No hay gastos para mostrar</p>
        :
        <>
            <p className="text-gray-600 text-2xl font-bold my-5"> Listado de Gastos</p>
            {filteredExpenses.map(gasto =><ExpenseDetail key={gasto.id} expense={gasto} />)}
        </>}
    </div> );
}

export default ExpenseList;