import dotenv from "dotenv"
dotenv.config({path:"./.env"});
import express from "express";
import cors from "cors";
import { connectdb } from "./src/db/index.js";
import UserRoute from "./src/route/user.route.js"
import FoodRoute from "./src/route/food.route.js"
import CartRouter from "./src/route/cart.route.js";
import OrderRouter from "./src/route/order.route.js"
import cookieParser from "cookie-parser";
import ChatRouter from "./src/route/chat.route.js"

const app = express();

const port = process.env.PORT || 3000;

//middlewares
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175"]
}))
app.use(cookieParser())
app.use("/images",express.static("uploads"))

//db connection 
await connectdb()
//api endpoints
app.use("/api/v1/users",UserRoute)
app.use("/api/v1/food",FoodRoute)
app.use("/api/v1/cart",CartRouter)
app.use("/api/v1/order",OrderRouter)
app.use("/api/v1/chat",ChatRouter)

app.listen(port,()=>{
    console.log(`The app is running on the port : ${port}`)
})