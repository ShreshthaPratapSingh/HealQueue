/**
 * One-time cleanup script: removes duplicate active queue entries.
 * Run with:  npx tsx apps/server/src/scripts/cleanup-duplicate-entries.ts
 *
 * After running, restart the server so syncIndexes can create the partial unique index.
 */
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import QueueEntry from "../models/queueEntry.model.js";

async function main() {
    if (!process.env.MONGO_DB_URL) throw new Error("No MONGO_DB_URL");

    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to DB");

    // Find duplicate active entries: same patient + same queue with WAITING or SERVING
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

    if (duplicates.length === 0) {
        console.log("No duplicate active entries found. You're good!");
    } else {
        console.log(`Found ${duplicates.length} sets of duplicates. Cleaning up...`);
        for (const dup of duplicates) {
            // Keep the first entry, remove the rest
            const idsToRemove = dup.ids.filter(
                (id: mongoose.Types.ObjectId) => id.toString() !== dup.firstId.toString()
            );
            const result = await QueueEntry.deleteMany({ _id: { $in: idsToRemove } });
            console.log(
                `  Patient ${dup._id.patientId} in Queue ${dup._id.queueId}: removed ${result.deletedCount} duplicates`
            );
        }
        console.log("Cleanup complete.");
    }

    await mongoose.disconnect();
}

main().catch(console.error);
