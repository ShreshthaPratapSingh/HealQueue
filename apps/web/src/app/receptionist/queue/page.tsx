"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QueuePatient {
  id: number;
  name: string;
  queue: number;
  type: "Walk-in" | "Online";
  status: "Serving" | "Next" | "Waiting" | "Done" | "Removed";
  time: string;
}

const initialQueue: QueuePatient[] = [
  { id: 1, name: "Sneha Iyer", queue: 1, type: "Online", status: "Done", time: "9:50 AM" },
  { id: 2, name: "Amit Desai", queue: 2, type: "Walk-in", status: "Done", time: "10:05 AM" },
  { id: 3, name: "Rahul Verma", queue: 3, type: "Walk-in", status: "Done", time: "10:20 AM" },
  { id: 4, name: "Priya Kapoor", queue: 4, type: "Online", status: "Serving", time: "10:35 AM" },
  { id: 5, name: "Karan Malhotra", queue: 5, type: "Walk-in", status: "Next", time: "10:50 AM" },
  { id: 6, name: "Deepa Joshi", queue: 6, type: "Online", status: "Waiting", time: "11:00 AM" },
  { id: 7, name: "Arjun Nair", queue: 7, type: "Walk-in", status: "Waiting", time: "11:10 AM" },
  { id: 8, name: "Meera Reddy", queue: 8, type: "Online", status: "Waiting", time: "11:20 AM" },
  { id: 9, name: "Rohit Sharma", queue: 9, type: "Walk-in", status: "Waiting", time: "11:30 AM" },
];

