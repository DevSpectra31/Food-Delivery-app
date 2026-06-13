import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectdb } from "./src/db/index.js";
import UserRoute from "./src/route/user.route.js"
import FoodRoute from "./src/route/food.route.js"
import cookieParser from "cookie-parser";
dotenv.config({path:"./.env"});

const app = express();

const port = process.env.PORT || 3000;

//middlewares
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: "https://localhost:5173",
}))
app.use(cookieParser())

//db connection 
await connectdb()
//api endpoints
app.use("/api/v1/users",UserRoute)
app.use("/api/v1/food",FoodRoute)

app.listen(port,()=>{
    console.log(`The app is running on the port : ${port}`)
})