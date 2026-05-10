import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    address: String,

    phone: String,

    doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    },
{timestamps: true}
);

export default mongoose.model("Clinic", clinicSchema);