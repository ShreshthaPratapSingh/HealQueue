"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { FullPageSpinner } from "@/components/ui/LoadingSkeleton";
import { doctorSidebarLinks } from "@/config/sidebarLinks";
import { useAuth } from "@/hooks/useAuth";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth("DOCTOR");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  if (loading) return <FullPageSpinner />;

  return (
    <div className="flex min-h-screen bg-bg-alt">
      <Sidebar
        links={doctorSidebarLinks}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-text-primary">Dr. Anika Sharma</p>
                <p className="text-[11px] text-text-muted">General Physician</p>
              </div>
            </div>
          }
          rightContent={
            <div className="flex items-center gap-4">
              {/* Status toggle */}
              <div className="flex items-center gap-2.5">
                <span className={`text-xs font-semibold ${isAvailable ? "text-accent-green" : "text-text-muted"}`}>
                  {isAvailable ? "Available" : "Not Available"}
                </span>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`relative h-6 w-11 rounded-full transition-colors duration-200 cursor-pointer ${isAvailable ? "bg-accent-green" : "bg-gray-200"}`}
                  id="status-toggle"
                >
                  <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${isAvailable ? "translate-x-5" : ""}`} />
                </button>
              </div>
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-bg-alt transition-colors cursor-pointer" id="notifications-btn">
                <svg className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-red" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary font-bold text-sm">A</div>
            </div>
          }
        />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
