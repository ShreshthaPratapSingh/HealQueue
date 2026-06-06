import express from "express";
import { sendApplications } from "../controllers/admin.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { approveApplication, rejectApplication } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/getApplications", protect, authorize("ADMIN"), sendApplications);
router.patch("/applications/:id/approve", protect, authorize("ADMIN"), approveApplication);
router.patch("/applications/:id/reject", protect, authorize("ADMIN"), rejectApplication);


export default router;