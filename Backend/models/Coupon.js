import mongoose from "mongoose";

const couponschema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    discount:{
            type:Number,
            unique:true
    },
    minamount:{
        type:Number,
        required:true,
    },
    expirydate:{
        type:Date,
        required:true
    }
})

export default mongoose.model("Coupon",couponschema);
