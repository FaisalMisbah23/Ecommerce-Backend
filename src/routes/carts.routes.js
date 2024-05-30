import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlware.js";
import { addCartItem, updateCartItem } from "../controllers/cartItems.controllers.js";
import { deleteCart, getCart } from "../controllers/cart.controllers.js";

const router = Router();
router.route("/:productId").post(verifyJWT,addCartItem)
router.route("/").get(verifyJWT,getCart)
router.route("/:cartId").patch(verifyJWT,updateCartItem)
router.route("/:cartId").delete(verifyJWT,deleteCart)

export default router
