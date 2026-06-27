import type { Request, Response } from "express";
import type { JoinQueueBody } from "../types/queue.types.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import Queue from "../models/queue.model.js";
import QueueEntry from "../models/queueEntry.model.js";

export const joinQueue = async (
    req: Request<{}, {}, JoinQueueBody>,
    res: Response
) => {
    try {

        const { queueId, type } = req.body;

        const patientId = req.user.id;

        const queue = await Queue.findById(queueId);

        if (!queue) {
            return res.status(404).json({
                message: "Queue not found!!"
            })
        }

        // Check if the patient already has an active entry in this queue
        const existingEntry = await QueueEntry.findOne({
            queueId: new mongoose.Types.ObjectId(queueId),
            patientId: new mongoose.Types.ObjectId(patientId),
            status: { $in: ["WAITING", "SERVING"] },
        });

        if (existingEntry) {
            return res.status(409).json({
                message: "You are already in this queue",
                tokenNumber: existingEntry.tokenNumber,
                estimatedWait: existingEntry.estimatedWait,
                entry: existingEntry,
            });
        }

        const lastEntry = await QueueEntry.findOne({
            queueId: new mongoose.Types.ObjectId(queueId),
        }).sort({ tokenNumber: -1 });

        const nextToken = lastEntry ? lastEntry.tokenNumber + 1 : 1;

        const estimatedWait = (nextToken - queue.currentToken - 1) * queue.estimatedWaitPerPatient

        const entry = await QueueEntry.create({
            queueId,
            patientId,
            tokenNumber: nextToken,
            type: type || "ONLINE",
            estimatedWait,
        });

        res.status(201).json({
            message: "Joined queue successfully",
            tokenNumber: nextToken,
            estimatedWait,
            entry,
        });
    }
    catch (err: any) {
        // Handle race condition: MongoDB duplicate key error from partial unique index
        if (err.code === 11000) {
            const existingEntry = await QueueEntry.findOne({
                queueId: new mongoose.Types.ObjectId(req.body.queueId),
                patientId: new mongoose.Types.ObjectId(req.user.id),
                status: { $in: ["WAITING", "SERVING"] },
            });
            return res.status(409).json({
                message: "You are already in this queue",
                tokenNumber: existingEntry?.tokenNumber,
                estimatedWait: existingEntry?.estimatedWait,
                entry: existingEntry,
            });
        }
        res.status(500).json({
            message: "Server error",
        });
    }
}

