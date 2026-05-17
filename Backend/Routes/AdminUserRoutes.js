import express from "express";
import User from '../models/User.js';


const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const userinfo = await User.find();
        res.json(userinfo);
    }
    catch(error)
    {
        console.log(error.message);
    }   
})

export default router;