import type { Request, Response } from "express";
import { createApplication } from "../services/doctorApplication.service.js";

export const applyAsDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const application =
      await createApplication(
        req.body,
        req.files
      );

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};