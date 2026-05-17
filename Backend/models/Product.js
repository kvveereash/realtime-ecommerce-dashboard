import mongoose from 'mongoose';

const productschema=new mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String,
    stock:{
        type:Number,
        require:true,
        default:0
    }
})

export default mongoose.model("Product",productschema)