import { addtocart ,removefromCart ,getCartItems } from "../controller/cart.controller.js";
import authMiddleware from "../middleware/auth.js"; 
import express from "express"


const app = express.Router()
app.post("/add",authMiddleware,addtocart)
app.delete("/remove",authMiddleware,removefromCart)
app.get("/list",authMiddleware,getCartItems)




export default app;