import express from 'express'
import { errorMiddleware } from './middleware/error.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app= express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:`http://localhost:5173`,
    credentials:true
}))


const PORT = process.env.PORT || 3000

import authRoutes from './routes/auth.route.js'
import connectDB from './db/db.js'
app.use('/api/v1/auth' , authRoutes)


app.use(errorMiddleware)


app.listen(3000 , ()=>{
    connectDB()
    console.log(`Server is running on ${PORT} port`)
})