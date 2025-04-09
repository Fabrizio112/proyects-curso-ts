export type Producto={
    id:number
    name:string
    price:number
}

export type ProductoOrder=Producto &{
    quantity:number
}