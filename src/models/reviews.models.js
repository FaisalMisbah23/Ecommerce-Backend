import mongoose,{Schema} from "mongoose";

const reviewScheme = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    ratings:{
        type:Number,
        enum:[1,2,3,4,5]
    },
    comment:{
        type:String,
    }
},{timestamps:true})

export const Review = mongoose.model('Review',reviewScheme)