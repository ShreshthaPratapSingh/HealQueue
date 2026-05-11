"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const clinics = [
  { id: 1, name: "Sharma Health Clinic", address: "MG Road, Sector 14, Gurgaon", doctors: 6, queues: 3, rating: 4.8, status: "Active", patients: 45, color: "from-primary to-primary-dark" },
  { id: 2, name: "City Care Hospital", address: "Civil Lines, Jaipur", doctors: 12, queues: 5, rating: 4.6, status: "Active", patients: 78, color: "from-accent-green to-emerald-600" },
  { id: 3, name: "MedFirst Clinic", address: "Bandra West, Mumbai", doctors: 4, queues: 2, rating: 4.9, status: "Active", patients: 32, color: "from-violet-500 to-purple-600" },
  { id: 4, name: "Apollo Diagnostics", address: "Koramangala, Bangalore", doctors: 8, queues: 4, rating: 4.5, status: "Active", patients: 56, color: "from-amber-500 to-orange-600" },
  { id: 5, name: "Sunrise Medical Center", address: "Salt Lake, Kolkata", doctors: 10, queues: 0, rating: 4.3, status: "Inactive", patients: 0, color: "from-rose-500 to-pink-600" },
  { id: 6, name: "HealthPlus Clinic", address: "Anna Nagar, Chennai", doctors: 5, queues: 2, rating: 4.7, status: "Active", patients: 28, color: "from-cyan-500 to-blue-600" },
];

export default function ClinicsPage() {
  const [search, setSearch] = useState("");
  const filtered = clinics.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase()));
  const active = clinics.filter((c) => c.status === "Active").length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Clinics</h1>
          <p className="text-sm text-text-secondary">Manage registered clinics and hospitals</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-green" /> {active} active</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gray-300" /> {clinics.length - active} inactive</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Clinics", value: clinics.length, color: "text-primary", bg: "bg-primary-50" },
          { label: "Active", value: active, color: "text-accent-green", bg: "bg-accent-green-light" },
          { label: "Inactive", value: clinics.length - active, color: "text-text-muted", bg: "bg-bg-alt" },
          { label: "Avg Rating", value: "4.6 ★", color: "text-amber-600", bg: "bg-amber-50" },
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
        <input type="text" placeholder="Search clinics..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted" />
      </div>

      {/* Clinic Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((clinic, i) => (
          <motion.div key={clinic.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="group rounded-2xl border border-border-light bg-white overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
            {/* Banner */}
            <div className={`h-24 bg-gradient-to-br ${clinic.color} relative`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute top-3 right-3">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm ${clinic.status === "Active" ? "bg-white/20 text-white" : "bg-black/20 text-white/80"}`}>{clinic.status}</span>
              </div>
              <div className="absolute -bottom-5 left-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-lg font-bold text-primary shadow-lg border-2 border-white">
                  {clinic.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
              </div>
            </div>

            <div className="px-5 pt-8 pb-5">
              <h3 className="text-sm font-bold text-text-primary">{clinic.name}</h3>
              <p className="text-[11px] text-text-muted mt-0.5 flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                {clinic.address}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="text-center rounded-lg bg-bg-alt py-2">
                  <p className="text-sm font-bold text-text-primary">{clinic.doctors}</p>
                  <p className="text-[10px] text-text-muted">Doctors</p>
                </div>
                <div className="text-center rounded-lg bg-bg-alt py-2">
                  <p className="text-sm font-bold text-text-primary">{clinic.queues}</p>
                  <p className="text-[10px] text-text-muted">Queues</p>
                </div>
                <div className="text-center rounded-lg bg-bg-alt py-2">
                  <p className="text-sm font-bold text-amber-600">{clinic.rating} ★</p>
                  <p className="text-[10px] text-text-muted">Rating</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] text-text-muted">{clinic.patients} patients today</span>
                <button className="rounded-lg bg-primary-50 px-3 py-1.5 text-[11px] font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">View Details</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
