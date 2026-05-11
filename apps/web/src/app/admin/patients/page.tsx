"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const patients = [
  { id: 1, name: "Rahul Verma", age: 34, gender: "Male", lastVisit: "May 12, 2026", doctor: "Dr. Anika Sharma", status: "Active", visits: 8 },
  { id: 2, name: "Priya Kapoor", age: 28, gender: "Female", lastVisit: "May 11, 2026", doctor: "Dr. Rajesh Kumar", status: "Active", visits: 3 },
  { id: 3, name: "Amit Desai", age: 45, gender: "Male", lastVisit: "May 10, 2026", doctor: "Dr. Meera Reddy", status: "Active", visits: 12 },
  { id: 4, name: "Sneha Iyer", age: 31, gender: "Female", lastVisit: "May 9, 2026", doctor: "Dr. Vikram Singh", status: "Inactive", visits: 5 },
  { id: 5, name: "Karan Malhotra", age: 52, gender: "Male", lastVisit: "May 8, 2026", doctor: "Dr. Priya Sharma", status: "Active", visits: 15 },
  { id: 6, name: "Deepa Joshi", age: 38, gender: "Female", lastVisit: "May 7, 2026", doctor: "Dr. Sanjay Gupta", status: "Active", visits: 7 },
  { id: 7, name: "Arjun Nair", age: 42, gender: "Male", lastVisit: "May 6, 2026", doctor: "Dr. Kavita Nair", status: "Active", visits: 4 },
  { id: 8, name: "Rohit Sharma", age: 29, gender: "Male", lastVisit: "May 5, 2026", doctor: "Dr. Arjun Mehta", status: "Inactive", visits: 2 },
  { id: 9, name: "Anjali Singh", age: 36, gender: "Female", lastVisit: "May 4, 2026", doctor: "Dr. Anika Sharma", status: "Active", visits: 9 },
  { id: 10, name: "Vikash Patel", age: 55, gender: "Male", lastVisit: "May 3, 2026", doctor: "Dr. Rajesh Kumar", status: "Active", visits: 20 },
];

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = patients.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.doctor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-text-primary">Patients</h1>
        <p className="text-sm text-text-secondary">View and manage all registered patients</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Patients", value: "12,847", color: "text-primary", bg: "bg-primary-50" },
          { label: "Active", value: "10,234", color: "text-accent-green", bg: "bg-accent-green-light" },
          { label: "Today's Visits", value: "1,247", color: "text-amber-600", bg: "bg-amber-50" },
          { label: "New This Month", value: "342", color: "text-primary", bg: "bg-primary-50" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-light bg-white p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs font-medium text-text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-xl border border-border-light bg-white px-4 py-2 transition-colors focus-within:border-primary/30 w-full sm:w-80">
          <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <input type="text" placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted" />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Active", "Inactive"].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${filter === s ? "bg-primary text-white shadow-sm" : "bg-white border border-border-light text-text-secondary hover:bg-bg-alt"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border-light bg-white">
        <div className="hidden lg:grid grid-cols-12 gap-4 border-b border-border-light px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          <div className="col-span-3">Patient</div>
          <div className="col-span-1">Age</div>
          <div className="col-span-1">Gender</div>
          <div className="col-span-2">Last Visit</div>
          <div className="col-span-2">Doctor</div>
          <div className="col-span-1">Visits</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        {filtered.map((patient, i) => (
          <motion.div key={patient.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.03 }} className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-center border-b border-border-light px-6 py-4 transition-colors hover:bg-bg-alt">
            <div className="lg:col-span-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">
                {patient.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <p className="text-sm font-medium text-text-primary">{patient.name}</p>
            </div>
            <div className="lg:col-span-1 text-xs text-text-secondary">{patient.age}</div>
            <div className="lg:col-span-1 text-xs text-text-secondary">{patient.gender}</div>
            <div className="lg:col-span-2 text-xs text-text-muted">{patient.lastVisit}</div>
            <div className="lg:col-span-2 text-xs text-text-secondary">{patient.doctor}</div>
            <div className="lg:col-span-1 text-sm font-semibold text-text-primary">{patient.visits}</div>
            <div className="lg:col-span-2 flex justify-end">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${patient.status === "Active" ? "bg-accent-green-light text-accent-green" : "bg-gray-100 text-text-muted"}`}>{patient.status}</span>
            </div>
          </motion.div>
        ))}

        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-xs text-text-muted">Showing {filtered.length} of {patients.length}</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 128].map((p, i) => (
              <button key={i} className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${p === 1 ? "bg-primary text-white" : "text-text-secondary hover:bg-bg-alt"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
