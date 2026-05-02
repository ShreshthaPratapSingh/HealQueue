"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { label: "Doctors", href: "/patient/doctors", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg> },
  { label: "Hospitals", href: "/patient/hostpitals", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" /></svg> },
  { label: "History", href: "/patient/history", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { label: "Account", href: "/patient/account", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> },
  { label: "Settings", href: "/patient/settings", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
];

const historyByDoctor = [
  {
    doctor: "Dr. Anika Sharma",
    specialty: "General Medicine",
    visits: [
      { date: "Apr 28, 2026", diagnosis: "Seasonal flu", prescription: "Paracetamol, Cetirizine", status: "Completed" },
      { date: "Mar 15, 2026", diagnosis: "Routine checkup", prescription: "Vitamin D supplements", status: "Completed" },
      { date: "Jan 10, 2026", diagnosis: "Throat infection", prescription: "Azithromycin, Cough syrup", status: "Completed" },
    ],
  },
  {
    doctor: "Dr. Vikram Singh",
    specialty: "Cardiology",
    visits: [
      { date: "Apr 5, 2026", diagnosis: "Heart rate monitoring", prescription: "Beta blockers (continued)", status: "Follow-up" },
      { date: "Feb 20, 2026", diagnosis: "ECG & stress test", prescription: "Lifestyle modifications", status: "Completed" },
    ],
  },
  {
    doctor: "Dr. Sneha Reddy",
    specialty: "Dermatology",
    visits: [
      { date: "Mar 28, 2026", diagnosis: "Eczema treatment", prescription: "Topical corticosteroids", status: "Ongoing" },
    ],
  },
];

export default function HistoryPage() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-alt">
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border-light bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center gap-2.5 border-b border-border-light px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-dark shadow-md shadow-primary/20"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="white" /></svg></div>
            <span className="text-lg font-bold text-text-primary">Heal<span className="text-primary">Queue</span></span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${pathname === link.href ? "bg-primary-50 text-primary shadow-sm" : "text-text-secondary hover:bg-bg-alt hover:text-text-primary"}`}>
              <span className={pathname === link.href ? "text-primary" : "text-text-muted"}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border-light p-4">
          <Link href="/login" className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-text-secondary transition-all duration-200 hover:border-accent-red/30 hover:text-accent-red hover:bg-accent-red-light">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
            Logout
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-light bg-white/80 px-6 backdrop-blur-xl">
          <button onClick={() => setSidebarOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-bg-alt lg:hidden cursor-pointer"><svg className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg></button>
          <div className="mx-auto"><h2 className="text-sm font-semibold text-text-primary">Treatment History</h2></div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary font-bold text-sm">P</div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="mb-1 text-2xl font-bold text-text-primary">History</h1>
            <p className="mb-8 text-sm text-text-secondary">Your past treatments and visits, arranged by doctor</p>

            <div className="space-y-8">
              {historyByDoctor.map((group, gi) => (
                <motion.div key={group.doctor} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: gi * 0.1 }} className="rounded-2xl border border-border-light bg-white overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-border-light bg-bg-alt/50 px-6 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary font-bold">{group.doctor.split(" ")[1]?.[0] ?? "D"}</div>
                    <div>
                      <p className="font-semibold text-text-primary">{group.doctor}</p>
                      <p className="text-xs text-text-muted">{group.specialty}</p>
                    </div>
                    <span className="ml-auto rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary">{group.visits.length} visit{group.visits.length > 1 ? "s" : ""}</span>
                  </div>
                  <div className="divide-y divide-border-light">
                    {group.visits.map((visit, vi) => (
                      <div key={vi} className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:gap-6">
                        <p className="w-28 shrink-0 text-xs font-medium text-text-muted">{visit.date}</p>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-text-primary">{visit.diagnosis}</p>
                          <p className="text-xs text-text-muted mt-0.5">Rx: {visit.prescription}</p>
                        </div>
                        <span className={`self-start rounded-full px-2.5 py-1 text-[10px] font-semibold ${visit.status === "Completed" ? "bg-accent-green-light text-accent-green" : visit.status === "Follow-up" ? "bg-primary-100 text-primary" : "bg-yellow-50 text-yellow-600"}`}>{visit.status}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
