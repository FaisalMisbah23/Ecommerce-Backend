import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
    cart_id:{
        type:mongoose.Types.ObjectId,
        ref:"Cart"
    }
},{timestamps:true})
export const Order = mongoose.model('Order',orderSchema)