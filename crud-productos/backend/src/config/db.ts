import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config()

const db = new Sequelize(process.env.DB_CONNECTION,{
    models:[__dirname + "/../models/**/*.ts"]
});

console.log("Ruta de modelos:", __dirname + "/../models/**/*.ts");
console.log("Modelos registrados:", db.models);

export default db;