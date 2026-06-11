"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageSkeleton } from "@/components/ui/LoadingSkeleton";
import type { Application } from "@/types/application.types";
import DetailModal from "./components/DetailModal";
import ApplicationsTable from "./components/ApplicationsTable";

const API_BASE = "http://localhost:5000/api/adminRoutes";

export default function DoctorApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // ─── Fetch Applications ────────────────────────────────────────────
  useEffect(() => {
    fetch(`${API_BASE}/getApplications`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data) => setApps(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // ─── Filtering ─────────────────────────────────────────────────────
  const filtered = apps.filter((a) => {
    const fullName = `${a.personalInfo.firstName} ${a.personalInfo.lastName}`.toLowerCase();
    const matchSearch = fullName.includes(search.toLowerCase()) || a.professionalInfo.specialization.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || a.status === filterStatus.toUpperCase();
    return matchSearch && matchStatus;
  });

  const counts = {
    total: apps.length,
    pending: apps.filter((a) => a.status === "PENDING").length,
    approved: apps.filter((a) => a.status === "APPROVED").length,
    rejected: apps.filter((a) => a.status === "REJECTED").length,
  };

  // ─── Actions ───────────────────────────────────────────────────────
  const handleApprove = async (id: string) => {
    const res = await fetch(`${API_BASE}/applications/${id}/approve`, {
      method: "PATCH",
      credentials: "include",
    });
    if (res.ok) {
      setApps((prev) => prev.map((a) => a._id === id ? { ...a, status: "APPROVED" as const } : a));
      setSelectedApp(null);
    }
  };

  const handleReject = async (id: string) => {
    const res = await fetch(`${API_BASE}/applications/${id}/reject`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason: "Optional rejection reason" }),
    });
    if (res.ok) {
      setApps((prev) => prev.map((a) => a._id === id ? { ...a, status: "REJECTED" as const } : a));
      setSelectedApp(null);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────
  if (loading) return <PageSkeleton />;

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-24">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-red-light mb-4">
          <svg className="h-8 w-8 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-text-primary mb-1">Failed to load applications</p>
        <p className="text-xs text-text-muted mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer">
          Retry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-text-primary">Doctor Applications</h1>
        <p className="text-sm text-text-secondary">Review and manage doctor onboarding applications</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: counts.total, bg: "bg-primary-50", color: "text-primary" },
          { label: "Pending", value: counts.pending, bg: "bg-amber-50", color: "text-amber-600" },
          { label: "Approved", value: counts.approved, bg: "bg-accent-green-light", color: "text-accent-green" },
          { label: "Rejected", value: counts.rejected, bg: "bg-accent-red-light", color: "text-accent-red" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-light bg-white p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs font-medium text-text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-xl border border-border-light bg-white px-4 py-2 transition-colors focus-within:border-primary/30">
          <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
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
      <ApplicationsTable
        applications={filtered}
        totalCount={apps.length}
        onSelect={setSelectedApp}
        onApprove={handleApprove}
        onReject={handleReject}
      />

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
