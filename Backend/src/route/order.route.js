import express from "express"
import { placeOrder ,verifyorder,listOrders} from "../controller/order.controller.js"
import authMiddleware from "../middleware/auth.js"

const app = express.Router();



console.log("Routes order are called ")
app.post("/place",authMiddleware,placeOrder)
app.post("/verifyorder",authMiddleware,verifyorder)
app.get("/list",authMiddleware,listOrders)
export default app;