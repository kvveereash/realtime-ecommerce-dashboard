import express from "express";
import Order from "../models/Orders.js";
import Product from '../models/Product.js';
import { verifyToken } from "../middleware/auth.js";
import { io } from "../server.js";


const router = express.Router();

console.log("OrderRoutes loaded");


router.get("/all",async (req,res)=>{
    try{
        const orders = await Order.find();
        res.json(orders)
    }
    catch(error)
    {
        console.log(error.message)
    }
  
})


router.post("/", verifyToken, async (req, res) => {

    console.log("CHECKOUT HIT");

    try {

        const { email, items, total } = req.body;

        const newOrder = new Order({
            email,
            userid: req.userId,
            item: items.map((i)=>({
                    productId:i._id,
                    name:i.name,
                    price:i.price,
                    qty:i.qty,
                    image:i.image
                })),            
           total
        });
        await newOrder.save();
        console.log("ITEMS:", items);
         
        for( const i of items)
        {
            const product = await Product.findById( i._id);
            product.stock -= i.qty;
            if(product.stock < i.qty)
            {
                res.json({message: `${product.name} is out of stock`})
            }
            await product.save();

        }
        io.emit("newOrder",newOrder)
        console.log("ORDER SAVED");
        
        res.json({
            message: "Order Placed Successfully"
        });
    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            error: error.message
        });
    }

});



router.get("/", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ userid: req.userId });
        console.log("ORDERS:", orders);
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

router.put("/:id",async(req,res)=>{
        try{
            const updateorder = await  Order.findByIdAndUpdate(
                req.params.id,
                {
                    status:req.body.status
                },
                {
                    new:true
                }
            )
                res.json(updateorder);
                io.emit("orderstatusupdated",{
                    orderId:updateorder._id,
                    status:updateorder.status
                })
            }
        catch(error)
        {
            console.log(error.message);
        }
    }
)



export default router;