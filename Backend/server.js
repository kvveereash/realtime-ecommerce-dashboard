import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import AiChatRoutes from "./Routes/AiChatRoutes.js";
import ProductRoutes from "./Routes/ProductRoutes.js";
import OrderRoutes from "./Routes/OrderRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import CheckoutRoutes from "./Routes/CheckoutRoutes.js";
import PaymentRoutes from "./Routes/PaymentRoutes.js";
import Analytics from "./Routes/Analytics.js";
import AdminUserRoutes from "./Routes/AdminUserRoutes.js";
import CouponRoutes from "./Routes/CouponRoutes.js";

dotenv.config({
    path: "./.env"
});


const app = express();
const port = 5000;

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

});

app.use(cors());
app.use(express.json());
app.use("/products", ProductRoutes);
console.log("Registering orders route...");
app.use("/orders", OrderRoutes);
app.use("/auth", authRoutes);
console.log("Auth routes loaded");
app.use("/checkout", CheckoutRoutes);
app.use("/payment", PaymentRoutes);
console.log("Payment done");
app.use("/analytics", Analytics);
app.use("/adminuser", AdminUserRoutes);
app.use("/coupon", CouponRoutes);
app.use("/ai", AiChatRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
});

server.listen(port, () => {
    console.log(`The server is connected to ${port}`);
});

app.use((req, res) => {
    console.log("No route matched", req.method, req.url);
    res.status(404).send("Route not found");
});