// Get all active queue entries for the authenticated patient
export const getMyActiveEntries = async (
    req: Request,
    res: Response,
) => {
    try {
        const patientId = req.user.id;
        const entries = await QueueEntry.find({
            patientId: new mongoose.Types.ObjectId(patientId),
            status: { $in: ["WAITING", "SERVING"] },
        }).populate({
            path: "queueId",
            populate: [
                { path: "doctorId", select: "firstName lastName" },
                { path: "clinicId", select: "name address" },
            ],
        });
        return res.status(200).json({ entries });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

export const createQueue = async (
    req: Request,
    res: Response,
) => {
    try {
        const doctor = await User.findById(req.user.id);

        if (!doctor || !doctor.clinicId) {
            return res.status(404).json({ message: "Doctor or clinic not found" });
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const existingQueue = await Queue.findOne({
            doctorId: req.user.id,
            status: "Open",
            date: { $gte: startOfDay, $lte: endOfDay }
        })

        if (existingQueue) {
            return res.status(400).json({ message: "Queue already exists." })
        }
        else {
            const newQueue = await Queue.create({
                doctorId: req.user.id,
                clinicId: doctor.clinicId,
                currentToken: 0,
                status: "Open"
            })
            return res.status(201).json({ message: "Queue created", queue: newQueue });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const getQueue = async (
    req: Request,
    res: Response,
) => {
    try{
        const queueId = req.params.id as string;
        const queue = await Queue.findById(queueId).populate("doctorId", "firstName lastName")
        .populate("clinicId", "name address");
        if(!queue){
            return res.status(404).json({ message: "Queue Not Found!" });
        }
        else {
            const queueEntryDocumentsCount = await QueueEntry.countDocuments({ queueId: queueId as any, status: "WAITING" });
            const estimatedTime = queue.estimatedWaitPerPatient * queueEntryDocumentsCount;
            return res.status(200).json({ queue, waitingCount: queueEntryDocumentsCount, estimatedTime });
        }
    }
    catch(err){
        res.status(500).json({ message: "Server error" });
    }
}

export const getQueueEntries = async (
    req: Request,
    res: Response,
) => {
    try{
        const queueId = req.params.id as string;
        const entries = await QueueEntry.find({ queueId: queueId as any })
            .sort({ tokenNumber: 1 })
            .populate("patientId", "firstName lastName");
        return res.status(200).json({ entries });
    }
    catch(err){
        res.status(500).json({ message: "Server error" });
    }
}

export const nextPatient = async (
    req: Request,
    res: Response,
) => {
    try {
        const queueId = req.params.id as string;
        const queue = await Queue.findById(queueId);

        if (!queue) {
            return res.status(404).json({ message: "Queue not found" });
        }
        if (queue.status !== "Open") {
            return res.status(400).json({ message: "Queue is closed" });
        }

        await QueueEntry.findOneAndUpdate(
            { queueId: queueId as any, status: "SERVING" },
            { status: "COMPLETED" }
        );

        const nextEntry = await QueueEntry.findOneAndUpdate(
            { queueId: queueId as any, status: "WAITING" },
            { status: "SERVING" },
            { sort: { tokenNumber: 1 }, new: true }
        ).populate("patientId", "firstName lastName");

        if (nextEntry) {
            queue.currentToken = nextEntry.tokenNumber;
            await queue.save();
        }

        return res.status(200).json({
            message: nextEntry ? "Next patient is now being served" : "No more patients in queue",
            currentPatient: nextEntry,
            currentToken: queue.currentToken,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

export const skipPatient = async (
    req: Request,
    res: Response,
) => {
    try {
        const queueId = req.params.id as string;
        const queue = await Queue.findById(queueId);

        if (!queue) {
            return res.status(404).json({ message: "Queue not found" });
        }
        if (queue.status !== "Open") {
            return res.status(400).json({ message: "Queue is closed" });
        }

        const skippedEntry = await QueueEntry.findOneAndUpdate(
            { queueId: queueId as any, status: "SERVING" },
            { status: "SKIPPED" },
            { new: true }
        );

        if (!skippedEntry) {
            return res.status(400).json({ message: "No patient currently being served" });
        }

        const nextEntry = await QueueEntry.findOneAndUpdate(
            { queueId: queueId as any, status: "WAITING" },
            { status: "SERVING" },
            { sort: { tokenNumber: 1 }, new: true }
        ).populate("patientId", "firstName lastName");

        if (nextEntry) {
            queue.currentToken = nextEntry.tokenNumber;
            await queue.save();
        }

        return res.status(200).json({
            message: "Patient skipped",
            skippedPatient: skippedEntry,
            currentPatient: nextEntry,
            currentToken: queue.currentToken,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

export const closeQueue = async (
    req: Request,
    res: Response,
) => {
    try {
        const queueId = req.params.id as string;
        const queue = await Queue.findById(queueId);

        if (!queue) {
            return res.status(404).json({ message: "Queue not found" });
        }
        if (queue.doctorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only close your own queue" });
        }
        if (queue.status === "Closed") {
            return res.status(400).json({ message: "Queue is already closed" });
        }

        queue.status = "Closed";
        await queue.save();

        await QueueEntry.updateMany(
            { queueId: queueId as any, status: "WAITING" },
            { status: "SKIPPED" }
        );

        return res.status(200).json({ message: "Queue closed", queue });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getAvailableDoctors = async (
    req: Request,
    res: Response,
) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const openQueues = await Queue.find({
            status: "Open",
            date: { $gte: startOfDay, $lte: endOfDay }
        })
            .populate("doctorId", "firstName lastName")
            .populate("clinicId", "name address");

        const queuesWithCounts = await Promise.all(
            openQueues.map(async (queue) => {
                const waitingCount = await QueueEntry.countDocuments({
                    queueId: queue._id,
                    status: "WAITING"
                });
                return {
                    queue,
                    waitingCount,
                    estimatedWait: waitingCount * queue.estimatedWaitPerPatient,
                };
            })
        );

        return res.status(200).json({ doctors: queuesWithCounts });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}