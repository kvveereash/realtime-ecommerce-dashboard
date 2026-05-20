import express from "express";
import Stripe from "stripe";

const router = express.Router();

router.post("/create-payment-intent",async(req,res)=>{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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