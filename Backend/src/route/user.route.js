import express from "express";
import { registerUser, loginUser, logout } from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.js";
const app = express.Router();

app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/logout",authMiddleware, logout);

export default app;