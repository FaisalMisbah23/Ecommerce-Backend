import { Router } from "express";
import { addOrder, deleteOrder, getorders } from "../controllers/orders.controlles.js";

const router = Router()

router.route("/:cartId").post(addOrder)
router.route("/:cartId").delete(deleteOrder)
router.route("/").get(getorders)

export default router