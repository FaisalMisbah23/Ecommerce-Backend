import { isValidObjectId } from "mongoose";
import { Category } from "../models/categories.models.js";
import { Product } from "../models/product.models.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { uploadOnCloudinary } from "../utlis/Cloudinary.js";
import { asyncHandler } from "../utlis/asyncHandler.js";

export const registerProduct = asyncHandler(async (req, res) => {
    const {title,description,price,tags,categoryName} = req.body
    console.log("categoryName",categoryName)
    if (!title || title?.trim()==="" ||!description || description?.trim()==="" ||!categoryName || categoryName?.trim()==="" ||!price||!tags) {
        throw new ApiError(401, "All Fields are required");
    }
    const isProductExist = await Product.findOne({title})
    if (isProductExist) {
        throw new ApiError(401, "Product is already Registered");
    }
    const picLocalPath = req.file?.path
    if (!picLocalPath) {
        throw new ApiError(401, "Image is required");
    }
    const picture = await uploadOnCloudinary(picLocalPath)
    if (!picture) {
        throw new ApiError(401, "Something went wrong while uploading to cloudinary");
    }
    const category = await Category.findOne({name:categoryName})
    console.log(category);
    if (!category) {
        throw new ApiError(401, "Category is not found please create a new one");
    }
    const product = await Product.create({
        category_id:category._id,
        title,
        description,
        picture:{
            public_id: picture?.public_id,
            url: picture?.url
        },
        price,
        tags
    })

    if (!product) {
        throw new ApiError(401, "Something went wrong while creating Product");
    }

    return res.status(200)
        .json(new ApiResponse(200, product, "Product Registered Success"));
});

export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "categoryDetails",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            description: 1,
                            tags: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$categoryDetails"
        }
    ]);
    return res.status(200)
        .json(new ApiResponse(200, products, "all products fetch success"));
});

export const getProductByCategory = asyncHandler(async (req, res) => {
    const {category}=req.params;
    const isCategoryExist = await Category.findOne({name:category})
    if (!isCategoryExist) {
        throw new ApiError(401, "Category not found");
    }
    const products = await Product.find({category_id:isCategoryExist._id})
    return res.status(200)
        .json(new ApiResponse(200, products, "Products by category fetch success"));
});


export const updateProduct = asyncHandler(async (req, res) => {
    const {title,description,price,tags,categoryName} = req.body
    const {productId}=req.params;
    if (!isValidObjectId(productId)) {
        throw new ApiError(401, "Invalid Product id");
    } 
    if (!title || title?.trim()==="" ||!description || description?.trim()==="" ||!categoryName || categoryName?.trim()==="" ||!price||!tags) {
        throw new ApiError(401, "All Fields are required");
    }
    const isProductExist = await Product.findOne({title})
    if (isProductExist) {
        throw new ApiError(401, "Product is already Registered");
    }
    const picLocalPath = req.file?.path
    if (!picLocalPath) {
        throw new ApiError(401, "Image is required");
    }
    const picture = await uploadOnCloudinary(picLocalPath)
    if (!picture) {
        throw new ApiError(401, "Something went wrong while uploading to cloudinary");
    }
    const newCategory = await Category.findOne({name:categoryName})
    if (!newCategory) {
        throw new ApiError(401, "Category is not found please create a new one");
    }
    const product = await Product.findById(productId)
    if (!product) {
        throw new ApiError(401, "Product not found");
    }
    const updatedproduct = await Product.findByIdAndUpdate(productId,{
        $set:{category_id:newCategory._id,
        title,
        description,
        picture:{
            public_id: picture?.public_id,
            url: picture?.url
        },
        price,
        tags}
    },{new:true})
        if (!updatedproduct) {
            throw new ApiError(401, "Something went wrong while updating Product");
        }
    
        return res.status(200)
            .json(new ApiResponse(200, product, "Product Updated Success"));

});

export const deleteProduct = asyncHandler(async (req, res) => {
    const {productId}=req.params;
    if (!isValidObjectId(productId)) {
        throw new ApiError(401, "Product id is not valid");
    }
    const product = await Product.findById(productId)
    if (!product) {
        throw new ApiError(401, "Product not found");
    }
    await Product.findByIdAndDelete(productId)
    return res.status(200)
        .json(new ApiResponse(200, {}, "Product delete Success"));
});