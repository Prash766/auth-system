import express from 'express'
import { errorMiddleware } from './middleware/error.js'

const app= express()

app.use(express.json())


const PORT = process.env.PORT || 3000

import authRoutes from './routes/auth.route.js'
import connectDB from './db/db.js'
app.use('/api/v1/auth' , authRoutes)


app.use(errorMiddleware)


app.listen(3000 , ()=>{
    connectDB()
    console.log(`Server is running on ${PORT} port`)
})