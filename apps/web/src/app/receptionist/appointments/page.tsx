"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Appointment {
  id: number;
  name: string;
  time: string;
  type: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  phone: string;
  bookingType: "Online" | "Phone";
}

const initialAppointments: Appointment[] = [
  { id: 1, name: "Vikram Singh", time: "11:30 AM", type: "Consultation", status: "Confirmed", phone: "+91 91234 56789", bookingType: "Online" },
  { id: 2, name: "Neha Gupta", time: "12:00 PM", type: "Follow-up", status: "Pending", phone: "+91 81234 56789", bookingType: "Online" },
  { id: 3, name: "Sneha Reddy", time: "12:30 PM", type: "New Patient", status: "Confirmed", phone: "+91 71234 56789", bookingType: "Phone" },
  { id: 4, name: "Arjun Nair", time: "1:00 PM", type: "Consultation", status: "Pending", phone: "+91 61234 56789", bookingType: "Online" },
  { id: 5, name: "Kavita Jain", time: "2:00 PM", type: "Follow-up", status: "Confirmed", phone: "+91 51234 56789", bookingType: "Phone" },
  { id: 6, name: "Deepak Rao", time: "2:30 PM", type: "Consultation", status: "Pending", phone: "+91 41234 56789", bookingType: "Online" },
  { id: 7, name: "Meera Reddy", time: "3:00 PM", type: "New Patient", status: "Confirmed", phone: "+91 31234 56789", bookingType: "Online" },
  { id: 8, name: "Suresh Patel", time: "3:30 PM", type: "Follow-up", status: "Pending", phone: "+91 21234 56789", bookingType: "Phone" },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState<"all" | "Confirmed" | "Pending" | "Cancelled">("all");

  const filtered = appointments.filter((a) => filter === "all" || a.status === filter);
  const pendingCount = appointments.filter((a) => a.status === "Pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "Confirmed").length;

  const handleConfirm = (id: number) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: "Confirmed" as const } : a));
  };

  const handleCancel = (id: number) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: "Cancelled" as const } : a));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="mb-1 text-2xl font-bold text-text-primary">Appointments</h1>
      <p className="mb-8 text-sm text-text-secondary">Manage upcoming patient bookings</p>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border-light bg-white p-5">
          <p className="text-xs font-medium text-text-muted">Total Today</p>
          <p className="text-2xl font-bold text-text-primary">{appointments.length}</p>
        </div>
        <div className="rounded-2xl border border-border-light bg-white p-5">
          <p className="text-xs font-medium text-text-muted">Confirmed</p>
          <p className="text-2xl font-bold text-accent-green">{confirmedCount}</p>
        </div>
        <div className="rounded-2xl border border-border-light bg-white p-5">
          <p className="text-xs font-medium text-text-muted">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {(["all", "Confirmed", "Pending", "Cancelled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl border px-4 py-2 text-xs font-semibold capitalize transition-all duration-200 cursor-pointer ${
              filter === f
                ? "border-primary bg-primary-50 text-primary"
                : "border-border text-text-secondary hover:bg-bg-alt"
            }`}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* Appointments list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-border-light bg-white">
            <svg className="mb-3 h-10 w-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <p className="text-sm text-text-secondary">No appointments found</p>
          </div>
        )}

        {filtered.map((apt, i) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            className={`rounded-2xl border border-border-light bg-white p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 ${
              apt.status === "Cancelled" ? "opacity-50" : ""
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">
                  {apt.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{apt.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {apt.time}
                    </span>
                    <span>·</span>
                    <span>{apt.type}</span>
                    <span>·</span>
                    <span>{apt.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  apt.bookingType === "Online" ? "bg-primary-50 text-primary" : "bg-amber-50 text-amber-600"
                }`}>
                  {apt.bookingType}
                </span>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                  apt.status === "Confirmed" ? "bg-accent-green-light text-accent-green border-accent-green/20" :
                  apt.status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-200" :
                  "bg-accent-red-light text-accent-red border-accent-red/20"
                }`}>
                  {apt.status}
                </span>
                {apt.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleConfirm(apt.id)}
                      className="rounded-xl bg-accent-green px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleCancel(apt.id)}
                      className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-text-secondary transition-all hover:bg-bg-alt cursor-pointer"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {apt.status === "Confirmed" && (
                  <button
                    onClick={() => handleCancel(apt.id)}
                    className="rounded-xl border border-accent-red/30 px-4 py-2 text-xs font-semibold text-accent-red transition-all hover:bg-accent-red-light cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
