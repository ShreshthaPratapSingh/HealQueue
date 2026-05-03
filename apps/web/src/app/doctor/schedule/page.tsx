"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const currentMonth = "May 2026";
const calendarDays = [
  { day: 28, isCurrentMonth: false }, { day: 29, isCurrentMonth: false }, { day: 30, isCurrentMonth: false },
  { day: 1, isCurrentMonth: true, appointments: 3 }, { day: 2, isCurrentMonth: true, appointments: 5 },
  { day: 3, isCurrentMonth: true, appointments: 2 }, { day: 4, isCurrentMonth: true, appointments: 4, isToday: true },
  { day: 5, isCurrentMonth: true, appointments: 6 }, { day: 6, isCurrentMonth: true },
  { day: 7, isCurrentMonth: true, appointments: 3 }, { day: 8, isCurrentMonth: true, appointments: 1 },
  { day: 9, isCurrentMonth: true, appointments: 4 }, { day: 10, isCurrentMonth: true, appointments: 2 },
  { day: 11, isCurrentMonth: true }, { day: 12, isCurrentMonth: true, appointments: 5 },
  { day: 13, isCurrentMonth: true, appointments: 3 }, { day: 14, isCurrentMonth: true },
  { day: 15, isCurrentMonth: true, appointments: 2 }, { day: 16, isCurrentMonth: true, appointments: 7 },
  { day: 17, isCurrentMonth: true, appointments: 1 }, { day: 18, isCurrentMonth: true },
  { day: 19, isCurrentMonth: true, appointments: 4 }, { day: 20, isCurrentMonth: true, appointments: 3 },
  { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true, appointments: 2 },
  { day: 23, isCurrentMonth: true, appointments: 5 }, { day: 24, isCurrentMonth: true },
  { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true, appointments: 1 },
  { day: 27, isCurrentMonth: true, appointments: 3 }, { day: 28, isCurrentMonth: true },
  { day: 29, isCurrentMonth: true, appointments: 2 }, { day: 30, isCurrentMonth: true, appointments: 4 },
  { day: 31, isCurrentMonth: true }, { day: 1, isCurrentMonth: false },
];

const todayAppointments = [
  { id: 1, name: "Rahul Verma", time: "9:00 AM - 9:30 AM", type: "Consultation", status: "Completed" },
  { id: 2, name: "Priya Kapoor", time: "10:00 AM - 10:30 AM", type: "Follow-up", status: "Completed" },
  { id: 3, name: "Karan Malhotra", time: "11:00 AM - 11:30 AM", type: "New Patient", status: "In Progress" },
  { id: 4, name: "Deepa Joshi", time: "12:00 PM - 12:30 PM", type: "Consultation", status: "Upcoming" },
  { id: 5, name: "Arjun Nair", time: "2:00 PM - 2:30 PM", type: "Follow-up", status: "Upcoming" },
  { id: 6, name: "Meera Reddy", time: "3:00 PM - 3:30 PM", type: "New Patient", status: "Upcoming" },
];

export default function SchedulePage() {
  const [view, setView] = useState<"calendar" | "list">("calendar");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Schedule</h1>
          <p className="text-sm text-text-secondary">Manage your upcoming appointments</p>
        </div>
        <div className="flex gap-2">
          {(["calendar", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-xl border px-4 py-2 text-xs font-semibold capitalize transition-all duration-200 cursor-pointer ${
                view === v ? "border-primary bg-primary-50 text-primary" : "border-border text-text-secondary hover:bg-bg-alt"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Calendar / List */}
        <div className="xl:col-span-2">
          {view === "calendar" ? (
            <div className="rounded-2xl border border-border-light bg-white p-6">
              <div className="mb-5 flex items-center justify-between">
                <button className="rounded-lg p-1.5 hover:bg-bg-alt transition-colors cursor-pointer">
                  <svg className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <h3 className="text-base font-semibold text-text-primary">{currentMonth}</h3>
                <button className="rounded-lg p-1.5 hover:bg-bg-alt transition-colors cursor-pointer">
                  <svg className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {daysOfWeek.map((d) => (
                  <div key={d} className="py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-text-muted">{d}</div>
                ))}
              </div>
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((d, i) => (
                  <div
                    key={i}
                    className={`relative flex flex-col items-center rounded-xl p-2 text-sm transition-colors cursor-pointer ${
                      !d.isCurrentMonth ? "text-text-muted/40" :
                      d.isToday ? "bg-primary text-white font-bold shadow-md shadow-primary/25" :
                      "text-text-primary hover:bg-bg-alt"
                    }`}
                  >
                    <span>{d.day}</span>
                    {d.appointments && d.isCurrentMonth && !d.isToday && (
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                    {d.appointments && d.isToday && (
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border-light bg-white">
              <div className="border-b border-border-light px-6 py-4">
                <h3 className="text-base font-semibold text-text-primary">All Appointments — Today</h3>
              </div>
              <div className="divide-y divide-border-light">
                {todayAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-bg-alt">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary">
                        {apt.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{apt.name}</p>
                        <p className="text-[11px] text-text-muted">{apt.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline rounded-full bg-bg-alt px-2.5 py-1 text-[10px] font-semibold text-text-secondary">{apt.type}</span>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        apt.status === "Completed" ? "bg-accent-green-light text-accent-green" :
                        apt.status === "In Progress" ? "bg-primary-50 text-primary" :
                        "bg-amber-50 text-amber-600"
                      }`}>{apt.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Today's summary sidebar */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-5 text-base font-semibold text-text-primary">Today&apos;s Summary</h3>
          <div className="space-y-4">
            <div className="rounded-xl border border-border-light p-4">
              <p className="text-xs font-medium text-text-muted">Total Appointments</p>
              <p className="text-2xl font-bold text-text-primary">{todayAppointments.length}</p>
            </div>
            <div className="rounded-xl border border-border-light p-4">
              <p className="text-xs font-medium text-text-muted">Completed</p>
              <p className="text-2xl font-bold text-accent-green">{todayAppointments.filter((a) => a.status === "Completed").length}</p>
            </div>
            <div className="rounded-xl border border-border-light p-4">
              <p className="text-xs font-medium text-text-muted">Remaining</p>
              <p className="text-2xl font-bold text-primary">{todayAppointments.filter((a) => a.status === "Upcoming").length}</p>
            </div>
          </div>

          <h4 className="mt-6 mb-3 text-sm font-semibold text-text-primary">Next Up</h4>
          <div className="space-y-2">
            {todayAppointments.filter((a) => a.status === "Upcoming").slice(0, 3).map((apt) => (
              <div key={apt.id} className="flex items-center gap-3 rounded-xl border border-border-light px-3 py-2.5 transition-colors hover:bg-bg-alt">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary">
                  {apt.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">{apt.name}</p>
                  <p className="text-[11px] text-text-muted">{apt.time.split(" - ")[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
