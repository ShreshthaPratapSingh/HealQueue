"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const periods = ["Today", "This Week", "This Month", "This Year"];

const kpis = [
  { label: "Total Revenue", value: "₹18,42,500", change: "+14.2%", positive: true },
  { label: "Avg Queue Time", value: "12.4 min", change: "-18%", positive: true },
  { label: "Patient Satisfaction", value: "4.7 / 5", change: "+0.3", positive: true },
  { label: "Doctor Utilization", value: "87.3%", change: "+5.1%", positive: true },
];

const queueTrends = [
  { hour: "8AM", value: 12 }, { hour: "9AM", value: 34 }, { hour: "10AM", value: 56 },
  { hour: "11AM", value: 72 }, { hour: "12PM", value: 65 }, { hour: "1PM", value: 40 },
  { hour: "2PM", value: 58 }, { hour: "3PM", value: 70 }, { hour: "4PM", value: 48 },
  { hour: "5PM", value: 30 }, { hour: "6PM", value: 15 },
];

const waitTimeData = [
  { range: "0–5 min", value: 35 }, { range: "5–10 min", value: 28 },
  { range: "10–15 min", value: 20 }, { range: "15–20 min", value: 12 },
  { range: "20+ min", value: 5 },
];

const topDoctors = [
  { name: "Dr. Anika Sharma", patients: 248, rating: 4.9, efficiency: 96 },
  { name: "Dr. Rajesh Kumar", patients: 231, rating: 4.8, efficiency: 94 },
  { name: "Dr. Priya Sharma", patients: 215, rating: 4.9, efficiency: 92 },
  { name: "Dr. Vikram Singh", patients: 198, rating: 4.6, efficiency: 89 },
  { name: "Dr. Kavita Nair", patients: 187, rating: 4.8, efficiency: 91 },
];

const peakHours = [
  { hour: "9:00 AM", load: 85 }, { hour: "10:00 AM", load: 95 },
  { hour: "11:00 AM", load: 92 }, { hour: "2:00 PM", load: 78 },
  { hour: "3:00 PM", load: 88 },
];

const systemStats = [
  { label: "API Uptime", value: "99.97%", status: "healthy" },
  { label: "Avg Response", value: "142ms", status: "healthy" },
  { label: "Active Sessions", value: "1,247", status: "healthy" },
  { label: "Error Rate", value: "0.03%", status: "healthy" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("This Week");
  const maxTrend = Math.max(...queueTrends.map((d) => d.value));
  const maxWait = Math.max(...waitTimeData.map((d) => d.value));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Analytics</h1>
          <p className="text-sm text-text-secondary">Insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          {periods.map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${period === p ? "bg-primary text-white shadow-sm" : "bg-white border border-border-light text-text-secondary hover:bg-bg-alt"}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="rounded-2xl border border-border-light bg-white p-5 hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-0.5">
            <p className="text-xs font-medium text-text-muted mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-text-primary">{kpi.value}</p>
            <p className={`mt-2 text-[11px] font-semibold ${kpi.positive ? "text-accent-green" : "text-accent-red"}`}>
              {kpi.change} vs last period
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Queue Trends */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="text-base font-semibold text-text-primary mb-5">Queue Traffic by Hour</h3>
          <div className="flex items-end justify-between gap-1.5" style={{ height: 160 }}>
            {queueTrends.map((d, i) => (
              <div key={d.hour} className="flex flex-1 flex-col items-center gap-2">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(d.value / maxTrend) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.05 }} className={`w-full rounded-md ${d.value === maxTrend ? "bg-primary" : "bg-primary-100 hover:bg-primary-200"} transition-colors`} style={{ minHeight: 4 }} />
                <span className="text-[8px] font-medium text-text-muted">{d.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wait Time Distribution */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="text-base font-semibold text-text-primary mb-5">Wait Time Distribution</h3>
          <div className="space-y-4">
            {waitTimeData.map((d, i) => (
              <div key={d.range}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-text-secondary">{d.range}</span>
                  <span className="font-semibold text-text-primary">{d.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(d.value / maxWait) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.08 }} className={`h-full rounded-full ${i === 0 ? "bg-accent-green" : i < 3 ? "bg-primary" : "bg-accent-red"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        {/* Top Doctors */}
        <div className="lg:col-span-2 rounded-2xl border border-border-light bg-white p-6">
          <h3 className="text-base font-semibold text-text-primary mb-5">Top Performing Doctors</h3>
          <div className="space-y-3">
            {topDoctors.map((doc, i) => (
              <div key={doc.name} className="flex items-center gap-4 rounded-xl border border-border-light px-4 py-3 hover:bg-bg-alt transition-colors">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                  <p className="text-[11px] text-text-muted">{doc.patients} patients · {doc.rating} ★</p>
                </div>
                <div className="flex items-center gap-2 w-28">
                  <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${doc.efficiency}%` }} transition={{ duration: 0.8, delay: i * 0.08 }} className="h-full rounded-full bg-accent-green" />
                  </div>
                  <span className="text-[11px] font-semibold text-accent-green">{doc.efficiency}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours + System */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border-light bg-white p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Peak Hours</h3>
            <div className="space-y-3">
              {peakHours.map((h) => (
                <div key={h.hour} className="flex items-center gap-3">
                  <span className="text-xs text-text-muted w-16">{h.hour}</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${h.load >= 90 ? "bg-accent-red" : h.load >= 80 ? "bg-amber-500" : "bg-accent-green"}`} style={{ width: `${h.load}%` }} />
                  </div>
                  <span className={`text-[11px] font-semibold ${h.load >= 90 ? "text-accent-red" : "text-text-muted"}`}>{h.load}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border-light bg-white p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">System Health</h3>
            <div className="space-y-3">
              {systemStats.map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-text-primary">{s.value}</span>
                    <span className="h-2 w-2 rounded-full bg-accent-green" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
