import express from "express";
import Groq from "groq-sdk";
import Product from "../models/Product.js";
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});


router.post("/", async(req,res)=>{
    try{

        const { message } = req.body;
        const products = await Product.find();
        const productlist = products.map((p)=>
            `
            Name: ${p.name}
            Price: ₹${p.price}
            Description: ${p.description}
            `
        ).join("\n");
        const prompt=`
                You are an AI food ecommerce assistant.
                These are available products:
                ${productlist}
                Recommend products based on the user's request.
                User:
                ${message}
                `;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: prompt
                },
            ],
            model: "llama-3.3-70b-versatile"
        });

        res.json({reply:completion.choices[0].message.content});
    }
    catch(error){

        console.log(error);

        res.status(500).json({
            error:error.message
        });

    }

});

export default router;