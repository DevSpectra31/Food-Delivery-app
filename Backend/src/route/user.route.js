import express from "express";
import { registerUser, loginUser, logout } from "../controller/user.controller.js";

const app = express.Router();

app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/logout", logout);

export default app;