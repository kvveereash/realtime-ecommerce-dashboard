import express from 'express';
import User from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = "mysecretkey";

router.post("/register", async (req, res) => {
    try {
            const { name, email, password } = req.body;
            console.log("BODY:", req.body);
            const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashed
        });

        await user.save();

        res.json({
            message: "User Registered",
            user
        });

    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});
router.post("/login",async(req,res)=>{
    try{
            const{email,password}= req.body;
            const user= await User.findOne({email})
            if (!email || !password)
                 {
                        return res.status(400).json({ message: "Email and password required" });
                }
            if(!user)
                    {
                        return res.status(400).json({ message: "User not found" });    
                    }
            const ismatch = await bcrypt.compare(password,user.password);
            if(!ismatch)
                    {
                        return res.status(400).json({ message: "Wrong password" });
                    }

            const token = jwt.sign({id:user._id,},SECRET);
            res.json({
                message:"Login success",
                token,
                userId: user._id,
                user:{
                        name:user.name,
                        email:user.email
                }
            })
    }
    catch(err)
    {
        res.status(500).json({error:err.message});    
    }
   
})
export default router;