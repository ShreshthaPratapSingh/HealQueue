import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["PATIENT", "DOCTOR", "RECEPTIONIST", "ADMIN", "PENDING_DOCTOR"],
        default: "PATIENT"
    },

    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: function(){
            return this.role !== "PATIENT" && this.role !== "PENDING_DOCTOR"
        }
    }
}, { timestamps: true });

export default mongoose.model("User", userModel);

