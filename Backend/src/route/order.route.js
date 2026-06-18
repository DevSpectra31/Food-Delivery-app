import express from "express"
import { placeOrder } from "../controller/order.controller.js"
import authMiddleware from "../middleware/auth.js"

const app = express.Router()

app.post("/placeorder",authMiddleware,placeOrder)


export default app;