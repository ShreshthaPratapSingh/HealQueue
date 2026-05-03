"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QueuePatient {
  id: number;
  name: string;
  queue: number;
  type: "Walk-in" | "Online";
  status: "Serving" | "Next" | "Waiting" | "Done" | "Skipped";
  time: string;
  reason: string;
}

const initialQueue: QueuePatient[] = [
  { id: 1, name: "Sneha Iyer", queue: 1, type: "Online", status: "Done", time: "9:50 AM", reason: "Fever & cold" },
  { id: 2, name: "Amit Desai", queue: 2, type: "Walk-in", status: "Serving", time: "10:15 AM", reason: "Follow-up checkup" },
  { id: 3, name: "Rahul Verma", queue: 3, type: "Walk-in", status: "Next", time: "10:30 AM", reason: "Back pain" },
  { id: 4, name: "Priya Kapoor", queue: 4, type: "Online", status: "Waiting", time: "10:45 AM", reason: "Skin rash" },
  { id: 5, name: "Karan Malhotra", queue: 5, type: "Walk-in", status: "Waiting", time: "11:00 AM", reason: "Headache" },
  { id: 6, name: "Deepa Joshi", queue: 6, type: "Online", status: "Waiting", time: "11:15 AM", reason: "Annual checkup" },
  { id: 7, name: "Arjun Nair", queue: 7, type: "Walk-in", status: "Waiting", time: "11:30 AM", reason: "Joint pain" },
];

function StatusBadge({ status }: { status: QueuePatient["status"] }) {
  const config: Record<string, string> = {
    Serving: "bg-primary-50 text-primary border-primary/20",
    Next: "bg-amber-50 text-amber-600 border-amber-200",
    Waiting: "bg-gray-50 text-text-secondary border-border-light",
    Done: "bg-accent-green-light text-accent-green border-accent-green/20",
    Skipped: "bg-accent-red-light text-accent-red border-accent-red/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${config[status]}`}>
      {status === "Serving" && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
      {status}
    </span>
  );
}

export default function QueuePage() {
  const [queue, setQueue] = useState(initialQueue);

  const currentPatient = queue.find((p) => p.status === "Serving");
  const nextPatient = queue.find((p) => p.status === "Next");
  const waitingCount = queue.filter((p) => p.status === "Waiting" || p.status === "Next").length;
  const doneCount = queue.filter((p) => p.status === "Done").length;

  const handleNextPatient = () => {
    setQueue((prev) => {
      const updated = [...prev];
      const servingIdx = updated.findIndex((p) => p.status === "Serving");
      if (servingIdx !== -1) updated[servingIdx]!.status = "Done";
      const nextIdx = updated.findIndex((p) => p.status === "Next");
      if (nextIdx !== -1) {
        updated[nextIdx]!.status = "Serving";
        const firstWaiting = updated.findIndex((p) => p.status === "Waiting");
        if (firstWaiting !== -1) updated[firstWaiting]!.status = "Next";
      }
      return updated;
    });
  };

  const handleSkip = () => {
    setQueue((prev) => {
      const updated = [...prev];
      const servingIdx = updated.findIndex((p) => p.status === "Serving");
      if (servingIdx !== -1) {
        updated[servingIdx]!.status = "Skipped";
        const nextIdx = updated.findIndex((p) => p.status === "Next");
        if (nextIdx !== -1) {
          updated[nextIdx]!.status = "Serving";
          const firstWaiting = updated.findIndex((p) => p.status === "Waiting");
          if (firstWaiting !== -1) updated[firstWaiting]!.status = "Next";
        }
      }
      return updated;
    });
  };

  const handleMarkDone = () => {
    setQueue((prev) => {
      const updated = [...prev];
      const servingIdx = updated.findIndex((p) => p.status === "Serving");
      if (servingIdx !== -1) updated[servingIdx]!.status = "Done";
      const nextIdx = updated.findIndex((p) => p.status === "Next");
      if (nextIdx !== -1) {
        updated[nextIdx]!.status = "Serving";
        const firstWaiting = updated.findIndex((p) => p.status === "Waiting");
        if (firstWaiting !== -1) updated[firstWaiting]!.status = "Next";
      }
      return updated;
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Queue Management</h1>
          <p className="text-sm text-text-secondary">Manage your patient queue in real-time</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> {waitingCount} waiting
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent-green" /> {doneCount} done
          </span>
        </div>
      </div>

      {/* Now Serving Card */}
      <div className="mb-6 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary-50 to-white p-6 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Now Serving</span>
        </div>
        {currentPatient ? (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-lg shadow-primary/25">
                #{currentPatient.queue}
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{currentPatient.name}</p>
                <p className="text-sm text-text-secondary">{currentPatient.reason}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] text-text-muted">{currentPatient.time}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-text-secondary border border-border-light">
                    {currentPatient.type}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkDone}
                className="rounded-xl bg-accent-green px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-accent-green/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98] cursor-pointer"
                id="mark-done-btn"
              >
                Mark as Done
              </button>
              <button
                onClick={handleSkip}
                className="rounded-xl border border-border px-5 py-2.5 text-xs font-semibold text-text-secondary transition-all duration-200 hover:bg-bg-alt hover:text-text-primary cursor-pointer"
                id="skip-btn"
              >
                Skip
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted py-2">No patient currently being served.</p>
        )}
      </div>

      {/* Next Patient + Action */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border-light bg-white p-5">
        <div className="flex items-center gap-3">
          {nextPatient ? (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-sm font-bold text-amber-600">
                #{nextPatient.queue}
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted">Up Next</p>
                <p className="text-sm font-semibold text-text-primary">{nextPatient.name}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-text-muted">No patients in queue.</p>
          )}
        </div>
        <button
          onClick={handleNextPatient}
          disabled={!currentPatient}
          className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          id="next-patient-btn"
        >
          Next Patient →
        </button>
      </div>

      {/* Queue List */}
      <div className="rounded-2xl border border-border-light bg-white">
        <div className="border-b border-border-light px-6 py-4">
          <h3 className="text-base font-semibold text-text-primary">Patient Queue</h3>
        </div>

        {/* Table header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-border-light px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Patient</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Reason</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
        </div>

        {/* Queue items */}
        <AnimatePresence>
          {queue.map((patient) => (
            <motion.div
              key={patient.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center border-b border-border-light px-6 py-4 transition-colors hover:bg-bg-alt ${
                patient.status === "Serving" ? "bg-primary-50/30" : ""
              } ${patient.status === "Done" || patient.status === "Skipped" ? "opacity-50" : ""}`}
            >
              <div className="col-span-1 text-sm font-bold text-text-primary">
                <span className="sm:hidden text-text-muted font-normal text-xs">Queue </span>#{patient.queue}
              </div>
              <div className="col-span-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary">
                  {patient.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="text-sm font-medium text-text-primary">{patient.name}</span>
              </div>
              <div className="col-span-2 text-xs text-text-muted">
                <span className="sm:hidden text-text-muted">Time: </span>{patient.time}
              </div>
              <div className="col-span-2 text-xs text-text-secondary truncate">
                <span className="sm:hidden text-text-muted">Reason: </span>{patient.reason}
              </div>
              <div className="col-span-2 text-xs">
                <span className="rounded-full bg-bg-alt px-2.5 py-1 text-[10px] font-semibold text-text-secondary">
                  {patient.type}
                </span>
              </div>
              <div className="col-span-2">
                <StatusBadge status={patient.status} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
