"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ErrorBanner from "@/components/ui/ErrorBanner";
import { PageSkeleton } from "@/components/ui/LoadingSkeleton";
import type { QueueEntry, QueueInfo } from "@/types/queue.types";
import NowServingCard from "./components/NowServingCard";
import NextPatientBar from "./components/NextPatientBar";
import QueueList from "./components/QueueList";
import NoQueueState from "./components/NoQueueState";

const API_BASE = "http://localhost:5000/api/queue";

export default function QueuePage() {
  const [queueInfo, setQueueInfo] = useState<QueueInfo | null>(null);
  const [entries, setEntries] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // ─── Data Fetching ─────────────────────────────────────────────────
  const findMyQueue = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/doctors/available`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch queues");
      const data = await res.json();

      if (data.doctors && data.doctors.length > 0) {
        for (const item of data.doctors) {
          try {
            const qRes = await fetch(`${API_BASE}/${item.queue._id}`, { credentials: "include" });
            if (qRes.ok) {
              const qData = await qRes.json();
              setQueueInfo(qData.queue);
              return qData.queue._id;
            }
          } catch { continue; }
        }
      }
      return null;
    } catch { return null; }
  }, []);

  const fetchEntries = useCallback(async (queueId: string) => {
    try {
      const res = await fetch(`${API_BASE}/${queueId}/entries`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch entries");
      const data = await res.json();
      setEntries(data.entries || []);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const queueId = await findMyQueue();
      if (queueId) await fetchEntries(queueId);
      setLoading(false);
    };
    init();
  }, [findMyQueue, fetchEntries]);

  useEffect(() => {
    if (!queueInfo?._id) return;
    const interval = setInterval(() => fetchEntries(queueInfo._id), 10000);
    return () => clearInterval(interval);
  }, [queueInfo, fetchEntries]);

  // ─── Actions ───────────────────────────────────────────────────────
  const handleCreateQueue = async () => {
    setCreating(true);
    try {
      const res = await fetch(`${API_BASE}/create`, {
        method: "POST", credentials: "include",
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

  const handleNextPatient = async () => {
    if (!queueInfo) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${queueInfo._id}/next`, { method: "PATCH", credentials: "include" });
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

  const handleSkip = async () => {
    if (!queueInfo) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${queueInfo._id}/skip`, { method: "PATCH", credentials: "include" });
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

  const handleCloseQueue = async () => {
    if (!queueInfo) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${queueInfo._id}/close`, { method: "PATCH", credentials: "include" });
      if (!res.ok) throw new Error("Failed to close queue");
      setQueueInfo((prev) => prev ? { ...prev, status: "Closed" } : prev);
      await fetchEntries(queueInfo._id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Derived State ─────────────────────────────────────────────────
  const currentPatient = entries.find((e) => e.status === "SERVING");
  const nextWaiting = entries.find((e) => e.status === "WAITING");
  const waitingCount = entries.filter((e) => e.status === "WAITING").length;
  const doneCount = entries.filter((e) => e.status === "COMPLETED").length;

  // ─── Render ────────────────────────────────────────────────────────
  if (loading) return <PageSkeleton />;

  if (!queueInfo) {
    return <NoQueueState error={error} creating={creating} onCreate={handleCreateQueue} />;
  }

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
      {/* Header */}
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

      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      <NowServingCard
        currentPatient={currentPatient}
        onMarkDone={handleNextPatient}
        onSkip={handleSkip}
        actionLoading={actionLoading}
      />

      <NextPatientBar
        nextWaiting={nextWaiting}
        hasCurrentPatient={!!currentPatient}
        onNext={handleNextPatient}
        actionLoading={actionLoading}
      />

      <QueueList entries={entries} />
    </motion.div>
  );
}
