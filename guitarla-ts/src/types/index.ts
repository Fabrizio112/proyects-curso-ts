export type Guitar={
    id:number
    name:string
    image:string
    description:string
    price:number
}

export type GuitarCart= Guitar &{
    quantity:number
}

export type GuitarId= Guitar["id"]
