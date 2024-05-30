import { asyncHandler } from "../utlis/asyncHandler.js"
import {ApiError} from '../utlis/ApiError.js'
import {ApiResponse} from '../utlis/ApiResponse.js'
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utlis/Cloudinary.js";
import jwt from 'jsonwebtoken';

// generete Accces and Refresh Token
const genereteAccessAndRefreshToken = async (userId) =>{
try {
    const user = await User.findById(userId)
    const accessToken = user.genereteAccessToken()
    const refreshToken = user.genereteRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return {accessToken, refreshToken}
} catch (error) {
        throw new ApiError(402, "Something went wrong while genereting Acesss & Refresh Token",error);
}

}
const userRegister = asyncHandler(async (req,res) => {
    const {email,phone,name,password}= req.body;
    if([email,phone,name,password].some((field)=>{field?.trim()===""})){
        throw new ApiError(400,"All Fields are required")
    }

    const existedUser = await User.findOne({email})
    if(existedUser){
        throw new ApiError(300,"User already exists")
    }
    const avatarLocalPath = req.file?.path
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
        throw new ApiError(401,"Something went wrong while uploading on Cloudinary")
    }
    const user = await User.create({
        email,
        phone,
        name,
        password,
        avatar:avatar?.url
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(401,"Something went wrong while register user")
    }

    return res.status(200).json(new ApiResponse(200,createdUser,"User registered successfully"))

})

const login = asyncHandler(async (req,res) => {
    const {name,email,password}=req.body;
    if (!name || name?.trim()==="" || !email || email?.trim()==="" || !password) {
        throw new ApiError(401, "Fields are required");
    }
    const user = await User.findOne({$or:[{name},{email}]})
    if (!user) {
        throw new ApiError(401, "user does not exist");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password?.toString())
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Your password is not correct");
    }
    const {accessToken,refreshToken}= await genereteAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly:true,
        secrue:true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},"Log in Success"))

})

const logOut = asyncHandler(async(req,res)=>{
    // get user from the middleware : verifyJWT
    await User.findByIdAndUpdate(req.user?._id,{
        $unset:{
            refreshToken:1
        }
    },{
        new:true
    })

    const options = {
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"Log out success"))

})

const refreshLoginToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(402, "Un Authorized");
    }
    const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)
    if (!user) {
        throw new ApiError(402, "Un Authorized");
    }
    if (incomingRefreshToken!==user.refreshToken) {
        throw new ApiError(402, "Refresh Token is expire & not found");
    }

    const {refreshToken,accessToken}=await genereteAccessAndRefreshToken(user._id)

    const options = {
        httpOnly:true,
        secrue:true
    }
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{accessToken,refreshToken},"Refresh Token Update success"))

})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body;
    if (!oldPassword||!newPassword) {
        throw new ApiError(400, "All Fields are required");
    }
    const user= await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Your password is not correct");
    }
    user.password=newPassword;
    user.save({saveBeforeValidate:true})

    return res.status(200).json(new ApiResponse(200,{},"Password Changed Success"))
})

const updateUserDetailed = asyncHandler(async(req,res)=>{
    const {name,email} = req.body
    if(!(name || email)){
        throw new ApiError(401,"Full name and email is not submitted")
    }
    const user = await User.findByIdAndUpdate(req.user?._id,{$set:{name,email}},{new:true}).select("-password")

    return res.status(200).json(new ApiResponse(200,user,"Name and email changed Successfully"))
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res.status(200)
    .json(new ApiResponse(200,req.user,"User fetched Success"))
})

export {userRegister,login,logOut,refreshLoginToken,changeCurrentPassword,updateUserDetailed,getCurrentUser}