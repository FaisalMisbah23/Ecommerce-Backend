import { Router } from "express";
import { addReview, deleteReview, getReviewByProduct, getReviewByUser, updateReview } from "../controllers/review.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlware.js";

const router = Router()
router.route("/:productId").post(verifyJWT,addReview)
router.route("/:reviewId").patch(verifyJWT,updateReview)
router.route("/:reviewId").delete(verifyJWT,deleteReview)
router.route("/myreviews").get(verifyJWT,getReviewByUser);
router.route("/:productId").get(getReviewByProduct)

export default router