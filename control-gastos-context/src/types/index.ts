type ValuePiece=Date | null;
export type Value = ValuePiece | [ValuePiece,ValuePiece];

export type Expense={
    id:string
    expenseName:string
    amount:number
    category:string
    date:Value
}

export type DraftExpense=Omit<Expense,"id">

export type Category={
    id:string
    name:string
    icon:string
}