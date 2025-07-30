import server from "./server";

server.listen(process.env.PORT,()=>{
    console.log(`Servidor iniciado en el puerto ${process.env.PORT}`)
})