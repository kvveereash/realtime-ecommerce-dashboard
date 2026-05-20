import express from "express";
import Coupon from "../models/Coupon.js";

const router = express.Router();

router.post("/",async (req,res)=>{
    try{
            const  newCoupon= new Coupon(req.body);
            await newCoupon.save();
            res.json(newCoupon);
    }
    catch(error)
    {
        res.status(500).json({messager:error.message});
    }
})

router.get("/",async (req,res)=>{
    try{
            const coupons = await Coupon.find();
            console.log(coupons);
            res.json(coupons);
    }
    catch(error)
    {
        res.status(500).json({messager:error.message});
    }
  
})

router.post("/validate",async(req,res)=>{
    try{

        const{code,total}= await req.body;
        const coupon = await Coupon.findOne({
            code:code.toUpperCase()
        });

        if(!coupon)
        {
             return res.status(404).json({message:"Invalid Coupon"});
        }

        if(new Date() > coupon.expirydate)
        {
             return res.status(400).json({message:"Coupon Expired"});
        }

        if(total<coupon.minamount)
        {
            return res.status(400).json({message:`Minimum order amount is ₹${coupon.minAmount}`});
        }

        const discountamount=(total*coupon.discount)/100;
        const finaltotal= total-discountamount;

        res.json({ discount: discountamount,finaltotal});

    }
    catch(error)
    {
        res.status(500).json({ error:error.message});
    }
})

export default router;