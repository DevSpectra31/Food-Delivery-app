import express from "express"
import { placeOrder ,verifyorder} from "../controller/order.controller.js"
import authMiddleware from "../middleware/auth.js"

const app = express.Router()

app.post("/placeorder",authMiddleware,placeOrder)
app.post("/verifyorder",authMiddleware,verifyorder)

export default app;