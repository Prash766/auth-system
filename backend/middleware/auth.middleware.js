import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token || req.header('Authorization')?.replace("Bearer ", "").trim(); // Trim whitespace
    // console.log(token);

    if (!token) {
        throw new ApiError(400, "Unauthorized, Invalid Token");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // Ensure the token is validated with the secret key
        req.user = decodedToken._id; 
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized, Invalid Token"
        });
    }
});


export {
    verifyJWT
}