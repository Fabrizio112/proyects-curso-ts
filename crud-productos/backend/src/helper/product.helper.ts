import { body, param } from "express-validator";

export const validateProductAdd =[
    body("name")
        .notEmpty()
        .withMessage("El nombre del producto no puede ir vacío"),
    
    body("price")
        .notEmpty()
        .withMessage("El precio del producto no puede ir vacío")
        .isNumeric()
        .withMessage("El precio debe ser un número válido")
        .custom((v) => v >0).withMessage("Precio No valido  ")
]


export const validateParam=[param("id").isInt().withMessage("ID No valido")]


export const validateProductUpdate=[
     param("id").isInt().withMessage("ID No valido"),
     body("name")
        .notEmpty()
        .withMessage("El nombre del producto no puede ir vacío"),
    
    body("price")
        .notEmpty()
        .withMessage("El precio del producto no puede ir vacío")
        .isNumeric()
        .withMessage("El precio debe ser un número válido")
        .custom((v) => v >0).withMessage("Precio No valido"),
    body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido")
]