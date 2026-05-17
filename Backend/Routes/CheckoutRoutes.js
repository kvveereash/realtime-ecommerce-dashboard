import express from "express";
import Checkout from "../models/Checkout.js";

const router=express.Router();

router.post("/",async(req,res)=>{
     console.log("CHECKOUT HIT"); 
    try
    {
        const {firstName, lastName, address, email, phone, items, total}= req.body;
        const checkoutdata = new Checkout({
            firstName,
            lastName,
            address,
            email,
            phone,
            items,
            total
        });
        await checkoutdata.save();
        res.json({ message: "Order saved successfully" });
    }
    catch(err)
    {
        res.status(500).json({ error: err.message });
    }
})
export default router;