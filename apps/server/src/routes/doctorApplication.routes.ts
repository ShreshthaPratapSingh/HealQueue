import express from "express";
import { applyAsDoctor } from "../controllers/doctorApplication.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/apply",
  upload.fields([
    {
      name: "profilePhoto",
      maxCount: 1,
    },

    {
      name: "medicalLicense",
      maxCount: 1,
    },

    {
      name: "governmentId",
      maxCount: 1,
    },

    {
      name: "degreeCertificate",
      maxCount: 1,
    },

    {
      name: "clinicRegistration",
      maxCount: 1,
    },
  ]),
  applyAsDoctor
);

export default router;