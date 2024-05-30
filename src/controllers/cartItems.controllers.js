import { isValidObjectId } from "mongoose";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import { Product } from "../models/product.models.js";
import { CartItems } from "../models/cartItems.models.js";
import { Cart } from "../models/carts.models.js";

export const addCartItem = asyncHandler(async (req, res) => {
    const {quantity}=req.body;
    const {productId}=req.params;;
    if (!quantity) {
        throw new ApiError(401, "Quantity is required");
    }
    if (!isValidObjectId(productId)) {
        throw new ApiError(401, "Invalid product Id");
    }
    const isProductExist = await Product.findById(productId)
    if (!isProductExist) {
        throw new ApiError(401, "Product is not found.");
    }
    const cart = await Cart.create({
            owner:req.user?._id
    })
    if (!cart) {
        throw new ApiError(401, "Something went wrong while creating Cart");
    }
    const cartItems= await CartItems.create({
        cart_id:cart._id,
        product_id:isProductExist._id,
        quantity,
        price:isProductExist.price
    })
    if (!cartItems) {
        throw new ApiError(401, "Something went wrong while adding cart Items");
    }
    return res.status(200)
        .json(new ApiResponse(200, cartItems, "message"));
});

export const updateCartItem = asyncHandler(async (req, res) => {
    const {quantity}=req.body;
    const {cartId}=req.params;;
    if (!quantity) {
        throw new ApiError(401, "Quantity is required");
    }
    if (!isValidObjectId(cartId)) {
        throw new ApiError(401, "Invalid cartId");
    }
    const isCartExist = await Cart.findById(cartId)
    if (!isCartExist) {
        throw new ApiError(401, "Cart is not found.");
    }
    console.log(isCartExist.owner);
    console.log(req.user._id);
    if (isCartExist.owner.toString()!==req.user._id.toString()) {
        throw new ApiError(401, "You don't have access to made changes");
    }
    const cartItem = await CartItems.findOne({cart_id:cartId})
    if (!cartItem) {
        throw new ApiError(401, "Cart item not found");
    }
    const updateCartItems= await CartItems.findByIdAndUpdate(cartItem._id,{
        $set:{quantity}
    },{new:true})
    if (!updateCartItems) {
        throw new ApiError(401, "Something went wrong while updating cart Items");
    }
    return res.status(200)
        .json(new ApiResponse(200, updateCartItems, "Cart Items update success"));
});

