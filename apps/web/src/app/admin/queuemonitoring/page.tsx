"use client";

import { motion } from "framer-motion";

const queueStats = [
  { label: "Active Queues", value: "38", color: "text-accent-green", bg: "bg-accent-green-light" },
  { label: "Total Waiting", value: "142", color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Avg Wait Time", value: "12 min", color: "text-primary", bg: "bg-primary-50" },
  { label: "Served Today", value: "1,089", color: "text-accent-green", bg: "bg-accent-green-light" },
];

const clinicQueues = [
  { clinic: "Sharma Health Clinic", doctor: "Dr. Anika Sharma", currentToken: 12, waiting: 8, avgWait: "14 min", status: "Active" },
  { clinic: "City Care Hospital", doctor: "Dr. Rajesh Kumar", currentToken: 23, waiting: 15, avgWait: "18 min", status: "Active" },
  { clinic: "MedFirst Clinic", doctor: "Dr. Meera Reddy", currentToken: 7, waiting: 3, avgWait: "8 min", status: "Active" },
  { clinic: "Apollo Diagnostics", doctor: "Dr. Vikram Singh", currentToken: 18, waiting: 12, avgWait: "16 min", status: "Active" },
  { clinic: "Women Wellness Center", doctor: "Dr. Priya Sharma", currentToken: 15, waiting: 6, avgWait: "10 min", status: "Paused" },
  { clinic: "BrainCare Hospital", doctor: "Dr. Sanjay Gupta", currentToken: 0, waiting: 0, avgWait: "—", status: "Closed" },
  { clinic: "EyeSight Clinic", doctor: "Dr. Kavita Nair", currentToken: 9, waiting: 5, avgWait: "11 min", status: "Active" },
  { clinic: "ENT Solutions", doctor: "Dr. Arjun Mehta", currentToken: 11, waiting: 7, avgWait: "13 min", status: "Active" },
];

const activityFeed = [
  { event: "Token #12 called", clinic: "Sharma Health Clinic", time: "Just now" },
  { event: "Patient checked in", clinic: "City Care Hospital", time: "1 min ago" },
  { event: "Queue paused by doctor", clinic: "Women Wellness Center", time: "3 min ago" },
  { event: "Token #23 completed", clinic: "City Care Hospital", time: "5 min ago" },
  { event: "Walk-in patient added", clinic: "MedFirst Clinic", time: "7 min ago" },
  { event: "Token #18 called", clinic: "Apollo Diagnostics", time: "9 min ago" },
  { event: "Queue resumed", clinic: "EyeSight Clinic", time: "12 min ago" },
  { event: "Patient no-show (#15)", clinic: "ENT Solutions", time: "15 min ago" },
];

const statusConfig: Record<string, { badge: string; dot: string }> = {
  Active: { badge: "bg-accent-green-light text-accent-green", dot: "bg-accent-green" },
  Paused: { badge: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  Closed: { badge: "bg-gray-100 text-text-muted", dot: "bg-gray-300" },
};

export default function QueueMonitoringPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Queue Monitoring</h1>
          <p className="text-sm text-text-secondary">Real-time queue status across all clinics</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-green" />
          </span>
          <span className="text-xs font-semibold text-accent-green">Live</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {queueStats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-light bg-white p-5">
            <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>
            </div>
            <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            <p className="text-xs font-medium text-text-muted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Queue Cards */}
        <div className="lg:col-span-2 space-y-4">
          {clinicQueues.map((q, i) => (
            <motion.div key={q.clinic} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }} className={`rounded-2xl border bg-white p-5 transition-all hover:shadow-md ${q.status === "Active" ? "border-border-light" : q.status === "Paused" ? "border-amber-200" : "border-border-light opacity-60"}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">
                    {q.clinic.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{q.clinic}</p>
                    <p className="text-[11px] text-text-muted">{q.doctor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">#{q.currentToken}</p>
                    <p className="text-[10px] text-text-muted">Current</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-amber-600">{q.waiting}</p>
                    <p className="text-[10px] text-text-muted">Waiting</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-text-secondary">{q.avgWait}</p>
                    <p className="text-[10px] text-text-muted">Avg Wait</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1.5 ${statusConfig[q.status].badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${statusConfig[q.status].dot} ${q.status === "Active" ? "animate-pulse" : ""}`} />
                    {q.status}
                  </span>
                </div>
              </div>

              {q.status === "Active" && (
                <div className="mt-3">
                  <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((q.currentToken / (q.currentToken + q.waiting)) * 100, 100)}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <div className="mb-5 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
            </span>
            <h3 className="text-base font-semibold text-text-primary">Activity Feed</h3>
          </div>
          <div className="space-y-3">
            {activityFeed.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: i * 0.05 }} className="flex items-start gap-3 rounded-xl border border-border-light px-3 py-2.5 hover:bg-bg-alt transition-colors">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary">{item.event}</p>
                  <p className="text-[10px] text-text-muted truncate">{item.clinic} · {item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
