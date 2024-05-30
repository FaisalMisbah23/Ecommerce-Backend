import mongoose,{Schema} from "mongoose";

const cartSchema = new Schema({
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["active","ordered","abondonned"],
        default:"active"
    }
},{timestamps:true})
export const Cart = mongoose.model('Cart',cartSchema)