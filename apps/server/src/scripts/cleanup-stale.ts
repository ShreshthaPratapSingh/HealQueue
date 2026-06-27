// Cleanup: mark SERVING entries in Closed queues as COMPLETED
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import Queue from "../models/queue.model.js";
import QueueEntry from "../models/queueEntry.model.js";

async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL!);
    console.log("Connected to DB");

    // Find all closed queues
    const closedQueues = await Queue.find({ status: "Closed" });
    console.log(`Found ${closedQueues.length} closed queues`);

    for (const q of closedQueues) {
        // Mark any WAITING/SERVING entries in closed queues as COMPLETED
        const result = await QueueEntry.updateMany(
            { queueId: q._id, status: { $in: ["WAITING", "SERVING"] } },
            { status: "COMPLETED" }
        );
        if (result.modifiedCount > 0) {
            console.log(`Queue ${q._id}: marked ${result.modifiedCount} stale entries as COMPLETED`);
        }
    }

    // Verify: count remaining active entries
    const activeCount = await QueueEntry.countDocuments({ status: { $in: ["WAITING", "SERVING"] } });
    console.log(`Remaining active entries: ${activeCount}`);

    process.exit(0);
}

main().catch(err => {
    console.error("Fatal:", err);
    process.exit(1);
});
