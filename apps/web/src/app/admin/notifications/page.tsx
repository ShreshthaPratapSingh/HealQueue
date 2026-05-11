"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "system" | "application" | "queue" | "alert";
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, title: "New Doctor Application", message: "Dr. Rajesh Kumar submitted a new application for review.", time: "5 min ago", type: "application", read: false },
  { id: 2, title: "Queue Alert", message: "Sharma Health Clinic queue wait time exceeded 20 minutes.", time: "12 min ago", type: "alert", read: false },
  { id: 3, title: "System Update", message: "Platform v2.4.1 deployed successfully. All services operational.", time: "1 hour ago", type: "system", read: false },
  { id: 4, title: "Application Approved", message: "Dr. Vikram Singh's application was approved by admin.", time: "2 hours ago", type: "application", read: true },
  { id: 5, title: "Queue Closed", message: "BrainCare Hospital queue closed for the day. 12 patients served.", time: "3 hours ago", type: "queue", read: true },
  { id: 6, title: "New Clinic Registered", message: "HealthPlus Clinic has been registered on the platform.", time: "5 hours ago", type: "system", read: true },
  { id: 7, title: "High Traffic Alert", message: "City Care Hospital experiencing 2x normal queue volume.", time: "6 hours ago", type: "alert", read: true },
  { id: 8, title: "Application Rejected", message: "Dr. Ananya Das's application was rejected. Reason: incomplete documents.", time: "Yesterday", type: "application", read: true },
];

const typeConfig: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  system: { bg: "bg-primary-50", color: "text-primary", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg> },
  application: { bg: "bg-accent-green-light", color: "text-accent-green", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0h3m-3 0v3m0-3v-3m-6.75 9h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg> },
  queue: { bg: "bg-amber-50", color: "text-amber-600", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg> },
  alert: { bg: "bg-accent-red-light", color: "text-accent-red", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg> },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = notifications.filter((n) => filter === "All" || n.type === filter.toLowerCase());

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const toggleRead = (id: number) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: !n.read } : n));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Notifications</h1>
          <p className="text-sm text-text-secondary">{unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-bg-alt transition-colors cursor-pointer">
            Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        {["All", "System", "Application", "Queue", "Alert"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${filter === f ? "bg-primary text-white shadow-sm" : "bg-white border border-border-light text-text-secondary hover:bg-bg-alt"}`}>{f}</button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((notif, i) => {
          const config = typeConfig[notif.type];
          return (
            <motion.div key={notif.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.04 }} className={`rounded-2xl border bg-white p-5 transition-all hover:shadow-md cursor-pointer ${notif.read ? "border-border-light" : "border-primary/20 bg-primary-50/20"}`} onClick={() => toggleRead(notif.id)}>
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.color}`}>
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-text-primary">{notif.title}</h3>
                    {!notif.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{notif.message}</p>
                  <p className="mt-2 text-[11px] text-text-muted">{notif.time}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
