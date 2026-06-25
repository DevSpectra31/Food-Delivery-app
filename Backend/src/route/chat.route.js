import express from "express";
import { chat } from "../controller/chat.controller.js";
import authMiddleware from "../middleware/auth.js";
const router=express.Router();

router.post("/talk",authMiddleware,chat);

export default router;