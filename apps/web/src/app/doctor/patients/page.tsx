"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const patients = [
  { id: 1, name: "Sneha Iyer", queue: 1, type: "Online" as const, phone: "+91 98765 43210", age: 28, gender: "Female", lastVisit: "2 May 2026" },
  { id: 2, name: "Amit Desai", queue: 2, type: "Walk-in" as const, phone: "+91 87654 32109", age: 45, gender: "Male", lastVisit: "2 May 2026" },
  { id: 3, name: "Rahul Verma", queue: 3, type: "Walk-in" as const, phone: "+91 76543 21098", age: 32, gender: "Male", lastVisit: "1 May 2026" },
  { id: 4, name: "Priya Kapoor", queue: 4, type: "Online" as const, phone: "+91 65432 10987", age: 38, gender: "Female", lastVisit: "30 Apr 2026" },
  { id: 5, name: "Karan Malhotra", queue: 5, type: "Walk-in" as const, phone: "+91 54321 09876", age: 50, gender: "Male", lastVisit: "28 Apr 2026" },
  { id: 6, name: "Deepa Joshi", queue: 6, type: "Online" as const, phone: "+91 43210 98765", age: 29, gender: "Female", lastVisit: "25 Apr 2026" },
  { id: 7, name: "Arjun Nair", queue: 7, type: "Walk-in" as const, phone: "+91 32109 87654", age: 41, gender: "Male", lastVisit: "20 Apr 2026" },
  { id: 8, name: "Meera Reddy", queue: 8, type: "Online" as const, phone: "+91 21098 76543", age: 35, gender: "Female", lastVisit: "18 Apr 2026" },
];

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "Walk-in" | "Online">("all");

  const filtered = patients
    .filter((p) => filter === "all" || p.type === filter)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="mb-1 text-2xl font-bold text-text-primary">Patients</h1>
      <p className="mb-8 text-sm text-text-secondary">View and manage your patient records</p>

      {/* Filters bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patients..."
            className="w-full rounded-xl border border-border bg-white py-2.5 pr-4 pl-10 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
            id="search-patients"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "Walk-in", "Online"] as const).map((f) => (
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
      </div>

      {/* Patients table */}
      <div className="rounded-2xl border border-border-light bg-white overflow-hidden">
        {/* Table header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 border-b border-border-light bg-bg-alt px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Patient</div>
          <div className="col-span-2">Phone</div>
          <div className="col-span-1">Age</div>
          <div className="col-span-1">Gender</div>
          <div className="col-span-2">Last Visit</div>
          <div className="col-span-2">Type</div>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg className="mb-3 h-10 w-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            <p className="text-sm text-text-secondary">No patients found</p>
          </div>
        )}

        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-center border-b border-border-light px-6 py-4 transition-colors hover:bg-bg-alt"
          >
            <div className="col-span-1 text-sm font-bold text-text-primary">
              <span className="lg:hidden text-text-muted font-normal text-xs">Queue </span>#{p.queue}
            </div>
            <div className="col-span-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary">
                {p.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <span className="text-sm font-medium text-text-primary">{p.name}</span>
            </div>
            <div className="col-span-2 text-xs text-text-muted">
              <span className="lg:hidden text-text-muted">Phone: </span>{p.phone}
            </div>
            <div className="col-span-1 text-xs text-text-secondary">
              <span className="lg:hidden text-text-muted">Age: </span>{p.age}
            </div>
            <div className="col-span-1 text-xs text-text-secondary">
              <span className="lg:hidden text-text-muted">Gender: </span>{p.gender}
            </div>
            <div className="col-span-2 text-xs text-text-muted">
              <span className="lg:hidden text-text-muted">Last visit: </span>{p.lastVisit}
            </div>
            <div className="col-span-2">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                p.type === "Online" ? "bg-primary-50 text-primary" : "bg-amber-50 text-amber-600"
              }`}>
                {p.type}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
