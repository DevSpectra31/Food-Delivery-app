import express from "express"
import { registerUser,loginUser} from "../controller/user.controller.js";


const app = express.Router()

app.post("/register",registerUser)
app.post("/login",loginUser)


export default app;