"use client";

import { ReactNode } from "react";

interface TopBarProps {
  onMenuOpen: () => void;
  /** Left section content (user info, search, etc.) */
  leftContent?: ReactNode;
  /** Right section content (notifications, avatar, etc.) */
  rightContent?: ReactNode;
}

export default function TopBar({ onMenuOpen, leftContent, rightContent }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-light bg-white/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-bg-alt lg:hidden cursor-pointer"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        {leftContent}
      </div>
      {rightContent}
    </header>
  );
}
