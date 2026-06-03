import { DoctorApplication } from "../models/doctorApplication.model.js";
import type { Request, Response } from "express";
import User from "../models/user.model.js";

export const sendApplications = async (
    req: Request,
    res: Response
) => {
    try {
        const application = await DoctorApplication.find();
        res.send(application);
        console.log(application);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}