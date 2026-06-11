"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export interface SidebarLink {
  label: string;
  href: string;
  icon: ReactNode;
}

interface SidebarProps {
  links: SidebarLink[];
  isOpen: boolean;
  onClose: () => void;
  /** Optional badge section below the branding (e.g., "Admin Panel") */
  badge?: ReactNode;
}

export default function Sidebar({ links, isOpen, onClose, badge }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border-light bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Branding */}
        <div className="flex h-16 items-center gap-2.5 border-b border-border-light px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-dark shadow-md shadow-primary/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="white" />
              </svg>
            </div>
            <span className="text-lg font-bold text-text-primary">
              Heal<span className="text-primary">Queue</span>
            </span>
          </Link>
        </div>

        {/* Optional badge */}
        {badge}

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-50 text-primary shadow-sm"
                    : "text-text-secondary hover:bg-bg-alt hover:text-text-primary"
                }`}
              >
                <span className={isActive ? "text-primary" : "text-text-muted"}>
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-border-light p-4">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-text-secondary transition-all duration-200 hover:border-accent-red/30 hover:text-accent-red hover:bg-accent-red-light"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Logout
          </Link>
        </div>
      </aside>
    </>
  );
}
