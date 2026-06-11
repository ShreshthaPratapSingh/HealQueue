"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Application, UploadedFile } from "@/types/application.types";
import { getFullName, getInitials, formatStatus, formatDate, statusConfig } from "@/types/application.types";

interface DetailModalProps {
  app: Application;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function DetailModal({ app, onClose, onApprove, onReject }: DetailModalProps) {
  const [notes, setNotes] = useState("");
  const fullName = getFullName(app);

  const documentEntries: { label: string; file?: UploadedFile }[] = [
    { label: "Medical License Certificate", file: app.documents.medicalLicense },
    { label: "Government ID", file: app.documents.governmentId },
    { label: "Degree Certificate", file: app.documents.degreeCertificate },
    { label: "Clinic Registration", file: app.documents.clinicRegistration },
  ];

  const infoItems = [
    { label: "Clinic", value: app.clinicInfo.clinicName },
    { label: "Experience", value: `${app.professionalInfo.yearsOfExperience} years` },
    { label: "License ID", value: app.professionalInfo.medicalLicenseNumber },
    { label: "Email", value: app.personalInfo.email },
    { label: "Phone", value: app.personalInfo.phone },
    { label: "Applied On", value: formatDate(app.createdAt) },
    { label: "Qualification", value: app.professionalInfo.qualification },
    { label: "Consultation Fee", value: `₹${app.professionalInfo.consultationFee}` },
    { label: "Clinic Address", value: `${app.clinicInfo.clinicAddress}, ${app.clinicInfo.city}, ${app.clinicInfo.state} - ${app.clinicInfo.zipCode}` },
    { label: "Languages", value: app.professionalInfo.languagesSpoken.join(", ") || "N/A" },
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
          <h2 className="text-lg font-bold text-text-primary">Application Details</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-bg-alt transition-colors cursor-pointer">
            <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
              <h3 className="text-xl font-bold text-text-primary">{fullName}</h3>
              <p className="text-sm text-text-secondary">{app.professionalInfo.specialization}</p>
              <span className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusConfig[app.status]}`}>
                {formatStatus(app.status)}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div key={item.label} className="rounded-xl bg-bg-alt p-3">
                <p className="text-[11px] font-medium text-text-muted mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-text-primary">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Uploaded Documents</h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {documentEntries.map((doc) => (
                <div key={doc.label} className={`flex items-center gap-3 rounded-xl border border-border-light px-4 py-3 transition-colors ${doc.file ? "hover:bg-bg-alt" : "opacity-50"}`}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-text-secondary">{doc.label}</span>
                    {doc.file ? (
                      <a href={doc.file.url} target="_blank" rel="noopener noreferrer" className="block text-[10px] text-primary hover:underline truncate">View Document</a>
                    ) : (
                      <p className="text-[10px] text-text-muted">Not uploaded</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Notes */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-2">Admin Notes</h4>
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
              <button onClick={onApprove} className="flex-1 rounded-xl bg-accent-green px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-accent-green/20 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer">
                Approve Application
              </button>
              <button onClick={onReject} className="flex-1 rounded-xl border border-accent-red/30 bg-accent-red-light px-5 py-3 text-sm font-semibold text-accent-red transition-all hover:bg-accent-red hover:text-white active:scale-[0.98] cursor-pointer">
                Reject Application
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
