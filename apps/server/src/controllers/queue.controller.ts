import type { Request, Response } from "express";
import type { JoinQueueBody } from "../types/queue.types.js";
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
    catch (err) {
        res.status(500).json({
            message: "Server error",
        });
    }
}