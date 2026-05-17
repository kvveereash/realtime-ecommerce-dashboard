import express from "express";
import Product from "../models/Product";

const router= express.Router();

router.delete("/:id",async(req,rea)=>{
    try{
         await Product.findByIdAndDelete(req.params.id);
         req.json({ message: "Product Deleted"});
        }
    catch(err)
        {
            console.log(err);

        }
})