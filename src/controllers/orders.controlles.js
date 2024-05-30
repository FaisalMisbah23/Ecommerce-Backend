import { isValidObjectId } from "mongoose";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import { Cart } from "../models/carts.models.js";
import { Order } from "../models/orders.models.js";

export const addOrder = asyncHandler(async (req, res) => {
    const {cartId}=req.params;
    if (!isValidObjectId(cartId)) {
        throw new ApiError(401, "Cart id is not valid");
    }
    const isCartExist = await Cart.findById(cartId);
    if (!isCartExist) {
        throw new ApiError(401, "Cart not found please add prodcuts in carts");
    }
    const isOrderExist = await Order.findOne({cart_id:cartId})
    if (isOrderExist) {
        throw new ApiError(401, "Order is already in query");
    }
    const newOrder = await Order.create({
        cart_id:cartId
    })
    if (!newOrder) {
        throw new ApiError(401, "Somehting went wrong while adding the new Order");
    }
    const updateCartStatus = await Cart.findByIdAndUpdate(cartId,{
        $set:{
            status:"ordered"
        }
    },{
        new:true
    })


    return res.status(200)
        .json(new ApiResponse(200, {newOrder,updateCartStatus}, "New Order create  & update cart status success"));
});

export const deleteOrder = asyncHandler(async (req, res) => {
    const {cartId}=req.params;
    if (!isValidObjectId(cartId)) {
        throw new ApiError(401, "Cart id is not valid");
    }
    const isCartExist = await Cart.findById(cartId);
    if (!isCartExist) {
        throw new ApiError(401, "Cart not found please add prodcuts in carts");
    }
    const order = await Order.findOne({cart_id:cartId})
    if (!order) {
        throw new ApiError(401, "Order not found");
    }
    const deleteOrder = await Order.findById(order._id)
    if (!deleteOrder) {
        throw new ApiError(401, "Somehting went wrong while deleting the new Order");
    }
    const updateCartStatus = await Cart.findByIdAndUpdate(cartId,{
        $set:{
            status:"abondonned"
        }
    },{
        new:true
    })


    return res.status(200)
        .json(new ApiResponse(200, {updateCartStatus}, "New Order create  & update cart status success"));
});

export const getorders = asyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
        {
            $lookup: {
                from: "cartitems",
                localField: "cart_id",
                foreignField: "cart_id",
                as: "orderDetails",
                pipeline: [
                    {
                        $lookup: {
                            from: "products",
                            localField: "product_id",
                            foreignField: "_id",
                            as: "productDetails",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "categories",
                                        localField: "category_id",
                                        foreignField: "_id",
                                        as: "categoryDetails",
                                        pipeline:([{
                                            $project: {
                                                name: 1
                                            }
                                        }])
                                    }
                                },
                                {
                                    $set: {
                                        categoryDetails: { $first: "$categoryDetails" }
                                    }
                                },{
                                    $project: {
                                        title:1,
                                        picture:1,
                                        description:1,
                                        categoryDetails:1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $set: {
                            productDetails: { $first: "$productDetails" }
                        }
                    },
                    {
                        $project: {
                            cart_id:1,
                            quantity: 1,
                            price: 1,
                            productDetails: 1
                        }
                    }
                ]
            }
        },
        {
            $set: {
                orderDetails: { $first: "$orderDetails" }
            }
        }
    ]);
    if (!orders) {
        throw new ApiError(401, "Something went wrong while fetching to Orders");
    }
    return res.status(200)
        .json(new ApiResponse(200, orders, "Orders fetched success"));
});
