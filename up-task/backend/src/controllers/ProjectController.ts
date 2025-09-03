import type { Request,Response } from "express"
import Project from "../models/Project"

export class ProjectController {

    static createProject=async (req:Request,res:Response)=>{
        const project=new Project(req.body)
        try {
            await project.save()
            res.send("Proyecto Creado Correctamente")
        } catch (error) {
            console.error(error)   
        }
    };
    static getAllProjects = async (req:Request,res:Response)=>{
        try {
            let projects= await Project.find()
            res.json(projects)
        } catch (error) {
            console.error(error)
        }
    };
    static getProjectById = async (req:Request,res:Response)=>{
        try {
            const project= await Project.findById(req.params.id).populate("tasks")
            if(!project){
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error:error.message})
            }
            res.json(project)
        } catch (error) {
            console.error(error)
        }
    };
    static updateProject = async (req:Request,res:Response)=>{
        try {
            let project= await Project.findByIdAndUpdate(req.params.id,req.body)
            if(!project){
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error:error.message})
            }
            await project.save()
            res.send("Proyecto Actualizado")
        } catch (error) {
            console.error(error)
        }
    };
    static deleteProject = async (req:Request,res:Response)=>{
        try {
            let project= await Project.findById(req.params.id)
            if(!project){
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error:error.message})
            }
            await project.deleteOne()
            res.send("Proyecto Eliminado")
        } catch (error) {
            console.error(error)
        }
    };
    
}