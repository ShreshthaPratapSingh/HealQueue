// Quick debug script: test the queue endpoints
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import User from "../models/user.model.js";
import Queue from "../models/queue.model.js";
import QueueEntry from "../models/queueEntry.model.js";
import "../models/clinic.model.js";

async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL!);
    console.log("Connected to DB");

    // Find a patient
    const patient = await User.findOne({ role: "PATIENT" });
    console.log("Patient:", patient?._id, patient?.firstName, patient?.role);

    // Find an open queue
    const queue = await Queue.findOne({ status: "Open" });
    console.log("Open queue:", queue?._id, "doctor:", queue?.doctorId);

    if (!patient || !queue) {
        console.log("No patient or open queue found");
        process.exit(0);
    }

    // Test: find active entries for this patient (same query as getMyActiveEntries)
    try {
        const entries = await QueueEntry.find({
            patientId: patient._id.toString(),
            status: { $in: ["WAITING", "SERVING"] },
        }).populate({
            path: "queueId",
            populate: [
                { path: "doctorId", select: "firstName lastName" },
                { path: "clinicId", select: "name address" },
            ],
        }).lean();
        console.log("Active entries:", JSON.stringify(entries, null, 2));
    } catch (err) {
        console.error("getMyActiveEntries query FAILED:", err);
    }

    // Test: check existing entry for this patient in this queue
    try {
        const existing = await QueueEntry.findOne({
            queueId: queue._id.toString(),
            patientId: patient._id.toString(),
            status: { $in: ["WAITING", "SERVING"] },
        });
        console.log("Existing entry:", existing);
    } catch (err) {
        console.error("findOne query FAILED:", err);
    }

    // List all QueueEntry indexes
    const indexes = await QueueEntry.collection.indexes();
    console.log("QueueEntry indexes:", JSON.stringify(indexes, null, 2));

    process.exit(0);
}

main().catch(err => {
    console.error("Fatal:", err);
    process.exit(1);
});
