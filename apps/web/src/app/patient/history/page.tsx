"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const historyByDoctor = [
  {
    doctor: "Dr. Anika Sharma",
    specialty: "General Medicine",
    visits: [
      { date: "Apr 28, 2026", diagnosis: "Seasonal flu", prescription: "Paracetamol, Cetirizine", status: "Completed" },
      { date: "Mar 15, 2026", diagnosis: "Routine checkup", prescription: "Vitamin D supplements", status: "Completed" },
      { date: "Jan 10, 2026", diagnosis: "Throat infection", prescription: "Azithromycin, Cough syrup", status: "Completed" },
    ],
  },
  {
    doctor: "Dr. Vikram Singh",
    specialty: "Cardiology",
    visits: [
      { date: "Apr 5, 2026", diagnosis: "Heart rate monitoring", prescription: "Beta blockers (continued)", status: "Follow-up" },
      { date: "Feb 20, 2026", diagnosis: "ECG & stress test", prescription: "Lifestyle modifications", status: "Completed" },
    ],
  },
  {
    doctor: "Dr. Sneha Reddy",
    specialty: "Dermatology",
    visits: [
      { date: "Mar 28, 2026", diagnosis: "Eczema treatment", prescription: "Topical corticosteroids", status: "Ongoing" },
    ],
  },
];

export default function HistoryPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="mb-1 text-2xl font-bold text-text-primary">History</h1>
      <p className="mb-8 text-sm text-text-secondary">Your past treatments and visits, arranged by doctor</p>

      <div className="space-y-8">
        {historyByDoctor.map((group, gi) => (
          <motion.div key={group.doctor} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: gi * 0.1 }} className="rounded-2xl border border-border-light bg-white overflow-hidden">
            <div className="flex items-center gap-3 border-b border-border-light bg-bg-alt/50 px-6 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary font-bold">{group.doctor.split(" ")[1]?.[0] ?? "D"}</div>
              <div>
                <p className="font-semibold text-text-primary">{group.doctor}</p>
                <p className="text-xs text-text-muted">{group.specialty}</p>
              </div>
              <span className="ml-auto rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary">{group.visits.length} visit{group.visits.length > 1 ? "s" : ""}</span>
            </div>
            <div className="divide-y divide-border-light">
              {group.visits.map((visit, vi) => (
                <div key={vi} className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:gap-6">
                  <p className="w-28 shrink-0 text-xs font-medium text-text-muted">{visit.date}</p>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-primary">{visit.diagnosis}</p>
                    <p className="text-xs text-text-muted mt-0.5">Rx: {visit.prescription}</p>
                  </div>
                  <span className={`self-start rounded-full px-2.5 py-1 text-[10px] font-semibold ${visit.status === "Completed" ? "bg-accent-green-light text-accent-green" : visit.status === "Follow-up" ? "bg-primary-100 text-primary" : "bg-yellow-50 text-yellow-600"}`}>{visit.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
