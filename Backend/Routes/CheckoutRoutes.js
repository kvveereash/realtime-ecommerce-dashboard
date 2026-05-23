import express from "express";
import Order from "../models/Orders.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {

    console.log("CHECKOUT HIT");

    try {

        const {
            email,
            items,
            total
        } = req.body;

        const userId = req.userId;
        console.log("REQ BODY:", req.body);
        const orderdata = new Order({
            email,
            userid: userId,
            items: items.map((p) => ({
                productId: p._id,
                name: p.name,
                price: p.price,
                qty: p.qty,
                image: p.image
            })),
            total
        });

        await orderdata.save();
        console.log("ITEMS:", items);

        res.json({
            message: "Order saved successfully"
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});

export default router;