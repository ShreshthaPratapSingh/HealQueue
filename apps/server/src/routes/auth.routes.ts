import express from "express";
import { login, signup } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { me } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, me);

export default router;