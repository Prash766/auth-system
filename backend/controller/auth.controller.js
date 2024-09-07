import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000

}

const signupUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        throw new ApiError(400, "All fields are required");
    }
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
        email,
        password,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 12 * 60 * 60 * 1000, // 12 hours
    })
    const token = await user.generateToken();
    sendVerificationEmail(email , verificationToken)
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }).status(201).json({
        success: true,
        message: "User created successfully",
        user: userWithoutPassword
    });
});

const verifyEmail = asyncHandler(async(req , res, next)=>{
    const {code} = req.body
    const user = await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt:{
            $gt: Date.now()
        }
    }).select("-password")
    if(!user) throw new ApiError(400, "Invalid or expired verification Token" )
        user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    await user.save();
    await sendWelcomeEmail(user.email , user.name)
    res.status(200).json({
        success:true,
        message:"Mail verified Successfully",
        user:{
            ...user._doc,
            
        }
    })


})



const loginUser = async (req, res) => {
    res.send("signup route")
}
const logoutUser = async (req, res) => {
    res.send("signup route")
}


export {
    signupUser,
    loginUser,
    logoutUser,
    verifyEmail
}

