import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true,
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    currentToken: {
        type: Number,
        required: true,
        default: 0,
    },

    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open"
    },

    estimatedWaitPerPatient: {
        type: Number,
        default: 10,
    },

    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export default mongoose.model("Queue", queueSchema);