import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import {changeCurrentPassword, getCurrentUser, logOut, login, refreshLoginToken, updateUserDetailed, userRegister} from "../controllers/users.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlware.js";

const router= Router()
router.route("/register").post(upload.single("avatar"),userRegister)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logOut)
router.route("/refresh").post(verifyJWT,refreshLoginToken)
router.route("/changePasword").patch(verifyJWT,changeCurrentPassword)
router.route("/updateDetails").patch(verifyJWT,updateUserDetailed)
router.route("/user").get(verifyJWT,getCurrentUser)

export default router