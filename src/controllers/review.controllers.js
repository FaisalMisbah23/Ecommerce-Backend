import { isValidObjectId } from "mongoose";
import { Review } from "../models/reviews.models.js";
import { Product } from "../models/product.models.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";

export const addReview = asyncHandler(async (req, res) => {
    const {ratings,comment}=req.body;
    const {productId}=req.params;
    if (!ratings||!comment||comment?.trim()==="") {
        throw new ApiError(401, "All fields are required");
    }
    if (!isValidObjectId(productId)) {
        throw new ApiError(401, "Invalid product id");
    }
    const review = await Review.create({
        user_id:req.user?._id,
        product_id:productId,
        ratings,
        comment
    })
    if (!review) {
        throw new ApiError(401, "Something went wrong while adding review");
    }
    return res.status(200)
        .json(new ApiResponse(200, review, "Review added Success"));
});

export const updateReview = asyncHandler(async (req, res) => {
    const {ratings,comment}=req.body;
    const {reviewId}=req.params;
    if (!ratings||!comment||comment?.trim()==="") {
        throw new ApiError(401, "All fields are required");
    }
    if (!isValidObjectId(reviewId)) {
        throw new ApiError(401, "Invalid product id");
    }

    const isReviewExist = await Review.findById(reviewId);
    if (!isReviewExist) {
        throw new ApiError(401, "Review not found");
    }
    const updatedReview = await Review.findByIdAndUpdate(reviewId,{
       $set:{ ratings,
        comment}
    },{
        new:true
    })
    if (!updatedReview) {
        throw new ApiError(401, "Something went wrong while updating review");
    }
    return res.status(200)
        .json(new ApiResponse(200, updatedReview, "Review updated Success"));
});

export const deleteReview = asyncHandler(async (req, res) => {
    const {reviewId}=req.params;
    if (!isValidObjectId(reviewId)) {
        throw new ApiError(401, "Invalid reviewId");
    }
    const isReviewExist = await Review.findById(reviewId)
    if (!isReviewExist) {
        throw new ApiError(401, "Review not found");
    }
    await Review.findByIdAndDelete(reviewId);
    return res.status(200)
        .json(new ApiResponse(200, {}, "Review delete Success"));
});

export const getReviewByUser = asyncHandler(async (req, res) => {
    const review = await Review.find({user_id:req.user?._id})
    if (!review) {
        throw new ApiError(401, "No Review found");
    }
    return res.status(200)
        .json(new ApiResponse(200, review, "message"));
});

export const getReviewByProduct = asyncHandler(async (req, res) => {
    const {productId}=req.params;
    if (!isValidObjectId(productId)) {
        throw new ApiError(401, "Invalid Product Id");
    }
    const isProductExist = await Product.findById(productId)
    if (!isProductExist) {
        throw new ApiError(401, "Product not found");
    }
    const review = await Review.find({product_id:productId})
    if (!review) {
        throw new ApiError(401, "No Review found");
    }
    return res.status(200)
        .json(new ApiResponse(200, review, "message"));
});