import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import queueRoutes from "./routes/queue.routes.js";
import doctorApplicationRoutes from "./routes/doctorApplication.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import QueueEntry from "./models/queueEntry.model.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/doctor-applications", doctorApplicationRoutes);
app.use("/api/adminRoutes", adminRoutes);

const start = async () => {
    await connectDB();
    console.log("[STARTUP] DB connected");

    // Clean up any duplicate active entries before syncing indexes,
    // otherwise the partial unique index creation will fail with E11000.
    try {
        const duplicates = await QueueEntry.aggregate([
            { $match: { status: { $in: ["WAITING", "SERVING"] } } },
            {
                $group: {
                    _id: { queueId: "$queueId", patientId: "$patientId" },
                    count: { $sum: 1 },
                    ids: { $push: "$_id" },
                    firstId: { $first: "$_id" },
                },
            },
            { $match: { count: { $gt: 1 } } },
        ]);
        if (duplicates.length > 0) {
            for (const dup of duplicates) {
                const idsToRemove = dup.ids.filter(
                    (id: any) => id.toString() !== dup.firstId.toString()
                );
                await QueueEntry.deleteMany({ _id: { $in: idsToRemove } });
                console.log(`[STARTUP] Cleaned ${idsToRemove.length} duplicate active entries for patient ${dup._id.patientId}`);
            }
        } else {
            console.log("[STARTUP] No duplicate active entries found");
        }
    } catch (err) {
        console.warn("[STARTUP] Duplicate cleanup warning:", err);
    }

    // Clean up stale WAITING/SERVING entries in Closed queues
    try {
        const closedQueues = await Queue.find({ status: "Closed" }).select("_id");
        if (closedQueues.length > 0) {
            const closedIds = closedQueues.map(q => q._id);
            const result = await QueueEntry.updateMany(
                { queueId: { $in: closedIds }, status: { $in: ["WAITING", "SERVING"] } },
                { status: "COMPLETED" }
            );
            if (result.modifiedCount > 0) {
                console.log(`[STARTUP] Marked ${result.modifiedCount} stale entries in closed queues as COMPLETED`);
            }
        }
    } catch (err) {
        console.warn("[STARTUP] Stale entry cleanup warning:", err);
    }

    // Now sync indexes (creates the partial unique index)
    try {
        await QueueEntry.syncIndexes();
        console.log("[STARTUP] QueueEntry indexes synced");
    } catch (err) {
        console.warn("[STARTUP] Index sync warning (non-fatal):", err);
    }

    app.listen(5000, () => {
        console.log("[STARTUP] Server listening on port 5000");
    });
};

start().catch((err) => {
    console.error("[STARTUP] Fatal error:", err);
    process.exit(1);
});