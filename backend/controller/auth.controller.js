import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

 
 
const signupUser = asyncHandler(async(req , res)=>{
    const {email , password , name} = req.body
    if(!email|| !password || !name){
        throw new ApiError(400 , "All fields are required")
    }
    const userAlreadyExist = await User.findOne({email})
    if(userAlreadyExist){
        return res.status(400).json({
            success:false,
            message:"User already Exists"
        })
    }
    const verificationToken = Math.floor(100000+ Math.random()*900000).toString()
    const user = await User.create({
        email,
        password,
        name,
        verificationToken,
        verificationTokenExpiresAt:Date.now() + 12*60*60*1000
    
    })


})



 const loginUser = async(req , res) =>{
    res.send("signup route")
}
 const logoutUser = async(req , res) =>{
    res.send("signup route")
}


export {
    signupUser,
    loginUser,
    logoutUser
}

