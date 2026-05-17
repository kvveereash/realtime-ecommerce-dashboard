import mongoose from 'mongoose';

const userschema=mongoose.Schema({
    name:String,
    email:String,
    password:String
})

export default mongoose.model("User",userschema);