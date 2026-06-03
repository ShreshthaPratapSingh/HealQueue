import express from "express";
import { sendApplications } from "../controllers/admin.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/getApplications", protect, authorize("ADMIN"), sendApplications);

export default router;