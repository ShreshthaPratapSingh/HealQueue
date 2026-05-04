"use client";

import { motion } from "framer-motion";

const stats = [
  {
    label: "Total Patients Today",
    value: "31",
    change: "+5 from yesterday",
    color: "text-primary",
    bg: "bg-primary-50",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    label: "Patients Waiting",
    value: "9",
    change: "In queue right now",
    color: "text-amber-600",
    bg: "bg-amber-50",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Walk-ins Today",
    value: "12",
    change: "39% of total patients",
    color: "text-accent-green",
    bg: "bg-accent-green-light",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
      </svg>
    ),
  },
  {
    label: "Current Queue #",
    value: "#4",
    change: "Now serving",
    color: "text-primary",
    bg: "bg-primary-50",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
      </svg>
    ),
  },
];

const recentActivity = [
  { action: "Added walk-in patient", name: "Rohit Sharma", time: "2 min ago", type: "walk-in" },
  { action: "Checked in patient", name: "Priya Kapoor", time: "8 min ago", type: "online" },
  { action: "Added walk-in patient", name: "Karan Malhotra", time: "15 min ago", type: "walk-in" },
  { action: "Confirmed appointment", name: "Deepa Joshi", time: "22 min ago", type: "online" },
  { action: "Added walk-in patient", name: "Arjun Nair", time: "30 min ago", type: "walk-in" },
];

export default function DashboardPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="mb-1 text-2xl font-bold text-text-primary">Dashboard</h1>
      <p className="mb-8 text-sm text-text-secondary">Welcome back, Rekha. Here&apos;s today&apos;s overview.</p>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="group rounded-2xl border border-border-light bg-white p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
          >
            <div className="mb-3">
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

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent Activity */}
        <div className="xl:col-span-2 rounded-2xl border border-border-light bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-primary">Recent Activity</h3>
            <a href="/receptionist/queue" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
              View Queue →
            </a>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-border-light px-4 py-3 transition-colors hover:bg-bg-alt">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary">
                    {item.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.action}</p>
                    <p className="text-[11px] text-text-muted">{item.name} · {item.time}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  item.type === "walk-in" ? "bg-amber-50 text-amber-600" : "bg-primary-50 text-primary"
                }`}>
                  {item.type === "walk-in" ? "Walk-in" : "Online"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-5 text-base font-semibold text-text-primary">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/receptionist/queue" className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary-50 px-4 py-3.5 transition-all hover:shadow-md hover:-translate-y-0.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/25">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">Add Walk-in Patient</p>
                <p className="text-[11px] text-primary/60">Add to current queue</p>
              </div>
            </a>
            <a href="/receptionist/queue" className="flex items-center gap-3 rounded-xl border border-border-light px-4 py-3.5 transition-all hover:bg-bg-alt">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-green-light text-accent-green">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Manage Queue</p>
                <p className="text-[11px] text-text-muted">View & reorder patients</p>
              </div>
            </a>
            <a href="/receptionist/appointments" className="flex items-center gap-3 rounded-xl border border-border-light px-4 py-3.5 transition-all hover:bg-bg-alt">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Appointments</p>
                <p className="text-[11px] text-text-muted">View upcoming bookings</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
