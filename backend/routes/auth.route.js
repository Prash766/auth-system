import { Router } from "express";
import {
    loginUser, logoutUser, signupUser, verifyEmail, forgotPassword, resetPassword,
    checkAuth

} from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/check-auth').get(verifyJWT, checkAuth)
router.route('/login').post(loginUser)
router.route('/signup').post(signupUser)
router.route('/verify-email').post(verifyEmail)
router.route('/logout').post(logoutUser)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').post(resetPassword)


export default router