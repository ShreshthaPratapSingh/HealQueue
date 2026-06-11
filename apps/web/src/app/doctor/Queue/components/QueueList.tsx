import { AnimatePresence, motion } from "framer-motion";
import StatusBadge from "@/components/ui/StatusBadge";
import type { QueueEntry } from "@/types/queue.types";
import { getPatientName, getPatientInitials, formatTime, mapStatus } from "@/types/queue.types";

interface QueueListProps {
  entries: QueueEntry[];
}

export default function QueueList({ entries }: QueueListProps) {
  return (
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
                    {getPatientInitials(entry)}
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

      <div className="px-6 py-4">
        <p className="text-xs text-text-muted">Showing {entries.length} patients · Queue refreshes every 10 seconds</p>
      </div>
    </div>
  );
}
