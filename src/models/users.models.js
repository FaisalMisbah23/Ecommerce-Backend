import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userScheme = new Schema({
    email:{
        type:String,
        trim:true,
        required : true
    },
    phone:{
        type:String
    },
    name:{
        type:String,
        trim:true,
        unique:true,
        required : true
    },
    avatar:{
        type:String     // url
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required : true
    },
    refreshToken:{
        type:String
    },
},{timestamps:true})


userScheme.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
        next()
    } else {
        return next()
    }
   
} )

userScheme.methods.isPasswordCorrect= async function (password) {
    return await bcrypt.compare(password,this.password)
}

userScheme.methods.genereteAccessToken = function () {
    return jwt.sign(
        {
        _id:this._id,
        name:this.name,
        email:this.email
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}

userScheme.methods.genereteRefreshToken = function(){
    return jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model('User',userScheme)