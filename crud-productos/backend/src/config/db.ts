import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config()

const db = new Sequelize(process.env.DB_CONNECTION,{
    models:[__dirname + "/../models/**/*"]
});0

export default db;