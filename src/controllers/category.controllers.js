import { Category } from "../models/categories.models.js";
import { ApiError } from "../utlis/ApiError.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { asyncHandler } from "../utlis/asyncHandler.js";

export const registerCategory = asyncHandler(async (req, res) => {
    const {name,description,tags,isParentCategory,parentCategoryName}=req.body;
    if (!name ||name?.trim()===""|!description||description?.trim()==="" ||!tags) {
        throw new ApiError(401, "All Field are required");
    }
    if(isParentCategory===true){
        if (!parentCategoryName||parentCategoryName?.trim()==="") {
            throw new ApiError(401, "Parent Category Name is required");
        }
    }
    const isCategoryExist = await Category.findOne({name})
    if (isCategoryExist) {
        throw new ApiError(401, "Category is already Exist");
    }
    if (isParentCategory===true) {
        const parentCategory = await Category.findOne({name:parentCategoryName})
        if (!parentCategory) {
            throw new ApiError(401, "Parent Category is not found.");
        }
        const category = await Category.create({
            parent_category:parentCategory._id,
            name,
            description,
            tags
        })
        return res.status(200)
        .json(new ApiResponse(200, category, "Sub Category Create Success"));
    }
    else{
        const category = await Category.create({
            name,
            description,
            tags
        })
   
        return res.status(200)
        .json(new ApiResponse(200, category, "Category Create Success"));
    }
});

export const updateCategory = asyncHandler(async (req, res) => {
    const {name,description,tags,isParentCategory,parentCategoryName,categoryName}=req.body;
    if (!name ||name?.trim()===""|!description||description?.trim()==="" |!categoryName||categoryName?.trim()==="" ||!tags) {
        throw new ApiError(401, "All Field are required");
    }
    const checkCategory = await Category.findOne({name:categoryName})
    if (!checkCategory) {
        throw new ApiError(401, "Category not found.");
    }

    if(isParentCategory===true){
        if (!parentCategoryName||parentCategoryName?.trim()==="") {
            throw new ApiError(401, "Parent Category Name is required");
        }
    }
    const isCategoryExist = await Category.findOne({name})
    if (isCategoryExist) {
        throw new ApiError(401, "Category is already Exist");
    }
    if (isParentCategory===true) {
        const parentCategory = await Category.findOne({name:parentCategoryName})
        if (!parentCategory) {
            throw new ApiError(401, "Parent Category is not found.");
        }
        const updatedCategory = await Category.findByIdAndUpdate(checkCategory._id,{
            $set:{
                parent_category:parentCategory._id,
                name,
                description,
                tags
            }
        },{
            new:true
        })
        return res.status(200)
        .json(new ApiResponse(200, updatedCategory, "Sub Category Update Success"));
    }
    else{
        const updatedCategory = await Category.findByIdAndUpdate(checkCategory._id,{
            $set:{name,
            description,
            tags}
        },{
            new:true
        })
   
        return res.status(200)
        .json(new ApiResponse(200, updatedCategory, "Category Update Success"));
    }
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const {categoryName}=req.body;
    if (!categoryName||categoryName?.trim()===""){
        throw new ApiError(401, "Category Name is required");
    }
    const category = await Category.findOne({name:categoryName})
    if (!category) {
        throw new ApiError(401, "Category not found.");
    }
    await Category.findByIdAndDelete(category._id)
    return res.status(200)
        .json(new ApiResponse(200, {}, "Category Deleted Success"));
});

export const getAllCategory = asyncHandler(async (req, res) => {
    // way for only to get Parent Categories
    // const categories = await Category.find({ parent_category: { $exists: false } }).exec();
    const categories = await Category.aggregate([{
        $match:{
            parent_category:{$exists:false}
        }
    },{
        $lookup:{
            from:"categories",
            localField:"_id",
            foreignField:"parent_category",
            as:"subCategories"
        }
    }])
    return res.status(200)
        .json(new ApiResponse(200, categories, "Categories fetch Success"));
});