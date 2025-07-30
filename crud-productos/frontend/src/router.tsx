import {createBrowserRouter} from "react-router-dom"
import Layout from "./layouts/Layout"
import Products,{loader as productLoader} from "./views/Products"
import ProductoNuevo , {action as productoNuevoAction}  from "./views/ProductoNuevo"
import ProductoEditar,{loader as productEditarLoader,action as productEditarAction} from "./views/ProductoEditar"
import { action as productoEliminarAction } from "./components/ProductDetails"

export const router= createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                index:true,
                element: <Products/>,
                loader:productLoader,
            },
            {
                path:"/productos/nuevo",
                element:<ProductoNuevo/>,
                action: productoNuevoAction
            },
            {
                path:"/productos/:id/editar",
                element:<ProductoEditar/>,
                loader:productEditarLoader,
                action:productEditarAction
            },
            {
                path:"/productos/:id/eliminar",
                action:productoEliminarAction
            }
        ]
    },
])