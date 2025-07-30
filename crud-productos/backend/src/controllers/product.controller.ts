import { raw, Request,Response } from "express";
import Product from "../models/Product.model";

export const getAllProducts=async (req: Request, res: Response) => {
    const products= await Product.findAll()
    res.json({products})
}

export const getProduct=async (req: Request, res: Response) => {
   const {id}=req.params
    const product= await Product.findByPk(id)
    if(!product){
        res.status(404).json({
            error:"Producto no encontrado"
        });
        return;
    }

    res.json({data:product})
}

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
};

export const updateProduct=async(req:Request,res:Response)=>{
   const {id}=req.params
    const product= await Product.findByPk(id)
    if(!product){
        res.status(404).json({
            error:"Producto no encontrado"
        });
        return;
    }
    await product.update(req.body)
    await product.save()

    res.json(product)
}
export const updateAvailability=async(req:Request,res:Response)=>{
    const {id}=req.params
    const product= await Product.findByPk(id)
    if(!product){
        res.status(404).json({
            error:"Producto no encontrado"
        });
        return;
    }
    const currentAvailability = product.getDataValue('availability');
    product.setDataValue('availability', !currentAvailability);
    await product.save();
    res.json(product)
}

export const deleteProduct=async(req:Request,res:Response)=>{
    const {id}=req.params
    const product= await Product.findByPk(id)
    if(!product){
        res.status(404).json({
            error:"Producto no encontrado"
        });
        return;
    }

    await product.destroy()

res.json({data:"Producto Eliminado Correctamente"})
}