import { DoctorApplication } from "../models/doctorApplication.model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const createApplication = async (
    body: any,
    files: any,
) => {
    const profilePhotoUpload: any = await uploadToCloudinary(
        files.profilePhoto[0].buffer
    )

    const medicalLicenseUpload: any = await uploadToCloudinary(
        files.medicalLicense[0].buffer
    )
    const clinicRegistrationUpload: any = await uploadToCloudinary(
        files.clinicRegistration[0].buffer
    )
    const degreeCertificateUpload: any = await uploadToCloudinary(
        files.degreeCertificate[0].buffer
    )
    const governmentIdUpload: any = await uploadToCloudinary(
        files.governmentId[0].buffer
    )

    const application =
        await DoctorApplication.create({
            userId: body.userId,

            personalInfo: {
                firstName: body.firstName,
                lastName: body.lastName,

                email: body.email,

                phone: body.phone,

                gender: body.gender,

                dob: body.dob,

                profilePhoto: {
                    url: profilePhotoUpload.secure_url,
                    publicId:
                        profilePhotoUpload.public_id,
                },
            },

            professionalInfo: {
                specialization:
                    body.specialization,

                qualification:
                    body.qualification,

                yearsOfExperience:
                    Number(body.yearsOfExperience),

                currentHospital:
                    body.currentHospital,

                currentPosition:
                    body.currentPosition,

                consultationFee:
                    Number(body.consultationFee),

                languagesSpoken:
                    body.languagesSpoken || [],

                medicalLicenseNumber:
                    body.medicalLicenseNumber,
            },

            clinicInfo: {
                clinicName: body.clinicName,

                clinicAddress:
                    body.clinicAddress,

                city: body.city,

                state: body.state,

                zipCode: body.zipCode,

                clinicPhone:
                    body.clinicPhone,

                workingHours:
                    body.workingHours,

                numberOfStaff:
                    Number(body.numberOfStaff),

                facilities:
                    body.facilities || [],
            },

            documents: {
                medicalLicense: {
                    url:
                        medicalLicenseUpload.secure_url,

                    publicId:
                        medicalLicenseUpload.public_id,
                },

                governmentId: {
                    url:
                        governmentIdUpload.secure_url,

                    publicId:
                        governmentIdUpload.public_id,
                },

                degreeCertificate: {
                    url:
                        degreeCertificateUpload.secure_url,

                    publicId:
                        degreeCertificateUpload.public_id,
                },

                clinicRegistration: {
                    url:
                        clinicRegistrationUpload.secure_url,

                    publicId:
                        clinicRegistrationUpload.public_id,
                },
            },
        });
    return application;
}   