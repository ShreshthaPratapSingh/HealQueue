import { motion } from "framer-motion";

interface NoQueueStateProps {
  error: string | null;
  creating: boolean;
  onCreate: () => void;
}

export default function NoQueueState({ error, creating, onCreate }: NoQueueStateProps) {
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
          onClick={onCreate}
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
