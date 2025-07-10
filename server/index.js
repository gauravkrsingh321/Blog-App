import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { dbConnect } from "./config/db.js";
import cors from "cors"
import AuthRoute from "./routes/auth.route.js";
const app = express()

dotenv.config()
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}))

// route setup  
app.use('/api/auth', AuthRoute)


dbConnect()

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error.'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`))