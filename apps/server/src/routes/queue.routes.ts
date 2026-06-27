import express from "express";
import {
    joinQueue,
    createQueue,
    getQueue,
    getQueueEntries,
    nextPatient,
    skipPatient,
    closeQueue,
    getAvailableDoctors,
    getMyActiveEntries
} from "../controllers/queue.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/join", protect, joinQueue);
router.post("/create", protect, authorize("DOCTOR"), createQueue);

// Static paths MUST come before parameterized /:id routes
router.get("/doctors/available", protect, getAvailableDoctors);
router.get("/my-entries", protect, getMyActiveEntries);

// Parameterized routes
router.patch("/:id/next", protect, authorize("DOCTOR"), nextPatient);
router.patch("/:id/skip", protect, authorize("DOCTOR"), skipPatient);
router.patch("/:id/close", protect, authorize("DOCTOR"), closeQueue);
router.get("/:id/entries", protect, authorize("DOCTOR"), getQueueEntries);
router.get("/:id", protect, getQueue);

export default router;

