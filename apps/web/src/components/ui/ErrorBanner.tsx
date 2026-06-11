"use client";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="mb-4 rounded-xl bg-accent-red-light border border-accent-red/20 px-4 py-3 text-xs text-accent-red">
      {message}
      <button onClick={onDismiss} className="ml-2 font-semibold underline cursor-pointer">
        Dismiss
      </button>
    </div>
  );
}
