import mongoose,{Schema} from "mongoose";

const orderLinesSchema = new Schema({
    order_id:{
        type:mongoose.Types.ObjectId,
        ref:"Order"
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
export const OrderLines = mongoose.model('OrderLines',orderLinesSchema)