import { Router } from "express";
import { deleteProduct, getAllProducts, getProductByCategory, registerProduct, updateProduct } from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()
router.route("/register").post(upload.single("picture"),registerProduct)
router.route("/:productId").patch(upload.single("picture"),updateProduct)
router.route("/:productId").delete(deleteProduct)
router.route("/").get(getAllProducts)
router.route("/:category").get(getProductByCategory)

export default router