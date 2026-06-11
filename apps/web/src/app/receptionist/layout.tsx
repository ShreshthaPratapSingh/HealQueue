"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { FullPageSpinner } from "@/components/ui/LoadingSkeleton";
import { receptionistSidebarLinks } from "@/config/sidebarLinks";
import { useAuth } from "@/hooks/useAuth";

export default function ReceptionistLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth("RECEPTIONIST");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <FullPageSpinner />;

  return (
    <div className="flex min-h-screen bg-bg-alt">
      <Sidebar
        links={receptionistSidebarLinks}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col">
        <TopBar
          onMenuOpen={() => setSidebarOpen(true)}
          leftContent={
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-text-primary">Rekha Sharma</p>
                <p className="text-[11px] text-text-muted">Sharma Health Clinic</p>
              </div>
            </div>
          }
          rightContent={
            <div className="flex items-center gap-4">
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-bg-alt transition-colors cursor-pointer" id="r-notifications-btn">
                <svg className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-red" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary font-bold text-sm">R</div>
            </div>
          }
        />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
