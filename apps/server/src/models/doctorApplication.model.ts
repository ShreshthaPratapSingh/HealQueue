import mongoose, { Schema, Document } from "mongoose";

export type DoctorApplicationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

interface IUploadedFile {
  url: string;
  publicId: string;
}

export interface IDoctorApplication extends Document {
  userId: mongoose.Types.ObjectId;

  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    dob: Date;

    profilePhoto?: IUploadedFile;
  };

  professionalInfo: {
    specialization: string;
    qualification: string;

    yearsOfExperience: string;

    currentHospital: string;

    currentPosition: string;

    consultationFee: number;

    languagesSpoken: string[];

    medicalLicenseNumber: string;
  };

  clinicInfo: {
    clinicName: string;

    clinicAddress: string;

    city: string;

    state: string;

    zipCode: string;

    clinicPhone: string;

    workingHours: string;

    numberOfStaff: string;

    facilities: string[];
  };

  documents: {
    medicalLicense?: IUploadedFile;

    governmentId?: IUploadedFile;

    degreeCertificate?: IUploadedFile;

    clinicRegistration?: IUploadedFile;
  };

  status: DoctorApplicationStatus;

  reviewedBy?: mongoose.Types.ObjectId;

  reviewedAt?: Date;

  rejectionReason?: string;
}

const uploadedFileSchema = new Schema<IUploadedFile>(
  {
    url: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const doctorApplicationSchema =
  new Schema<IDoctorApplication>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      personalInfo: {
        firstName: {
          type: String,
          required: true,
        },

        lastName: {
          type: String,
          required: true,
        },

        email: {
          type: String,
          required: true,
        },

        phone: {
          type: String,
          required: true,
        },

        gender: {
          type: String,
          required: true,
        },

        dob: {
          type: Date,
          required: true,
        },

        profilePhoto: uploadedFileSchema,
      },

      professionalInfo: {
        specialization: {
          type: String,
          required: true,
        },

        qualification: {
          type: String,
          required: true,
        },

        yearsOfExperience: {
          type: String,
          required: true,
        },

        currentHospital: {
          type: String,
        },

        currentPosition: {
          type: String,
        },

        consultationFee: {
          type: Number,
          required: true,
        },

        languagesSpoken: {
          type: [String],
          default: [],
        },

        medicalLicenseNumber: {
          type: String,
          required: true,
          unique: true,
        },
      },

      clinicInfo: {
        clinicName: {
          type: String,
          required: true,
        },

        clinicAddress: {
          type: String,
          required: true,
        },

        city: {
          type: String,
          required: true,
        },

        state: {
          type: String,
          required: true,
        },

        zipCode: {
          type: String,
          required: true,
        },

        clinicPhone: {
          type: String,
          required: true,
        },

        workingHours: {
          type: String,
        },

        numberOfStaff: {
          type: String,
        },

        facilities: {
          type: [String],
          default: [],
        },
      },

      documents: {
        medicalLicense: uploadedFileSchema,

        governmentId: uploadedFileSchema,

        degreeCertificate:
          uploadedFileSchema,

        clinicRegistration:
          uploadedFileSchema,
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "APPROVED",
          "REJECTED",
        ],
        default: "PENDING",
      },

      reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      reviewedAt: Date,

      rejectionReason: String,
    },
    {
      timestamps: true,
    }
  );

export const DoctorApplication =
  mongoose.model<IDoctorApplication>(
    "DoctorApplication",
    doctorApplicationSchema
  );