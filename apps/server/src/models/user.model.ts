import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    firstName: String,
    lastName: String,
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
        enum: ["PATIENT", "DOCTOR", "RECEPTIONIST"],
        default: "PATIENT"
    },

    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: function(){
            return this.role !== "PATIENT"
        }
    }
}, { timestamps: true });

export default mongoose.model("User", userModel);

