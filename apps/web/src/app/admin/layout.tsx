"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { FullPageSpinner } from "@/components/ui/LoadingSkeleton";
import { adminSidebarLinks } from "@/config/sidebarLinks";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth("ADMIN");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <FullPageSpinner />;

  return (
    <div className="flex min-h-screen bg-bg-alt">
      <Sidebar
        links={adminSidebarLinks}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        badge={
          <div className="mx-3 mt-4 mb-2 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary">
                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-primary">Admin Panel</p>
                <p className="text-[9px] text-primary/60">System Management</p>
              </div>
            </div>
          </div>
        }
      />

      <div className="flex flex-1 flex-col">
        <TopBar
          onMenuOpen={() => setSidebarOpen(true)}
          leftContent={
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-border-light bg-bg-alt px-4 py-2 transition-colors focus-within:border-primary/30 focus-within:bg-white">
              <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Search anything..."
                className="w-48 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted lg:w-64"
                id="admin-search"
              />
            </div>
          }
          rightContent={
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-md cursor-pointer" id="quick-actions-btn">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                Quick Actions
              </button>
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-bg-alt transition-colors cursor-pointer" id="admin-notifications-btn">
                <svg className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-red text-[8px] font-bold text-white">5</span>
              </button>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-sm shadow-md shadow-primary/20">A</div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-text-primary">Admin</p>
                  <p className="text-[11px] text-text-muted">Super Admin</p>
                </div>
              </div>
            </div>
          }
        />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
