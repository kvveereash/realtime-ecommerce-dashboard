import mongoose from 'mongoose';

const orderproductschema = new mongoose.Schema({
    email:String,
    userid: {
                type: String, 
                required: true
            },
    item:[
        {
            productId:{
               type: mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            name:String,
            price:Number,
            qty:Number,
            image:String

        },
    ],
    total:
    {
      type:Number,
      required:true
    },
    status:{
        type:String,
        enum:["pending", "paid", "shipped", "delivered"],
        default:"pending"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Order",orderproductschema)