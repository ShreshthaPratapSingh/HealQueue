import mongoose from "mongoose";

const queueEntrySchema = new mongoose.Schema({
    queueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Queue",
        required: true
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },

    tokenNumber: {
        type: Number,
        required: true,
    },

    type: {
        type: String,
        enum: ["ONLINE", "WALK_IN"],
        default: "ONLINE"
    },

    status: {
        type: String,
        enum: ["WAITING", "SERVING", "COMPLETED", "SKIPPED"],
        default: "WAITING"
    },

    joinedAt: {
        type: Date,
        default: Date.now(),
    },

    estimatedWait: {
        type: Number,
    },
}, {timestamps: true});

// Prevent duplicate active queue entries: one patient can have at most one
// WAITING or SERVING entry per queue. Completed/Skipped entries don't block.
queueEntrySchema.index(
    { queueId: 1, patientId: 1 },
    {
        unique: true,
        partialFilterExpression: { status: { $in: ["WAITING", "SERVING"] } },
    }
);

export default mongoose.model("QueueEntry", queueEntrySchema);