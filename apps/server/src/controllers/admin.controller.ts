import { DoctorApplication } from "../models/doctorApplication.model.js";
import User from "../models/user.model.js";
import type { Request, Response } from "express";

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

export const approveApplication = async (
    req: Request,
    res: Response
) => {
    try {
        const applicationID = req.params.id;
        const doctorApplication = await DoctorApplication.findById(applicationID);

        if (!doctorApplication) {
            res.status(404).json({ message: "Application Not Found!" });
            return;
        }
        else if (doctorApplication.status !== "PENDING") {
            res.status(400).json({ message: "Application already reviewed" });
            return;
        }
        else {
            doctorApplication.status = "APPROVED";
            doctorApplication.reviewedBy = req.user.id;
            doctorApplication.reviewedAt = new Date();
            await doctorApplication.save();
            await User.findByIdAndUpdate(doctorApplication.userId, { role: "DOCTOR" });
            res.status(200).json({ message: "Application approved", application: doctorApplication });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong " })
    }
}

export const rejectApplication = async (
    req: Request,
    res: Response
) => {
    try {
        const applicationID = req.params.id;
        const doctorApplication = await DoctorApplication.findById(applicationID);

        if (!doctorApplication) {
            res.status(404).json({ message: "Application Not Found!" });
            return;
        }
        else if (doctorApplication.status !== "PENDING") {
            res.status(400).json({ message: "Application already reviewed" });
            return;
        }
        else {
            doctorApplication.status = "REJECTED";
            doctorApplication.reviewedBy = req.user.id;
            doctorApplication.reviewedAt = new Date();
            const rejectionReason = req.body.rejectionReason;
            doctorApplication.rejectionReason = rejectionReason;
            await doctorApplication.save();
            res.status(200).json({ message: "Application rejected", application: doctorApplication });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong " })
    }
}