import { Router } from "express";
import { deleteCategory, getAllCategory, registerCategory, updateCategory } from "../controllers/category.controllers.js";

const router = Router()

router.route("/register").post(registerCategory)
router.route("/delete").post(deleteCategory)
router.route("/update").patch(updateCategory)
router.route("/").get(getAllCategory)

export default router