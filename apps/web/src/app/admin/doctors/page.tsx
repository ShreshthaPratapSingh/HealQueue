"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const doctors = [
  { id: 1, name: "Dr. Anika Sharma", specialization: "General Physician", clinic: "Sharma Health Clinic", patients: 24, queueStatus: "Active", online: true, rating: 4.9, todayServed: 18 },
  { id: 2, name: "Dr. Rajesh Kumar", specialization: "Cardiologist", clinic: "Heart Care Clinic", patients: 31, queueStatus: "Active", online: true, rating: 4.8, todayServed: 22 },
  { id: 3, name: "Dr. Meera Reddy", specialization: "Dermatologist", clinic: "SkinFirst Clinic", patients: 15, queueStatus: "Paused", online: true, rating: 4.7, todayServed: 10 },
  { id: 4, name: "Dr. Vikram Singh", specialization: "Orthopedic Surgeon", clinic: "BoneJoint Hospital", patients: 19, queueStatus: "Active", online: false, rating: 4.6, todayServed: 14 },
  { id: 5, name: "Dr. Priya Sharma", specialization: "Gynecologist", clinic: "Women Wellness Center", patients: 28, queueStatus: "Active", online: true, rating: 4.9, todayServed: 20 },
  { id: 6, name: "Dr. Sanjay Gupta", specialization: "Neurologist", clinic: "BrainCare Hospital", patients: 12, queueStatus: "Closed", online: false, rating: 4.5, todayServed: 12 },
  { id: 7, name: "Dr. Kavita Nair", specialization: "Ophthalmologist", clinic: "EyeSight Clinic", patients: 20, queueStatus: "Active", online: true, rating: 4.8, todayServed: 16 },
  { id: 8, name: "Dr. Arjun Mehta", specialization: "ENT Specialist", clinic: "ENT Solutions", patients: 17, queueStatus: "Active", online: true, rating: 4.7, todayServed: 13 },
];

const queueConfig: Record<string, string> = {
  Active: "bg-accent-green-light text-accent-green",
  Paused: "bg-amber-50 text-amber-600",
  Closed: "bg-gray-100 text-text-muted",
};

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const filtered = doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Doctors</h1>
          <p className="text-sm text-text-secondary">Monitor all registered doctors and their activity</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-green" /> {doctors.filter((d) => d.online).length} online</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gray-300" /> {doctors.filter((d) => !d.online).length} offline</span>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-border-light bg-white px-4 py-2 transition-colors focus-within:border-primary/30 w-full sm:w-80">
        <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
        <input type="text" placeholder="Search doctors..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border-light bg-white">
        <div className="hidden lg:grid grid-cols-12 gap-4 border-b border-border-light px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          <div className="col-span-3">Doctor</div>
          <div className="col-span-2">Clinic</div>
          <div className="col-span-1">Patients</div>
          <div className="col-span-1">Served</div>
          <div className="col-span-1">Rating</div>
          <div className="col-span-1">Queue</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Performance</div>
        </div>

        {filtered.map((doc, i) => (
          <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.03 }} className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-center border-b border-border-light px-6 py-4 transition-colors hover:bg-bg-alt">
            <div className="lg:col-span-3 flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">
                  {doc.name.split(" ").slice(1).map((n) => n[0]).join("")}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${doc.online ? "bg-accent-green" : "bg-gray-300"}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                <p className="text-[11px] text-text-muted">{doc.specialization}</p>
              </div>
            </div>
            <div className="lg:col-span-2 text-xs text-text-secondary truncate">{doc.clinic}</div>
            <div className="lg:col-span-1 text-sm font-semibold text-text-primary">{doc.patients}</div>
            <div className="lg:col-span-1 text-sm font-semibold text-text-primary">{doc.todayServed}</div>
            <div className="lg:col-span-1 text-xs font-semibold text-amber-600">{doc.rating} ★</div>
            <div className="lg:col-span-1">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${queueConfig[doc.queueStatus]}`}>{doc.queueStatus}</span>
            </div>
            <div className="lg:col-span-1">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${doc.online ? "bg-accent-green-light text-accent-green" : "bg-gray-100 text-text-muted"}`}>
                {doc.online ? "Online" : "Offline"}
              </span>
            </div>
            <div className="lg:col-span-2 flex justify-end">
              <div className="flex items-center gap-1.5 w-24">
                <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((doc.todayServed / doc.patients) * 100, 100)}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} className="h-full rounded-full bg-primary" />
                </div>
                <span className="text-[10px] font-semibold text-text-muted">{Math.round((doc.todayServed / doc.patients) * 100)}%</span>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-xs text-text-muted">Showing {filtered.length} doctors</p>
        </div>
      </div>
    </motion.div>
  );
}
