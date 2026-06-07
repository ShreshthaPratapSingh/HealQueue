"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "http://localhost:5000/api/queue";

interface PatientInfo {
  _id: string;
  firstName: string;
  lastName: string;
}

interface QueueEntry {
  _id: string;
  queueId: string;
  patientId: PatientInfo;
  tokenNumber: number;
  type: "ONLINE" | "WALK_IN";
  status: "WAITING" | "SERVING" | "COMPLETED" | "SKIPPED";
  joinedAt: string;
  estimatedWait: number;
}

interface QueueInfo {
  _id: string;
  doctorId: string;
  clinicId: string;
  currentToken: number;
  status: "Open" | "Closed";
  estimatedWaitPerPatient: number;
  date: string;
}

// Helper: format time
function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Helper: get patient display name
function getPatientName(entry: QueueEntry): string {
  if (entry.patientId && typeof entry.patientId === "object") {
    return `${entry.patientId.firstName} ${entry.patientId.lastName}`;
  }
  return "Unknown Patient";
}

// Helper: get patient initials
function getInitials(entry: QueueEntry): string {
  if (entry.patientId && typeof entry.patientId === "object") {
    return `${entry.patientId.firstName[0] || ""}${entry.patientId.lastName[0] || ""}`;
  }
  return "?";
}

// Map backend status to display status
type DisplayStatus = "Serving" | "Waiting" | "Done" | "Skipped";
function mapStatus(status: QueueEntry["status"]): DisplayStatus {
  switch (status) {
    case "SERVING": return "Serving";
    case "WAITING": return "Waiting";
    case "COMPLETED": return "Done";
    case "SKIPPED": return "Skipped";
  }
}

