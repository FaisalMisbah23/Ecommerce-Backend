import { isValidObjectId } from "mongoose";
import { Cart } from "../models/carts.models.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import { CartItems } from "../models/cartItems.models.js";

export const getCart = asyncHandler(async (req, res) => {

    const carts = await Cart.aggregate([{
        $match:{
            owner:req.user._id
        }
    },{
        $lookup:{
            from:"cartitems",
            localField:"_id",
            foreignField:"cart_id",
            as:"cart_items",
            pipeline:([{
                    $addFields:{
                    total : {$multiply:["$price","$quantity"]}
                  }
            },{
                $lookup:{
                    from:"products",
                    localField:"product_id",
                    foreignField:"_id",
                    as:"product_details",
                    pipeline:([{
                        $project:{
                            title:1,
                            picture:1
                        }
                    }])
                }
            },{
                $set:{
                    product_details:{$first:"$product_details"}
                }
            },
            {
                $project:{
                    price:1,
                    quantity:1,
                    total:1,
                    product_details:1
                }
            }
        ])
        },
    },{
            $set:{cart_items:{$first:"$cart_items"}}
        
    },])

    if (!carts) {
        throw new ApiError(401, "Something went wrong while fetching cart.");
    }
    return res.status(200)
        .json(new ApiResponse(200, carts, "Cart fetch successfull"));
});

export const deleteCart = asyncHandler(async (req, res) => {
    const {cartId} =req.params;
    if (!isValidObjectId(cartId)) {
        throw new ApiError(401, "Invalid cart Id");
    }
    const isCartExist = await Cart.findById(cartId);
    if (!isCartExist) {
        throw new ApiError(401, "Cart not found");
    }
    const cartitems = await CartItems.findOne({cart_id:cartId})
    if (!cartitems) {
        throw new ApiError(401, "Cart itesm not found");
    }
    const deleteCartItems = await CartItems.findByIdAndDelete(cartitems._id)
    if (!deleteCartItems) {
        throw new ApiError(401, "Something went wrong while deleting cart items");
    }
    const deleteCart = await Cart.findByIdAndDelete(cartId);
    if (!deleteCart) {
        throw new ApiError(401, "Something went wrong while deleting cart");
    }
    return res.status(200)
        .json(new ApiResponse(200, {}, "message"));
});