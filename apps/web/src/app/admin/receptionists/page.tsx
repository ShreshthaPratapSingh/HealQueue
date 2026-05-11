"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const receptionists = [
  { id: 1, name: "Rekha Sharma", clinic: "Sharma Health Clinic", status: "Online", patientsHandled: 31, shift: "9:00 AM – 5:00 PM", joinDate: "Jan 2024" },
  { id: 2, name: "Anita Verma", clinic: "City Care Hospital", status: "Online", patientsHandled: 45, shift: "8:00 AM – 4:00 PM", joinDate: "Mar 2024" },
  { id: 3, name: "Pooja Mehta", clinic: "MedFirst Clinic", status: "Offline", patientsHandled: 0, shift: "2:00 PM – 10:00 PM", joinDate: "Jun 2024" },
  { id: 4, name: "Sunita Rao", clinic: "Apollo Diagnostics", status: "Online", patientsHandled: 38, shift: "9:00 AM – 5:00 PM", joinDate: "Feb 2024" },
  { id: 5, name: "Deepika Jain", clinic: "HealthPlus Clinic", status: "Online", patientsHandled: 22, shift: "10:00 AM – 6:00 PM", joinDate: "Aug 2024" },
  { id: 6, name: "Neha Gupta", clinic: "Sunrise Medical Center", status: "Offline", patientsHandled: 0, shift: "8:00 AM – 4:00 PM", joinDate: "Nov 2024" },
];

export default function ReceptionistsPage() {
  const [search, setSearch] = useState("");
  const filtered = receptionists.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.clinic.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-text-primary">Receptionists</h1>
        <p className="text-sm text-text-secondary">Manage all registered receptionists across clinics</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Receptionists", value: receptionists.length, color: "text-primary", bg: "bg-primary-50" },
          { label: "Online Now", value: receptionists.filter((r) => r.status === "Online").length, color: "text-accent-green", bg: "bg-accent-green-light" },
          { label: "Patients Handled Today", value: receptionists.reduce((a, r) => a + r.patientsHandled, 0), color: "text-amber-600", bg: "bg-amber-50" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-light bg-white p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs font-medium text-text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-border-light bg-white px-4 py-2 transition-colors focus-within:border-primary/30 w-full sm:w-80">
        <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
        <input type="text" placeholder="Search receptionists..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border-light bg-white">
        <div className="hidden lg:grid grid-cols-12 gap-4 border-b border-border-light px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          <div className="col-span-3">Receptionist</div>
          <div className="col-span-3">Clinic</div>
          <div className="col-span-2">Shift</div>
          <div className="col-span-1">Handled</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Joined</div>
        </div>

        {filtered.map((rec, i) => (
          <motion.div key={rec.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.04 }} className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-center border-b border-border-light px-6 py-4 transition-colors hover:bg-bg-alt">
            <div className="lg:col-span-3 flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">
                  {rec.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${rec.status === "Online" ? "bg-accent-green" : "bg-gray-300"}`} />
              </div>
              <p className="text-sm font-medium text-text-primary">{rec.name}</p>
            </div>
            <div className="lg:col-span-3 text-xs text-text-secondary">{rec.clinic}</div>
            <div className="lg:col-span-2 text-xs text-text-muted">{rec.shift}</div>
            <div className="lg:col-span-1 text-sm font-semibold text-text-primary">{rec.patientsHandled}</div>
            <div className="lg:col-span-1">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${rec.status === "Online" ? "bg-accent-green-light text-accent-green" : "bg-gray-100 text-text-muted"}`}>{rec.status}</span>
            </div>
            <div className="lg:col-span-2 text-right text-xs text-text-muted">{rec.joinDate}</div>
          </motion.div>
        ))}

        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-xs text-text-muted">Showing {filtered.length} receptionists</p>
        </div>
      </div>
    </motion.div>
  );
}
