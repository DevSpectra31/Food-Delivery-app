import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectdb } from "./src/db/index.js";
import UserRoute from "./src/route/user.route.js"
import FoodRoute from "./src/route/food.route.js"
import CartRouter from "./src/route/cart.route.js"
import cookieParser from "cookie-parser";
dotenv.config({path:"./.env"});

const app = express();

const port = process.env.PORT || 3000;

//middlewares
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: "http://localhost:5173",
}))
app.use(cookieParser())
app.use("/images",express.static("uploads"))

//db connection 
await connectdb()
//api endpoints
app.use("/api/v1/users",UserRoute)
app.use("/api/v1/food",FoodRoute)
app.use("/api/v1/cart",CartRouter)

app.listen(port,()=>{
    console.log(`The app is running on the port : ${port}`)
})