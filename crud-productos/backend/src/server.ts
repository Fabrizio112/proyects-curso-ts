import express from "express";
import productsRouter from "./router";
import db from "./config/db";
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./config/swagger";
import cors,{ CorsOptions } from "cors";

export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log("Conexion Exitosa a la DB")
    } catch (error) {
        console.log("Hubo un error al conectar con la db")
    }
}
connectDB();

const corsOptions:CorsOptions={
    origin:function (origin, callback) {
        if(origin == process.env.FRONTEND_URL){
            callback(null,true)
        }
        else{
            callback(new Error("Error de CORS"))
        }
    },
}

const server= express()

server.use(cors(corsOptions))
server.use(express.json())
server.use("/api/products",productsRouter)
server.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

export default server;