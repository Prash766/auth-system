import mongoose, { mongo } from "mongoose";

async function connectDB(){
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log(`Mongo db connected ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to the DB" , error)
        process.exit(1)
        
    }
}

export default connectDB