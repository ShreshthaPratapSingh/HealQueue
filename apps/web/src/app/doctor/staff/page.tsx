"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StaffMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "Active" | "Offline";
  joinedDate: string;
}

const initialStaff: StaffMember[] = [
  { id: 1, name: "Rekha Sharma", role: "Receptionist", email: "rekha@healqueue.com", phone: "+91 98765 00001", status: "Active", joinedDate: "Jan 2025" },
  { id: 2, name: "Vijay Kumar", role: "Receptionist", email: "vijay@healqueue.com", phone: "+91 98765 00002", status: "Active", joinedDate: "Mar 2025" },
  { id: 3, name: "Anita Desai", role: "Nurse", email: "anita@healqueue.com", phone: "+91 98765 00003", status: "Active", joinedDate: "Jun 2025" },
  { id: 4, name: "Suresh Patel", role: "Lab Technician", email: "suresh@healqueue.com", phone: "+91 98765 00004", status: "Offline", joinedDate: "Sep 2025" },
  { id: 5, name: "Kavita Jain", role: "Receptionist", email: "kavita@healqueue.com", phone: "+91 98765 00005", status: "Active", joinedDate: "Nov 2025" },
];

export default function StaffPage() {
  const [staff] = useState(initialStaff);
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Staff</h1>
          <p className="text-sm text-text-secondary">Manage your clinic staff and receptionists</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-200 hover:bg-primary-dark hover:shadow-lg active:scale-[0.98] cursor-pointer"
          id="add-receptionist-btn"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Receptionist
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Staff", value: staff.length, color: "text-primary", bg: "bg-primary-50" },
          { label: "Active Now", value: staff.filter((s) => s.status === "Active").length, color: "text-accent-green", bg: "bg-accent-green-light" },
          { label: "Receptionists", value: staff.filter((s) => s.role === "Receptionist").length, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-light bg-white p-5">
            <p className="text-xs font-medium text-text-muted">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Staff cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {staff.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="group rounded-2xl border border-border-light bg-white p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{member.name}</p>
                  <p className="text-xs text-text-muted">{member.role}</p>
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                member.status === "Active"
                  ? "bg-accent-green-light text-accent-green"
                  : "bg-gray-100 text-text-muted"
              }`}>
                {member.status}
              </span>
            </div>
            <div className="space-y-2 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {member.email}
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {member.phone}
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Joined {member.joinedDate}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Receptionist Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl border border-border-light bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">Add Receptionist</h3>
                <button onClick={() => setShowModal(false)} className="rounded-lg p-1.5 hover:bg-bg-alt transition-colors cursor-pointer">
                  <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Full Name", placeholder: "Enter full name", type: "text" },
                  { label: "Email", placeholder: "Enter email address", type: "email" },
                  { label: "Phone", placeholder: "Enter phone number", type: "tel" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="mb-1.5 block text-xs font-semibold text-text-secondary">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-border bg-bg-alt py-2.5 px-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-text-secondary transition-all hover:bg-bg-alt cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark active:scale-[0.98] cursor-pointer"
                  >
                    Add Staff
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
