import { Router } from "express";
import { loginUser, logoutUser, signupUser } from "../controller/auth.controller.js";

const router = Router()

router.route('/login').post(loginUser)
router.route('/signup').post(signupUser)
router.route('/logout').post(logoutUser)


export default router