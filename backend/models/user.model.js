import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastLogin:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date

},{timestamps:true})

userSchema.pre('save' ,async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash("password", 10)
next()

})


userSchema.methods.generateToken= function(){
    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        name:this.name,

    
    },
    process.env.TOKEN_SECRET,
    {
        expiresIn:process.env.TOKEN_EXPIRY
    },
)
}




export const User = mongoose.model('User', userSchema)