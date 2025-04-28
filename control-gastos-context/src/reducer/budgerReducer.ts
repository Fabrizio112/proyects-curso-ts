import { DraftExpense, Expense } from "../types"
import {v4 as uuidv4} from "uuid"

export type BudgetActions=
{type:"add-budget",payload:{budget:number}}|
{type:"show-modal"}|
{type:"close-modal"}|
{type:"add-expense",payload:{expense:DraftExpense}}|
{type:"remove-expense",payload:{id:Expense["id"]}}|
{type:"set-expenseID",payload:{id:Expense["id"]}}|
{type:"update-expense",payload:{expense:Expense}}|
{type:"reset-app"}|
{type:"filter-category",payload:{category:Expense["category"]}}


export type BudgetState={
    budget:number
    modal:boolean
    expense:Expense[]
    expenseID:string
    filterCategory:string
}

const localStorageBudget=() : number =>{
    const localStorageB= localStorage.getItem("budget")
    return localStorageB ? +localStorageB : 0
}
const localStorageExpenses=(): Expense[]=>{
    const localStorageE=localStorage.getItem("expenses")
    return localStorageE ? JSON.parse(localStorageE) : []
}

export const initialStateBudget:BudgetState={
    budget:localStorageBudget(),
    modal:false,
    expense:localStorageExpenses(),
    expenseID:"",
    filterCategory:""
}

const convertDraftToExpense=( draftExpense:DraftExpense):Expense=>{
    return{
        ...draftExpense,
        id:uuidv4()
    }
}

export const budgetReducer=(
    state:BudgetState=initialStateBudget,
    action:BudgetActions
)=>{
    if(action.type == "add-budget"){
        return{
            ...state,
            budget:action.payload.budget
        }
    }
    if(action.type == "show-modal"){
        return{
            ...state,
            modal:true
        }
    }
    if(action.type == "close-modal"){
        return{
            ...state,
            modal:false,
            expenseID:""
        }
    }
    if(action.type == "add-expense"){
        const newExpense=convertDraftToExpense(action.payload.expense)
        return{
            ...state,
            expense:[...state.expense,newExpense],
            modal:false
        }
    }
    if(action.type == "remove-expense"){
        return{
            ...state,
            expense:state.expense.filter(exp => exp.id != action.payload.id)
        }
    }
    if(action.type == "set-expenseID"){
        return{
            ...state,
            expenseID:action.payload.id,
            modal:true
        }
    }
    if(action.type == "update-expense"){
        return{
            ...state,
            expenseID:"",
            modal:false,
            expense:state.expense.map( exp=> exp.id == action.payload.expense.id ? action.payload.expense : exp)

        }
    }
    if(action.type == "reset-app"){
        return{
            ...state,
            budget:0,
            expense:[]
        }
    }
    if(action.type == "filter-category"){
        return{
            ...state,
            filterCategory:action.payload.category
        }
    }
}