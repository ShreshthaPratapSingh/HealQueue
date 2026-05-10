import express from "express";
import { joinQueue } from "../controllers/queue.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/join", protect, joinQueue);

export default router;
