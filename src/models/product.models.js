import mongoose,{Schema} from "mongoose";

const productScheme = new Schema({
    category_id:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    title:{
        type:String
    },
    picture: {},
    description:{
        type:String,
    },
    price:{
        type:Number,
        min:[0]
    },
    tags:{
        type:[String]
    },
},{timestamps:true})

export const Product = mongoose.model('Product',productScheme)