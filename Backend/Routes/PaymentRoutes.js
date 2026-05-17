import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe("sk_test_51Ss0hjA9lbYhaCz4A9zVak5E0DOuFX16ICgbLXaV5b1WlyVh1QaqKfAZQ0zmnrmOHwirHqrsp1gWsmxLSvOJk19300UScXZOE7");

router.post("/create-payment-intent",async(req,res)=>{
    try{
        const{amount}=req.body;
        const paymentintent=await stripe.paymentIntents.create({
            amount:amount*100,
            currency:"inr",
            automatic_payment_methods:{
                enabled:true
            }

        })
        res.json({clientSecret:paymentintent.client_secret})
    }catch(error)
    {
        console.log(error);
        res.status(500).json({ error: error.message, });
    }
})

export default router;