"use client";

import { motion } from "framer-motion";

const stats = [
  {
    label: "Total Patients Today",
    value: "24",
    change: "+3 from yesterday",
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
    value: "8",
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
    label: "Avg. Wait Time",
    value: "14 min",
    change: "2 min faster than avg",
    color: "text-accent-green",
    bg: "bg-accent-green-light",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    label: "Current Status",
    value: "Available",
    change: "Since 9:00 AM",
    color: "text-accent-green",
    bg: "bg-accent-green-light",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const recentPatients = [
  { name: "Rahul Verma", queue: "#3", type: "Walk-in", status: "Waiting", time: "10:30 AM" },
  { name: "Priya Kapoor", queue: "#4", type: "Online", status: "Waiting", time: "10:45 AM" },
  { name: "Amit Desai", queue: "#2", type: "Walk-in", status: "Done", time: "10:15 AM" },
  { name: "Sneha Iyer", queue: "#1", type: "Online", status: "Done", time: "9:50 AM" },
];

const upcomingAppointments = [
  { name: "Karan Malhotra", time: "11:30 AM", type: "Follow-up" },
  { name: "Deepa Joshi", time: "12:00 PM", type: "Consultation" },
  { name: "Arjun Nair", time: "2:00 PM", type: "New Patient" },
];

export default function DashboardPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="mb-1 text-2xl font-bold text-text-primary">Dashboard</h1>
      <p className="mb-8 text-sm text-text-secondary">Welcome back, Dr. Sharma. Here&apos;s your day at a glance.</p>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
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

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent Queue Activity */}
        <div className="xl:col-span-2 rounded-2xl border border-border-light bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-primary">Recent Queue Activity</h3>
            <a href="/doctor/Queue" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
              View Queue →
            </a>
          </div>
          <div className="space-y-3">
            {recentPatients.map((p) => (
              <div key={p.queue} className="flex items-center justify-between rounded-xl border border-border-light px-4 py-3 transition-colors hover:bg-bg-alt">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-sm font-bold text-primary">
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{p.name}</p>
                    <p className="text-[11px] text-text-muted">Queue {p.queue} · {p.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-bg-alt px-2.5 py-1 text-[10px] font-semibold text-text-secondary">
                    {p.type}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      p.status === "Waiting"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-accent-green-light text-accent-green"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-primary">Upcoming</h3>
            <a href="/doctor/schedule" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
              View All →
            </a>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((apt, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border-light px-4 py-3 transition-colors hover:bg-bg-alt">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-sm font-bold text-primary">
                  {apt.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{apt.name}</p>
                  <p className="text-[11px] text-text-muted">{apt.type}</p>
                </div>
                <span className="text-xs font-semibold text-text-secondary">{apt.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
