// Shared queue-related types used across doctor and patient pages

export interface PatientInfo {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface DoctorInfo {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface ClinicInfo {
  _id: string;
  name: string;
  address: string;
}

export interface QueueEntry {
  _id: string;
  queueId: string;
  patientId: PatientInfo;
  tokenNumber: number;
  type: "ONLINE" | "WALK_IN";
  status: "WAITING" | "SERVING" | "COMPLETED" | "SKIPPED";
  joinedAt: string;
  estimatedWait: number;
}

export interface QueueInfo {
  _id: string;
  doctorId: string | DoctorInfo;
  clinicId: string | ClinicInfo;
  currentToken: number;
  status: "Open" | "Closed";
  estimatedWaitPerPatient: number;
  date: string;
}

export interface AvailableDoctor {
  queue: QueueInfo & { doctorId: DoctorInfo; clinicId: ClinicInfo };
  waitingCount: number;
  estimatedWait: number;
}

// Display status mapping
export type DisplayStatus = "Serving" | "Waiting" | "Done" | "Skipped";

export function mapStatus(status: QueueEntry["status"]): DisplayStatus {
  switch (status) {
    case "SERVING": return "Serving";
    case "WAITING": return "Waiting";
    case "COMPLETED": return "Done";
    case "SKIPPED": return "Skipped";
  }
}

// Helpers
export function getPatientName(entry: QueueEntry): string {
  if (entry.patientId && typeof entry.patientId === "object") {
    return `${entry.patientId.firstName} ${entry.patientId.lastName}`;
  }
  return "Unknown Patient";
}

export function getPatientInitials(entry: QueueEntry): string {
  if (entry.patientId && typeof entry.patientId === "object") {
    return `${entry.patientId.firstName[0] || ""}${entry.patientId.lastName[0] || ""}`;
  }
  return "?";
}

export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