function StatusBadge({ status }: { status: DisplayStatus }) {
  const config: Record<string, string> = {
    Serving: "bg-primary-50 text-primary border-primary/20",
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
  const [queueInfo, setQueueInfo] = useState<QueueInfo | null>(null);
  const [entries, setEntries] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Find today's open queue for this doctor
  const findMyQueue = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/doctors/available`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch queues");
      const data = await res.json();

      // Find queue belonging to the logged-in doctor
      // The /doctors/available returns all open queues, we need to find ours
      // For now, if there's a queue, use the first one (doctor should only have one open)
      if (data.doctors && data.doctors.length > 0) {
        // We'll fetch our specific queue by checking each
        for (const item of data.doctors) {
          try {
            const qRes = await fetch(`${API_BASE}/${item.queue._id}`, {
              credentials: "include",
            });
            if (qRes.ok) {
              const qData = await qRes.json();
              setQueueInfo(qData.queue);
              return qData.queue._id;
            }
          } catch {
            continue;
          }
        }
      }
      return null;
    } catch (err: any) {
      return null;
    }
  }, []);

  // Fetch queue entries
  const fetchEntries = useCallback(async (queueId: string) => {
    try {
      const res = await fetch(`${API_BASE}/${queueId}/entries`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch entries");
      const data = await res.json();
      setEntries(data.entries || []);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const queueId = await findMyQueue();
      if (queueId) {
        await fetchEntries(queueId);
      }
      setLoading(false);
    };
    init();
  }, [findMyQueue, fetchEntries]);

  // Refresh entries periodically (every 10 seconds)
  useEffect(() => {
    if (!queueInfo?._id) return;
    const interval = setInterval(() => {
      fetchEntries(queueInfo._id);
    }, 10000);
    return () => clearInterval(interval);
  }, [queueInfo, fetchEntries]);

  // Create queue
  const handleCreateQueue = async () => {
    setCreating(true);
    try {
      const res = await fetch(`${API_BASE}/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create queue");
      }
      const data = await res.json();
      setQueueInfo(data.queue);
      setEntries([]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  // Next patient (Mark Done + advance)
  const handleNextPatient = async () => {
    if (!queueInfo) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${queueInfo._id}/next`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to advance queue");
      const data = await res.json();
      setQueueInfo((prev) => prev ? { ...prev, currentToken: data.currentToken } : prev);
      await fetchEntries(queueInfo._id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Skip patient
  const handleSkip = async () => {
    if (!queueInfo) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${queueInfo._id}/skip`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to skip patient");
      const data = await res.json();
      setQueueInfo((prev) => prev ? { ...prev, currentToken: data.currentToken } : prev);
      await fetchEntries(queueInfo._id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Close queue
  const handleCloseQueue = async () => {
    if (!queueInfo) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${queueInfo._id}/close`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to close queue");
      setQueueInfo((prev) => prev ? { ...prev, status: "Closed" } : prev);
      await fetchEntries(queueInfo._id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Derived state
  const currentPatient = entries.find((e) => e.status === "SERVING");
  const nextWaiting = entries.find((e) => e.status === "WAITING");
  const waitingCount = entries.filter((e) => e.status === "WAITING").length;
  const doneCount = entries.filter((e) => e.status === "COMPLETED").length;

  // Loading state
  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="h-7 w-56 rounded-lg bg-bg-alt animate-pulse mb-2" />
        <div className="h-4 w-80 rounded-lg bg-bg-alt animate-pulse" />
        <div className="rounded-2xl border border-border-light bg-white p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-bg-alt animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 rounded bg-bg-alt animate-pulse" />
                <div className="h-3 w-24 rounded bg-bg-alt animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // No queue yet — show create button
  if (!queueInfo) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-8">
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Queue Management</h1>
          <p className="text-sm text-text-secondary">Start your queue for today to begin seeing patients</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border-light bg-white py-20 px-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-50 mb-6">
            <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-text-primary mb-2">No Queue Active</h2>
          <p className="text-sm text-text-secondary mb-6 text-center max-w-sm">
            You don&apos;t have an active queue for today. Start one to allow patients to join.
          </p>
          {error && <p className="text-xs text-accent-red mb-4">{error}</p>}
          <button
            onClick={handleCreateQueue}
            disabled={creating}
            className="rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            id="start-queue-btn"
          >
            {creating ? "Creating..." : "Start Today's Queue"}
          </button>
        </div>
      </motion.div>
    );
  }

  // Queue is closed
  if (queueInfo.status === "Closed") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-8">
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Queue Management</h1>
          <p className="text-sm text-text-secondary">Today&apos;s queue has been closed</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border-light bg-white py-20 px-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-green-light mb-6">
            <svg className="h-10 w-10 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-text-primary mb-2">Queue Closed</h2>
          <p className="text-sm text-text-secondary mb-2 text-center">
            You saw <span className="font-semibold text-text-primary">{doneCount}</span> patients today.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-text-primary">Queue Management</h1>
          <p className="text-sm text-text-secondary">Manage your patient queue in real-time</p>
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
            onClick={handleCloseQueue}
            disabled={actionLoading}
            className="rounded-xl border border-accent-red/30 bg-accent-red-light px-4 py-2 text-xs font-semibold text-accent-red transition-all hover:bg-accent-red hover:text-white active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            id="close-queue-btn"
          >
            Close Queue
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-accent-red-light border border-accent-red/20 px-4 py-3 text-xs text-accent-red">
          {error}
          <button onClick={() => setError(null)} className="ml-2 font-semibold underline cursor-pointer">Dismiss</button>
        </div>
      )}

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
                #{currentPatient.tokenNumber}
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{getPatientName(currentPatient)}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] text-text-muted">{formatTime(currentPatient.joinedAt)}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-text-secondary border border-border-light">
                    {currentPatient.type === "ONLINE" ? "Online" : "Walk-in"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNextPatient}
                disabled={actionLoading}
                className="rounded-xl bg-accent-green px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-accent-green/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                id="mark-done-btn"
              >
                Mark as Done
              </button>
              <button
                onClick={handleSkip}
                disabled={actionLoading}
                className="rounded-xl border border-border px-5 py-2.5 text-xs font-semibold text-text-secondary transition-all duration-200 hover:bg-bg-alt hover:text-text-primary disabled:opacity-50 cursor-pointer"
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
          {nextWaiting ? (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-sm font-bold text-amber-600">
                #{nextWaiting.tokenNumber}
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted">Up Next</p>
                <p className="text-sm font-semibold text-text-primary">{getPatientName(nextWaiting)}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-text-muted">No patients in queue.</p>
          )}
        </div>
        <button
          onClick={handleNextPatient}
          disabled={!currentPatient && !nextWaiting || actionLoading}
          className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          id="next-patient-btn"
        >
          {actionLoading ? "Processing..." : "Next Patient →"}
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
          <div className="col-span-2">Est. Wait</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-sm text-text-muted">No patients in the queue yet</p>
            <p className="text-xs text-text-muted mt-1">Patients will appear here when they join</p>
          </div>
        ) : (
          <AnimatePresence>
            {entries.map((entry) => {
              const displayStatus = mapStatus(entry.status);
              return (
                <motion.div
                  key={entry._id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center border-b border-border-light px-6 py-4 transition-colors hover:bg-bg-alt ${
                    entry.status === "SERVING" ? "bg-primary-50/30" : ""
                  } ${entry.status === "COMPLETED" || entry.status === "SKIPPED" ? "opacity-50" : ""}`}
                >
                  <div className="col-span-1 text-sm font-bold text-text-primary">
                    <span className="sm:hidden text-text-muted font-normal text-xs">Queue </span>#{entry.tokenNumber}
                  </div>
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary">
                      {getInitials(entry)}
                    </div>
                    <span className="text-sm font-medium text-text-primary">{getPatientName(entry)}</span>
                  </div>
                  <div className="col-span-2 text-xs text-text-muted">
                    <span className="sm:hidden text-text-muted">Time: </span>{formatTime(entry.joinedAt)}
                  </div>
                  <div className="col-span-2 text-xs text-text-secondary">
                    <span className="sm:hidden text-text-muted">Wait: </span>{entry.estimatedWait} min
                  </div>
                  <div className="col-span-2 text-xs">
                    <span className="rounded-full bg-bg-alt px-2.5 py-1 text-[10px] font-semibold text-text-secondary">
                      {entry.type === "ONLINE" ? "Online" : "Walk-in"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <StatusBadge status={displayStatus} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {/* Footer */}
        <div className="px-6 py-4">
          <p className="text-xs text-text-muted">
            Showing {entries.length} patients · Queue refreshes every 10 seconds
          </p>
        </div>
      </div>
    </motion.div>
  );
}
