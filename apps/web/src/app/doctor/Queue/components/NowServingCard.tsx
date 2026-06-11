import { motion } from "framer-motion";
import type { QueueEntry } from "@/types/queue.types";
import { getPatientName, formatTime } from "@/types/queue.types";

interface NowServingCardProps {
  currentPatient: QueueEntry | undefined;
  onMarkDone: () => void;
  onSkip: () => void;
  actionLoading: boolean;
}

export default function NowServingCard({ currentPatient, onMarkDone, onSkip, actionLoading }: NowServingCardProps) {
  return (
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
              onClick={onMarkDone}
              disabled={actionLoading}
              className="rounded-xl bg-accent-green px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-accent-green/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              id="mark-done-btn"
            >
              Mark as Done
            </button>
            <button
              onClick={onSkip}
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
  );
}
