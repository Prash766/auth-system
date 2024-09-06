import express from 'express'
import { errorMiddleware } from './middleware/error.js'


const app= express()


const PORT = process.env.PORT | 3000

import authRoutes from './routes/auth.route.js'
app.use('/api/v1/auth' , authRoutes)


app.use(errorMiddleware)


app.listen(3000 , ()=>{
    console.log(`Server is running on ${PORT} port`)
})