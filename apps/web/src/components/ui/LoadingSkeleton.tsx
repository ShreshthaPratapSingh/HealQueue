export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border-light bg-white p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-xl bg-bg-alt animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded bg-bg-alt animate-pulse" />
          <div className="h-3 w-20 rounded bg-bg-alt animate-pulse" />
        </div>
      </div>
      <div className="h-10 w-full rounded-xl bg-bg-alt animate-pulse" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-border-light">
      <div className="h-10 w-10 rounded-xl bg-bg-alt animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-40 rounded bg-bg-alt animate-pulse" />
        <div className="h-3 w-24 rounded bg-bg-alt animate-pulse" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-7 w-56 rounded-lg bg-bg-alt animate-pulse mb-2" />
      <div className="h-4 w-80 rounded-lg bg-bg-alt animate-pulse" />
      <div className="rounded-2xl border border-border-light bg-white p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-alt">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
