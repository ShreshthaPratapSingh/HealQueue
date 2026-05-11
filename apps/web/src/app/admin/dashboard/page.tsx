"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Total Doctors",
    value: "128",
    change: "+12 this month",
    color: "text-primary",
    bg: "bg-primary-50",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    label: "Pending Applications",
    value: "23",
    change: "8 require review",
    color: "text-amber-600",
    bg: "bg-amber-50",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0h3m-3 0v3m0-3v-3m-6.75 9h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    label: "Active Clinics",
    value: "42",
    change: "+3 this week",
    color: "text-accent-green",
    bg: "bg-accent-green-light",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
      </svg>
    ),
  },
  {
    label: "Patients Today",
    value: "1,247",
    change: "+18% vs yesterday",
    color: "text-primary",
    bg: "bg-primary-50",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    label: "Live Queues",
    value: "38",
    change: "Across all clinics",
    color: "text-accent-green",
    bg: "bg-accent-green-light",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
  },
  {
    label: "Queue Efficiency",
    value: "94.2%",
    change: "+2.1% improvement",
    color: "text-accent-green",
    bg: "bg-accent-green-light",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Avg Wait Time",
    value: "12 min",
    change: "3 min faster this week",
    color: "text-primary",
    bg: "bg-primary-50",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "System Health",
    value: "99.9%",
    change: "All services operational",
    color: "text-accent-green",
    bg: "bg-accent-green-light",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
];

const queueTraffic = [
  { day: "Mon", value: 78 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 92 },
  { day: "Thu", value: 70 },
  { day: "Fri", value: 95 },
  { day: "Sat", value: 60 },
  { day: "Sun", value: 30 },
];

const patientVisits = [
  { day: "Mon", value: 180 },
  { day: "Tue", value: 220 },
  { day: "Wed", value: 195 },
  { day: "Thu", value: 240 },
  { day: "Fri", value: 260 },
  { day: "Sat", value: 150 },
  { day: "Sun", value: 80 },
];

const onboardingTrend = [
  { month: "Jan", value: 8 },
  { month: "Feb", value: 12 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 10 },
  { month: "May", value: 18 },
  { month: "Jun", value: 22 },
];

const liveActivity = [
  { clinic: "Sharma Health Clinic", action: "Token #12 called", time: "Just now", type: "queue" },
  { clinic: "City Care Hospital", action: "Dr. Patel went online", time: "2 min ago", type: "doctor" },
  { clinic: "MedFirst Clinic", action: "New patient registered", time: "5 min ago", type: "patient" },
  { clinic: "Apollo Diagnostics", action: "Queue paused temporarily", time: "8 min ago", type: "alert" },
  { clinic: "Sunrise Medical Center", action: "Token #8 completed", time: "12 min ago", type: "queue" },
  { clinic: "HealthPlus Clinic", action: "Walk-in patient added", time: "15 min ago", type: "patient" },
];

const recentApplications = [
  { name: "Dr. Rajesh Kumar", specialization: "Cardiologist", date: "Today", status: "Pending" },
  { name: "Dr. Meera Reddy", specialization: "Dermatologist", date: "Yesterday", status: "Pending" },
  { name: "Dr. Vikram Singh", specialization: "Orthopedic", date: "2 days ago", status: "Approved" },
  { name: "Dr. Ananya Das", specialization: "Pediatrician", date: "3 days ago", status: "Rejected" },
];

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const maxTraffic = Math.max(...queueTraffic.map((d) => d.value));
  const maxVisits = Math.max(...patientVisits.map((d) => d.value));
  const maxOnboarding = Math.max(...onboardingTrend.map((d) => d.value));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="text-sm text-text-secondary">Welcome back. Here&apos;s your system overview.</p>
        </div>
        <div className="flex items-center gap-2">
          {["24h", "7d", "30d"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedPeriod === period
                  ? "bg-primary text-white shadow-sm shadow-primary/20"
                  : "bg-white border border-border-light text-text-secondary hover:bg-bg-alt"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="group rounded-2xl border border-border-light bg-white p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs font-medium text-text-muted mt-0.5">{stat.label}</p>
            <p className="mt-2 text-[11px] text-text-muted">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        {/* Queue Traffic */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-primary">Queue Traffic</h3>
            <span className="text-[11px] font-medium text-text-muted">Last 7 days</span>
          </div>
          <div className="flex items-end justify-between gap-2" style={{ height: 140 }}>
            {queueTraffic.map((d, i) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxTraffic) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`w-full rounded-lg transition-colors ${
                    d.day === "Fri" ? "bg-primary" : "bg-primary-100 hover:bg-primary-200"
                  }`}
                  style={{ minHeight: 8 }}
                />
                <span className="text-[10px] font-medium text-text-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Patient Visits */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-primary">Daily Visits</h3>
            <span className="text-[11px] font-medium text-text-muted">This week</span>
          </div>
          <div className="flex items-end justify-between gap-2" style={{ height: 140 }}>
            {patientVisits.map((d, i) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxVisits) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`w-full rounded-lg transition-colors ${
                    d.day === "Fri" ? "bg-accent-green" : "bg-accent-green-light hover:bg-accent-green/30"
                  }`}
                  style={{ minHeight: 8 }}
                />
                <span className="text-[10px] font-medium text-text-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Onboarding Trend */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-primary">Onboarding</h3>
            <span className="text-[11px] font-medium text-text-muted">6 months</span>
          </div>
          <div className="flex items-end justify-between gap-2" style={{ height: 140 }}>
            {onboardingTrend.map((d, i) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxOnboarding) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`w-full rounded-lg transition-colors ${
                    d.month === "Jun" ? "bg-amber-500" : "bg-amber-100 hover:bg-amber-200"
                  }`}
                  style={{ minHeight: 8 }}
                />
                <span className="text-[10px] font-medium text-text-muted">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Live Activity Feed */}
        <div className="lg:col-span-2 rounded-2xl border border-border-light bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-green" />
              </span>
              <h3 className="text-base font-semibold text-text-primary">Live Queue Activity</h3>
            </div>
            <a href="/admin/queuemonitoring" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
              View All →
            </a>
          </div>
          <div className="space-y-3">
            {liveActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-center justify-between rounded-xl border border-border-light px-4 py-3 transition-colors hover:bg-bg-alt"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${
                    item.type === "queue" ? "bg-primary-50 text-primary" :
                    item.type === "doctor" ? "bg-accent-green-light text-accent-green" :
                    item.type === "patient" ? "bg-amber-50 text-amber-600" :
                    "bg-accent-red-light text-accent-red"
                  }`}>
                    {item.type === "queue" ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" /></svg>
                    ) : item.type === "doctor" ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ) : item.type === "patient" ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.action}</p>
                    <p className="text-[11px] text-text-muted">{item.clinic}</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-text-muted whitespace-nowrap">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-primary">Recent Applications</h3>
            <a href="/admin/doctorapplications" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
              View All →
            </a>
          </div>
          <div className="space-y-3">
            {recentApplications.map((app, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border-light px-4 py-3 transition-colors hover:bg-bg-alt">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-sm font-bold text-primary">
                  {app.name.split(" ").slice(1).map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{app.name}</p>
                  <p className="text-[11px] text-text-muted">{app.specialization} · {app.date}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  app.status === "Pending" ? "bg-amber-50 text-amber-600" :
                  app.status === "Approved" ? "bg-accent-green-light text-accent-green" :
                  "bg-accent-red-light text-accent-red"
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
