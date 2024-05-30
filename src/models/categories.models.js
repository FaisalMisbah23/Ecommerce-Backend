import mongoose,{Schema} from "mongoose";

const categoryScheme = new Schema({
    parent_category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    name:{
        type:String
    },
    description:{
        type:String,
    },
    tags:{
        type:[]
    },
},{timestamps:true})

export const Category = mongoose.model('Category',categoryScheme)