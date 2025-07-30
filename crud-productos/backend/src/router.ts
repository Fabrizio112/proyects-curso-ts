import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateAvailability, updateProduct } from "./controllers/product.controller";
import { handleInputErrors } from "./middleware";
import {validateParam, validateProductAdd, validateProductUpdate } from "./helper/product.helper";

const productsRouter=Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *                type: object
 *                properties:
 *                   id:
 *                      type: integer
 *                      description: the product ID
 *                      example: 1
 *                   name:
 *                      type: string
 *                      description: The name of the product
 *                      example: "Smartphone"
 *                   price:
 *                      type: number
 *                      format: float
 *                      description: The price of the product
 *                      example: 299.99
 *                   availability:
 *                      type: boolean
 *                      description: Whether the product is available
 *                      example: true
 *  
 * 
 * 
 * 
 * 
 */

productsRouter.get("/",getAllProducts);
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get product list
 *          tags:
 *               - Products
 *          description : Return a list with all products
 *          responses:
 *              200:
 *                      description: Successful response 
 *                      content:
 *                          application/json:
 *                                  schema:
 *                                       $ref: "#/components/schemas/Product"                                                          
 * 
 * 
 * 
 */


productsRouter.get("/:id",...validateParam,handleInputErrors,getProduct);
/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a specific product
 *          tags:
 *               - Products
 *          description: Return a product based on ID
 *          parameters:
 *            - in: path
 *              name: id
 *              decription: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              $ref: "#components/schemas/Product"
 *              400:
 *                  description: Bad Request - Invalid ID
 *                 
 *              404:
 *                  description: Product not found
 * 
 *                  
 * 
 * 
 * 
 */


productsRouter.post("/",...validateProductAdd,handleInputErrors,createProduct);
/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Allow create a product
 *          tags:
 *                  - Products
 *          description: Return a new product in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                                 name:
 *                                      type: string
 *                                      example: "Mouse inhalambrico"
 *                                 price:
 *                                      type: number
 *                                      example: 200
 *          responses:
 *              201:
 *                  description : Product created succesfully
 *              400:
 *                  description : Bad Request - Invalid Input Data
 */


productsRouter.put("/:id",...validateProductUpdate,handleInputErrors,updateProduct)
/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Allow update an existing product
 *          tags:
 *               - Products
 *          description: Update an specific product with the information given
 *          parameters:
 *            - in: path
 *              name: id
 *              decription: The ID of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name: 
 *                                       type: string
 *                                       example: "Monito Curvo 4k 120hz"
 *                                  price:
 *                                       type: number
 *                                       example: 200
 *                                  availability:
 *                                       type: boolean
 *                                       example: true
 *                                    
 *          responses:
 *              200:
 *                  description: Successful update
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              $ref: "#components/schemas/Product"
 *              400:
 *                  description: Bad Request - Invalid ID
 *                 
 *              404:
 *                  description: Product not found
 * 
 *                  
 * 
 * 
 * 
 */

productsRouter.patch("/:id",...validateParam,handleInputErrors,updateAvailability)
/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Allow change availability
 *          tags:
 *                  - Products
 *          description: Return product with availabity change
 *          parameters:
 *            - in: path
 *              name: id
 *              decription: The ID of the product to change availability
 *              required: true
 *              schema:
 *                  type: integer
*          responses:
 *              200:
 *                  description: Successful change availability
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              $ref: "#components/schemas/Product"
 *              400:
 *                  description: Bad Request - Invalid ID
 *                 
 *              404:
 *                  description: Product not found
 *                   
 *                  
 * 
 * 
 * 
 */

productsRouter.delete("/:id",...validateParam,handleInputErrors,deleteProduct)
/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete an existing product
 *          tags:
 *                  - Products
 *          description : Delete a product from the database
 *          parameters:
 *            - in: path
 *              name: id
 *              decription: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful delete
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                      data:
 *                                            type: string
 *                                            example : Producto eliminado correctamente
 *                                 
 *              400:
 *                  description: Bad Request - Invalid ID
 *                 
 *              404:
 *                  description: Product not found                  
 * 
 * 
 * 
 */

export default productsRouter;
