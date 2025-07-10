import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { dbConnect } from "./config/db.js";
import cors from "cors"
const app = express()

dotenv.config()
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}))

// dbConnect()


app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`))