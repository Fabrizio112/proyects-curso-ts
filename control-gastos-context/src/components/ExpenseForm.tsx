import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css"
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import useBudget from "../hooks/useBudget";



function ExpenseForm() {
    const initialStateExpense : DraftExpense={
        expenseName:"",
        amount:0,
        category:"",
        date:new Date()
    }
    const[expense,setExpense]=useState<DraftExpense>(initialStateExpense)
    const[prevAmount,setPrevAmount]=useState(0)
    const[error,setError]=useState("")

    const{state,dispatch,remainingBudget}=useBudget()
    
    useEffect(()=>{
        if(state.expenseID.length > 0){
            const formToEdit=state.expense.filter(exp => exp.id == state.expenseID)[0]
            setExpense(formToEdit)
            setPrevAmount(formToEdit.amount)
        }else{
            setExpense(initialStateExpense)
        }
    },[state.expenseID])

    const handleChange=(e : React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement> )=>{
        const isAmountField=["amount"].includes(e.target.name)
        setExpense({...expense,[e.target.name]:isAmountField ?+e.target.value:e.target.value})
    }
    const handleChangeDate=(value:Value)=>{
        setExpense({...expense,date:value})
    }
    const handleSubmit=(e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(Object.values(expense).includes("")){
            setError("Todos los campos son requeridos")
            return
        }
        if((expense.amount - prevAmount) > remainingBudget){
            setError("Ese gasto excede el presupuesto")
            return
        }
        if(state.expenseID){
            dispatch({type:"update-expense",payload:{expense:{id:state.expenseID, ...expense}}})
        }else{
            dispatch({type:"add-expense",payload:{expense}})
        }
        setError("")
        setPrevAmount(0)
    }

    return (   
    <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">{state.expenseID.length>0?"Editar Gasto":"Nuevo Gasto"}</legend>
        {error && <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">{error}</p>}
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Nombre Gasto:
            </label>
            <input type="text" id="expenseName" placeholder="Añade el nombre del gasto"
            className="bg-slate-100 p-2" name="expenseName" value={expense.expenseName} onChange={handleChange}/>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
                Cantidad:
            </label>
            <input type="number" id="amount" placeholder="Añade la cantidad del gasto"
            className="bg-slate-100 p-2" name="amount" value={expense.amount}  onChange={handleChange}/>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">
                Categoria:
            </label>
            <select id="category"
            className="bg-slate-100 p-2" name="category"
            value={expense.category} onChange={handleChange}>
                <option value="">-- Seleccione --</option>
                {categories.map(category=><option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-xl">
                Fecha Gasto:
            </label>
            <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate}/>
        </div>
        <input 
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.expenseID.length > 0 ?"Editar Gasto":"Registrar Gasto"}
        />
    </form>);
}

export default ExpenseForm;