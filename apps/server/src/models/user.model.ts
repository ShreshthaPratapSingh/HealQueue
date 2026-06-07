import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    role: "PATIENT" | "DOCTOR" | "RECEPTIONIST" | "ADMIN" | "PENDING_DOCTOR";
    clinicId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const userModel = new mongoose.Schema<IUser>({
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
        required: function(this: IUser){
            return this.role !== "PATIENT" && this.role !== "PENDING_DOCTOR"
        }
    }
}, { timestamps: true });

export default mongoose.model<IUser>("User", userModel);

