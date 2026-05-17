import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from "../models/Orders.js";
import express from 'express';


const router = express.Router();



router.get( "/",async (req,res)=>{
    try{
            const totalOrders = await Order.countDocuments();
            const totalUsers = await User.countDocuments();
            const totalProduct = await Product.countDocuments()
            const order = await Order.find();
            const revenue = order.reduce((s,a)=>{
                return s+a.total
            },0)
            res.json({totalOrders,totalUsers,totalProduct,revenue})
    }
    catch(error)
    {
        console.log(error.message);
    }

})

export default router;