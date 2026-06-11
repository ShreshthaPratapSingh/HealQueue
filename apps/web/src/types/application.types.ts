// Shared doctor application types used across admin pages

export interface UploadedFile {
  url: string;
  publicId: string;
}

export interface Application {
  _id: string;
  userId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
    profilePhoto?: UploadedFile;
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
    medicalLicense?: UploadedFile;
    governmentId?: UploadedFile;
    degreeCertificate?: UploadedFile;
    clinicRegistration?: UploadedFile;
  };
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

// Helpers
export function formatStatus(status: string): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getFullName(app: Application): string {
  return `Dr. ${app.personalInfo.firstName} ${app.personalInfo.lastName}`;
}

export function getInitials(app: Application): string {
  return `${app.personalInfo.firstName[0] || ""}${app.personalInfo.lastName[0] || ""}`;
}

export const statusConfig: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-600 border-amber-200",
  APPROVED: "bg-accent-green-light text-accent-green border-accent-green/20",
  REJECTED: "bg-accent-red-light text-accent-red border-accent-red/20",
};
