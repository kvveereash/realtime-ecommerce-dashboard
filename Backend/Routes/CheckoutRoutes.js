import express from "express";
import Order from "../models/Orders.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {

    console.log("CHECKOUT HIT");

    try {

        const {
            email,
            items,
            total
        } = req.body;

        const userId = req.user.id;

        const orderdata = new Order({

            email,

            userid: userId,

            item: items.map((p) => ({
                productId: p._id,
                name: p.name,
                price: p.price,
                qty: p.qty,
                image: p.image
            })),

            total
        });

        await orderdata.save();

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