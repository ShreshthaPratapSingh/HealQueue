import { DoctorApplication } from "../models/doctorApplication.model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/hash.js";

export const createApplication = async (
    body: any,
    files: any,
) => {
    // 1. Validate required files exist FIRST (before creating anything)
    const requiredFiles = ["profilePhoto", "medicalLicense", "clinicRegistration", "degreeCertificate", "governmentId"];
    for (const field of requiredFiles) {
        if (!files?.[field]?.[0]) {
            throw new Error(`Missing required file: ${field}`);
        }
    }

    // 2. Validate required body fields
    if (!body.email || !body.password) {
        throw new Error("Email and password are required");
    }

    // 3. Check if user with this email already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        throw new Error("A user with this email already exists");
    }

    // 4. Upload files FIRST (before creating user)
    let profilePhotoUpload: any;
    let medicalLicenseUpload: any;
    let clinicRegistrationUpload: any;
    let degreeCertificateUpload: any;
    let governmentIdUpload: any;

    try {
        console.log("📤 Uploading files to Cloudinary...");
        profilePhotoUpload = await uploadToCloudinary(files.profilePhoto[0].buffer);
        medicalLicenseUpload = await uploadToCloudinary(files.medicalLicense[0].buffer);
        clinicRegistrationUpload = await uploadToCloudinary(files.clinicRegistration[0].buffer);
        degreeCertificateUpload = await uploadToCloudinary(files.degreeCertificate[0].buffer);
        governmentIdUpload = await uploadToCloudinary(files.governmentId[0].buffer);
        console.log("✅ All files uploaded successfully");
    } catch (uploadError: any) {
        console.error("❌ File upload failed:", uploadError.message);
        throw new Error(`File upload failed: ${uploadError.message}`);
    }

    // 5. Create user account AFTER uploads succeed
    const hashedPassword = await hashPassword(body.password);
    const newUser = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        password: hashedPassword,
        role: "PENDING_DOCTOR",
    });

    // 6. Create the application
    try {
        const application = await DoctorApplication.create({
            userId: newUser._id,

            personalInfo: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                gender: body.gender,
                dob: body.dob,
                profilePhoto: {
                    url: profilePhotoUpload.secure_url,
                    publicId: profilePhotoUpload.public_id,
                },
            },

            professionalInfo: {
                specialization: body.specialization,
                qualification: body.qualification,
                yearsOfExperience: body.yearsOfExperience,
                currentHospital: body.currentHospital,
                currentPosition: body.currentPosition,
                consultationFee: Number(body.consultationFee),
                languagesSpoken: body.languagesSpoken || [],
                medicalLicenseNumber: body.medicalLicenseNumber,
            },

            clinicInfo: {
                clinicName: body.clinicName,
                clinicAddress: body.clinicAddress,
                city: body.city,
                state: body.state,
                zipCode: body.zipCode,
                clinicPhone: body.clinicPhone,
                workingHours: body.workingHours,
                numberOfStaff: body.numberOfStaff,
                facilities: body.facilities || [],
            },

            documents: {
                medicalLicense: {
                    url: medicalLicenseUpload.secure_url,
                    publicId: medicalLicenseUpload.public_id,
                },
                governmentId: {
                    url: governmentIdUpload.secure_url,
                    publicId: governmentIdUpload.public_id,
                },
                degreeCertificate: {
                    url: degreeCertificateUpload.secure_url,
                    publicId: degreeCertificateUpload.public_id,
                },
                clinicRegistration: {
                    url: clinicRegistrationUpload.secure_url,
                    publicId: clinicRegistrationUpload.public_id,
                },
            },
        });

        console.log("✅ Application created successfully for:", body.email);
        return application;
    } catch (dbError: any) {
        // If application creation fails, clean up the user
        await User.findByIdAndDelete(newUser._id);
        console.error("❌ Application creation failed, user cleaned up:", dbError.message);
        throw dbError;
    }
}