function StatusBadge({ status }: { status: QueuePatient["status"] }) {
  const config: Record<string, string> = {
    Serving: "bg-primary-50 text-primary border-primary/20",
    Next: "bg-amber-50 text-amber-600 border-amber-200",
    Waiting: "bg-gray-50 text-text-secondary border-border-light",
    Done: "bg-accent-green-light text-accent-green border-accent-green/20",
    Removed: "bg-accent-red-light text-accent-red border-accent-red/20",
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
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [walkinName, setWalkinName] = useState("");

  const currentPatient = queue.find((p) => p.status === "Serving");
  const waitingCount = queue.filter((p) => p.status === "Waiting" || p.status === "Next").length;
  const doneCount = queue.filter((p) => p.status === "Done").length;
  const activeQueue = queue.filter((p) => p.status !== "Done" && p.status !== "Removed");

  const handleAddWalkin = () => {
    const maxQueue = Math.max(...queue.map((p) => p.queue), 0);
    const name = walkinName.trim() || `Walk-in #${maxQueue + 1}`;
    const newPatient: QueuePatient = {
      id: Date.now(),
      name,
      queue: maxQueue + 1,
      type: "Walk-in",
      status: "Waiting",
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
    };
    setQueue((prev) => [...prev, newPatient]);
    setWalkinName("");
    setShowWalkinModal(false);
  };

  const handleRemove = (id: number) => {
    setQueue((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Removed" as const } : p)));
  };

  const handleMoveUp = (id: number) => {
    setQueue((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx <= 0) return prev;
      const prevIdx = idx - 1;
      // Only swap within waiting patients
      if (prev[idx]!.status !== "Waiting" && prev[idx]!.status !== "Next") return prev;
      if (prev[prevIdx]!.status !== "Waiting" && prev[prevIdx]!.status !== "Next") return prev;
      const updated = [...prev];
      const tempQueue = updated[idx]!.queue;
      updated[idx]!.queue = updated[prevIdx]!.queue;
      updated[prevIdx]!.queue = tempQueue;
      [updated[idx], updated[prevIdx]] = [updated[prevIdx]!, updated[idx]!];
      return updated;
    });
  };

  const handleMoveDown = (id: number) => {
    setQueue((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const nextIdx = idx + 1;
      if (prev[idx]!.status !== "Waiting" && prev[idx]!.status !== "Next") return prev;
      if (prev[nextIdx]!.status !== "Waiting" && prev[nextIdx]!.status !== "Next") return prev;
      const updated = [...prev];
      const tempQueue = updated[idx]!.queue;
      updated[idx]!.queue = updated[nextIdx]!.queue;
      updated[nextIdx]!.queue = tempQueue;
      [updated[idx], updated[nextIdx]] = [updated[nextIdx]!, updated[idx]!];
      return updated;
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Queue Management</h1>
          <p className="text-sm text-text-secondary">Manage the patient queue in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> {waitingCount} waiting
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-green" /> {doneCount} done
            </span>
          </div>
          <button
            onClick={() => setShowWalkinModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            id="add-walkin-btn"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Walk-in
          </button>
        </div>
      </div>

      {/* Now Serving */}
      <div className="mb-6 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary-50 to-white p-6 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Now Serving</span>
        </div>
        {currentPatient ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-lg shadow-primary/25">
                #{currentPatient.queue}
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{currentPatient.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] text-text-muted">{currentPatient.time}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-text-secondary border border-border-light">
                    {currentPatient.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted py-2">No patient currently being served.</p>
        )}
      </div>

      {/* Queue List */}
      <div className="rounded-2xl border border-border-light bg-white">
        <div className="border-b border-border-light px-6 py-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">Patient Queue ({activeQueue.length})</h3>
        </div>

        {/* Table header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-border-light px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Patient</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <AnimatePresence>
          {queue.filter((p) => p.status !== "Removed").map((patient) => (
            <motion.div
              key={patient.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center border-b border-border-light px-6 py-4 transition-colors hover:bg-bg-alt ${
                patient.status === "Serving" ? "bg-primary-50/30" : ""
              } ${patient.status === "Done" ? "opacity-50" : ""}`}
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
              <div className="col-span-2">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  patient.type === "Walk-in" ? "bg-amber-50 text-amber-600" : "bg-primary-50 text-primary"
                }`}>
                  {patient.type}
                </span>
              </div>
              <div className="col-span-2">
                <StatusBadge status={patient.status} />
              </div>
              <div className="col-span-2 flex items-center justify-end gap-1">
                {(patient.status === "Waiting" || patient.status === "Next") && (
                  <>
                    <button
                      onClick={() => handleMoveUp(patient.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-bg-alt transition-colors cursor-pointer"
                      title="Move up"
                    >
                      <svg className="h-3.5 w-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleMoveDown(patient.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-bg-alt transition-colors cursor-pointer"
                      title="Move down"
                    >
                      <svg className="h-3.5 w-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleRemove(patient.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-accent-red-light transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <svg className="h-3.5 w-3.5 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Walk-in Modal */}
      <AnimatePresence>
        {showWalkinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowWalkinModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm rounded-2xl border border-border-light bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">Add Walk-in Patient</h3>
                <button onClick={() => setShowWalkinModal(false)} className="rounded-lg p-1.5 hover:bg-bg-alt transition-colors cursor-pointer">
                  <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-secondary">Patient Name (optional)</label>
                  <input
                    type="text"
                    value={walkinName}
                    onChange={(e) => setWalkinName(e.target.value)}
                    placeholder="Enter patient name"
                    className="w-full rounded-xl border border-border bg-bg-alt py-2.5 px-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                    id="walkin-name-input"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleAddWalkin()}
                  />
                </div>
                <p className="text-[11px] text-text-muted">
                  Queue number <span className="font-semibold text-text-secondary">#{Math.max(...queue.map((p) => p.queue), 0) + 1}</span> will be assigned automatically.
                </p>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setShowWalkinModal(false)}
                    className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-text-secondary transition-all hover:bg-bg-alt cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddWalkin}
                    className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark active:scale-[0.98] cursor-pointer"
                    id="confirm-walkin-btn"
                  >
                    Add to Queue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
