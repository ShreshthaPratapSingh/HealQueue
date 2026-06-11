import type { DisplayStatus } from "@/types/queue.types";

const statusStyles: Record<string, string> = {
  Serving: "bg-primary-50 text-primary border-primary/20",
  Waiting: "bg-gray-50 text-text-secondary border-border-light",
  Done: "bg-accent-green-light text-accent-green border-accent-green/20",
  Skipped: "bg-accent-red-light text-accent-red border-accent-red/20",
};

export default function StatusBadge({ status }: { status: DisplayStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusStyles[status]}`}>
      {status === "Serving" && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
      {status}
    </span>
  );
}
