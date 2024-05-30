import mongoose,{Schema} from "mongoose";

const cartItemsSchema = new Schema({
    cart_id:{
        type:mongoose.Types.ObjectId,
        ref:"Cart"
    },
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number,
        min:[1,"Quantity must be minimum 1"],
    }
},{timestamps:true})
export const CartItems = mongoose.model('CartItems',cartItemsSchema)