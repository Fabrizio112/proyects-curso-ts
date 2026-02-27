import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRouter from "./routes/projectRoutes";
import taskRouter from "./routes/taskRoutes";
import authRouter from "./routes/authRoutes";
import teamRouter from "./routes/teamRoutes";
import noteRouter from "./routes/noteRoutes";
import profileRouter from "./routes/profileRoutes";

dotenv.config()

connectDB()

const app = express();

app.use(cors(corsConfig))
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/projects", projectRouter)
app.use("/api/projects", taskRouter)
app.use("/api/team", teamRouter)
app.use("/api/notes", noteRouter)
app.use("/api/profile", profileRouter)



export default app;