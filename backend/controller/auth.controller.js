import { sendResetPassword, sendResetSuccessMail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import bcrypt from 'bcrypt'
import crypto from 'crypto'


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
    sendVerificationEmail(email, verificationToken)
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }).status(200).json({
        success: true,
        message: "User created successfully",
        user: userWithoutPassword
    });
});

const verifyEmail = asyncHandler(async (req, res, next) => {
    const { code } = req.body
    const user = await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: {
            $gt: Date.now()
        }
    }).select("-password")
    if (!user) throw new ApiError(400, "Invalid or expired verification Token")
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    await user.save();
    await sendWelcomeEmail(user.email, user.name)
    res.status(200).json({
        success: true,
        message: "Mail verified Successfully",
        user: {
            ...user._doc,

        }
    })


})



const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) throw new ApiError(400, "Invalid Email and password")
    const user = await User.findOne({ email }).select("-password")
    if (!user) throw new ApiError(400, "Invalid Credentials")
    const pwd = user.password
    bcrypt.compare(password, pwd, (err, result) => {
        if (result === false) {
            throw new ApiError(400, "Invalid Password")
        }
    })
    const token = await user.generateToken()
    user.lastLogin = new Date()
    await user.save()
    res.cookie("token", token, options).status(200).json({
        status: true,
        message: "User logged in",
        user: {
            ...user._doc
        }
    })
}

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email }).select("-password")
    if (!user) throw new ApiError(400, "Inalid Email , User not Found")
    const resetToken = crypto.randomBytes(20).toString("hex")
    const resetTokenExpiry = Date.now() + 15 * 60 * 60 * 1000
    user.resetPasswordToken = resetToken
    user.resetPasswordExpiresAt = resetTokenExpiry
    await user.save()

    await sendResetPassword(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`)
    return res.status(200).json({
        success: true,
        message: "Reset Password mail sent successfully"
    })

})


const logoutUser = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Logged Out successfully"
    })
}


const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: {
            $gt: Date.now()
        }

    })
    if (!user) throw new ApiError(400, "Invalid or expired Reset Token")
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresAt = undefined
    await user.save()

    await sendResetSuccessMail(user.email)

    return res.status(200).json({
        success: true,
        message: "Password Reset Successfully"
    })

})


const checkAuth = asyncHandler(async(req ,res)=>{
    const userid = req.user
    console.log(userid)
    if(!req.user) throw new ApiError(400 , "User not Found")
        const user = await User.findById(userid).select("-password")
    console.log(user)
    if(!user) throw new ApiError(400 , "User not found- Invalid User id")
    res.status(200).json({
success:true,
user
})
    
    

})


export {
    signupUser,
    loginUser,
    logoutUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    checkAuth
}

