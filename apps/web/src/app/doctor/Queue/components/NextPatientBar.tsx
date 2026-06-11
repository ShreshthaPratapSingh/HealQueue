import type { QueueEntry } from "@/types/queue.types";
import { getPatientName } from "@/types/queue.types";

interface NextPatientBarProps {
  nextWaiting: QueueEntry | undefined;
  hasCurrentPatient: boolean;
  onNext: () => void;
  actionLoading: boolean;
}

export default function NextPatientBar({ nextWaiting, hasCurrentPatient, onNext, actionLoading }: NextPatientBarProps) {
  return (
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
        onClick={onNext}
        disabled={!hasCurrentPatient && !nextWaiting || actionLoading}
        className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        id="next-patient-btn"
      >
        {actionLoading ? "Processing..." : "Next Patient →"}
      </button>
    </div>
  );
}
