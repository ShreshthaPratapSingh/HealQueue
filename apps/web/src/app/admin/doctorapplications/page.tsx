"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Matches the backend DoctorApplication model
interface UploadedFile {
  url: string;
  publicId: string;
}

interface Application {
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

// Helper: format status for display (PENDING -> Pending)
function formatStatus(status: string): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

// Helper: format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Helper: get full name from personalInfo
function getFullName(app: Application): string {
  return `Dr. ${app.personalInfo.firstName} ${app.personalInfo.lastName}`;
}

// Helper: get initials from name
function getInitials(app: Application): string {
  return `${app.personalInfo.firstName[0] || ""}${app.personalInfo.lastName[0] || ""}`;
}

const statusConfig: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-600 border-amber-200",
  APPROVED: "bg-accent-green-light text-accent-green border-accent-green/20",
  REJECTED: "bg-accent-red-light text-accent-red border-accent-red/20",
};

function DetailModal({
  app,
  onClose,
  onApprove,
  onReject,
}: {
  app: Application;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  const [notes, setNotes] = useState("");
  const fullName = getFullName(app);

  const documentEntries: { label: string; file?: UploadedFile }[] = [
    { label: "Medical License Certificate", file: app.documents.medicalLicense },
    { label: "Government ID", file: app.documents.governmentId },
    { label: "Degree Certificate", file: app.documents.degreeCertificate },
    { label: "Clinic Registration", file: app.documents.clinicRegistration },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border-light bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light bg-white/90 backdrop-blur-sm px-6 py-4 rounded-t-2xl">
          <h2 className="text-lg font-bold text-text-primary">
            Application Details
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-bg-alt transition-colors cursor-pointer"
          >
            <svg
              className="h-5 w-5 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-xl font-bold text-white shadow-lg shadow-primary/25">
              {getInitials(app)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-primary">
                {fullName}
              </h3>
              <p className="text-sm text-text-secondary">
                {app.professionalInfo.specialization}
              </p>
              <span
                className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusConfig[app.status]}`}
              >
                {formatStatus(app.status)}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Clinic", value: app.clinicInfo.clinicName },
              {
                label: "Experience",
                value: `${app.professionalInfo.yearsOfExperience} years`,
              },
              {
                label: "License ID",
                value: app.professionalInfo.medicalLicenseNumber,
              },
              { label: "Email", value: app.personalInfo.email },
              { label: "Phone", value: app.personalInfo.phone },
              { label: "Applied On", value: formatDate(app.createdAt) },
              {
                label: "Qualification",
                value: app.professionalInfo.qualification,
              },
              {
                label: "Consultation Fee",
                value: `₹${app.professionalInfo.consultationFee}`,
              },
              {
                label: "Clinic Address",
                value: `${app.clinicInfo.clinicAddress}, ${app.clinicInfo.city}, ${app.clinicInfo.state} - ${app.clinicInfo.zipCode}`,
              },
              {
                label: "Languages",
                value:
                  app.professionalInfo.languagesSpoken.join(", ") || "N/A",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-bg-alt p-3">
                <p className="text-[11px] font-medium text-text-muted mb-0.5">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">
              Uploaded Documents
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {documentEntries.map((doc) => (
                <div
                  key={doc.label}
                  className={`flex items-center gap-3 rounded-xl border border-border-light px-4 py-3 transition-colors ${doc.file ? "hover:bg-bg-alt" : "opacity-50"}`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
                    <svg
                      className="h-4 w-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-text-secondary">
                      {doc.label}
                    </span>
                    {doc.file ? (
                      <a
                        href={doc.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[10px] text-primary hover:underline truncate"
                      >
                        View Document
                      </a>
                    ) : (
                      <p className="text-[10px] text-text-muted">
                        Not uploaded
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Notes */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-2">
              Admin Notes
            </h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add review notes here..."
              className="w-full rounded-xl border border-border-light bg-bg-alt px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-primary/30 focus:bg-white transition-colors resize-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          {app.status === "PENDING" && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onApprove}
                className="flex-1 rounded-xl bg-accent-green px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-accent-green/20 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
              >
                Approve Application
              </button>
              <button
                onClick={onReject}
                className="flex-1 rounded-xl border border-accent-red/30 bg-accent-red-light px-5 py-3 text-sm font-semibold text-accent-red transition-all hover:bg-accent-red hover:text-white active:scale-[0.98] cursor-pointer"
              >
                Reject Application
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DoctorApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/adminRoutes/getApplications", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data) => setApps(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = apps.filter((a) => {
    const fullName =
      `${a.personalInfo.firstName} ${a.personalInfo.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(search.toLowerCase()) ||
      a.professionalInfo.specialization
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "All" || a.status === filterStatus.toUpperCase();
    return matchSearch && matchStatus;
  });

  const counts = {
    total: apps.length,
    pending: apps.filter((a) => a.status === "PENDING").length,
    approved: apps.filter((a) => a.status === "APPROVED").length,
    rejected: apps.filter((a) => a.status === "REJECTED").length,
  };

  // TODO: Wire these to actual backend endpoints (e.g. PATCH /api/adminRoutes/applications/:id/approve)
  const handleApprove = (id: string) => {
    setApps((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: "APPROVED" as const } : a))
    );
    setSelectedApp(null);
  };
  const handleReject = (id: string) => {
    setApps((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: "REJECTED" as const } : a))
    );
    setSelectedApp(null);
  };

  // Loading skeleton
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="mb-8">
          <div className="h-7 w-56 rounded-lg bg-bg-alt animate-pulse mb-2" />
          <div className="h-4 w-80 rounded-lg bg-bg-alt animate-pulse" />
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border-light bg-white p-4 text-center"
            >
              <div className="h-8 w-12 rounded-lg bg-bg-alt animate-pulse mx-auto mb-2" />
              <div className="h-3 w-16 rounded bg-bg-alt animate-pulse mx-auto" />
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border-light bg-white p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4"
            >
              <div className="h-10 w-10 rounded-xl bg-bg-alt animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 rounded bg-bg-alt animate-pulse" />
                <div className="h-3 w-24 rounded bg-bg-alt animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-red-light mb-4">
          <svg
            className="h-8 w-8 text-accent-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-text-primary mb-1">
          Failed to load applications
        </p>
        <p className="text-xs text-text-muted mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
        >
          Retry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-text-primary">
          Doctor Applications
        </h1>
        <p className="text-sm text-text-secondary">
          Review and manage doctor onboarding applications
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          {
            label: "Total",
            value: counts.total,
            bg: "bg-primary-50",
            color: "text-primary",
          },
          {
            label: "Pending",
            value: counts.pending,
            bg: "bg-amber-50",
            color: "text-amber-600",
          },
          {
            label: "Approved",
            value: counts.approved,
            bg: "bg-accent-green-light",
            color: "text-accent-green",
          },
          {
            label: "Rejected",
            value: counts.rejected,
            bg: "bg-accent-red-light",
            color: "text-accent-red",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border-light bg-white p-4 text-center"
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs font-medium text-text-muted mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-xl border border-border-light bg-white px-4 py-2 transition-colors focus-within:border-primary/30">
          <svg
            className="h-4 w-4 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 bg-transparent text-sm outline-none placeholder:text-text-muted"
            id="app-search"
          />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Pending", "Approved", "Rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${filterStatus === s ? "bg-primary text-white shadow-sm" : "bg-white border border-border-light text-text-secondary hover:bg-bg-alt"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border-light bg-white">
        <div className="hidden lg:grid grid-cols-12 gap-4 border-b border-border-light px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          <div className="col-span-3">Doctor</div>
          <div className="col-span-2">Clinic</div>
          <div className="col-span-1">Exp.</div>
          <div className="col-span-2">License</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-alt mb-4">
              <svg
                className="h-7 w-7 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0h3m-3 0v3m0-3v-3m-6.75 9h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-text-secondary">
              No applications found
            </p>
            <p className="text-xs text-text-muted mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((app) => {
              const fullName = getFullName(app);
              return (
                <motion.div
                  key={app._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedApp(app)}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-center border-b border-border-light px-6 py-4 transition-colors hover:bg-bg-alt cursor-pointer"
                >
                  <div className="lg:col-span-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">
                      {getInitials(app)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {fullName}
                      </p>
                      <p className="text-[11px] text-text-muted">
                        {app.professionalInfo.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-2 text-xs text-text-secondary">
                    <span className="lg:hidden text-text-muted">Clinic: </span>
                    {app.clinicInfo.clinicName}
                  </div>
                  <div className="lg:col-span-1 text-xs text-text-secondary">
                    <span className="lg:hidden text-text-muted">Exp: </span>
                    {app.professionalInfo.yearsOfExperience} yrs
                  </div>
                  <div className="lg:col-span-2 text-xs text-text-muted font-mono">
                    <span className="lg:hidden text-text-muted font-sans">
                      License:{" "}
                    </span>
                    {app.professionalInfo.medicalLicenseNumber}
                  </div>
                  <div className="lg:col-span-1 text-[11px] text-text-muted">
                    {formatDate(app.createdAt)}
                  </div>
                  <div className="lg:col-span-1">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusConfig[app.status]}`}
                    >
                      {formatStatus(app.status)}
                    </span>
                  </div>
                  <div className="lg:col-span-2 flex items-center justify-end gap-2">
                    {app.status === "PENDING" && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleApprove(app._id); }}
                          className="rounded-lg bg-accent-green/10 px-2.5 py-1.5 text-[11px] font-semibold text-accent-green hover:bg-accent-green hover:text-white transition-all cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleReject(app._id); }}
                          className="rounded-lg bg-accent-red/10 px-2.5 py-1.5 text-[11px] font-semibold text-accent-red hover:bg-accent-red hover:text-white transition-all cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedApp(app); }}
                      className="rounded-lg bg-primary-50 px-2.5 py-1.5 text-[11px] font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-xs text-text-muted">
            Showing {filtered.length} of {apps.length} applications
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <DetailModal
            app={selectedApp}
            onClose={() => setSelectedApp(null)}
            onApprove={() => handleApprove(selectedApp._id)}
            onReject={() => handleReject(selectedApp._id)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
