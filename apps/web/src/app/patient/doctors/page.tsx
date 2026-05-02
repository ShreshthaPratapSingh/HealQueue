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

const doctorCategories = [
    {
        category: "General Physician",
        doctors: [
            { name: "Dr. Anika Sharma", specialty: "General Medicine", rating: 4.8, patients: 1200, available: true },
            { name: "Dr. Rajesh Patel", specialty: "Family Medicine", rating: 4.6, patients: 980, available: true },
            { name: "Dr. Priya Menon", specialty: "Internal Medicine", rating: 4.9, patients: 1500, available: false },
        ],
    },
    {
        category: "Cardiologist",
        doctors: [
            { name: "Dr. Vikram Singh", specialty: "Cardiology", rating: 4.9, patients: 2100, available: true },
            { name: "Dr. Neha Gupta", specialty: "Interventional Cardiology", rating: 4.7, patients: 1800, available: true },
        ],
    },
    {
        category: "Dermatologist",
        doctors: [
            { name: "Dr. Sneha Reddy", specialty: "Dermatology", rating: 4.8, patients: 1400, available: true },
            { name: "Dr. Arjun Nair", specialty: "Cosmetic Dermatology", rating: 4.5, patients: 900, available: false },
        ],
    },
    {
        category: "Orthopedic",
        doctors: [
            { name: "Dr. Karan Malhotra", specialty: "Orthopedic Surgery", rating: 4.7, patients: 1600, available: true },
            { name: "Dr. Deepa Joshi", specialty: "Sports Medicine", rating: 4.6, patients: 1100, available: true },
        ],
    },
];

export default function DoctorsPage() {
    const pathname = usePathname();
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filteredCategories = doctorCategories.map((cat) => ({
        ...cat,
        doctors: cat.doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase())),
    })).filter((cat) => cat.doctors.length > 0);

    return (
        <div className="flex min-h-screen bg-bg-alt">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border-light bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex h-16 items-center gap-2.5 border-b border-border-light px-6">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-dark shadow-md shadow-primary/20">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="white" /></svg>
                        </div>
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

            {/* Main content */}
            <div className="flex flex-1 flex-col">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-light bg-white/80 px-6 backdrop-blur-xl">
                    <button onClick={() => setSidebarOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-bg-alt lg:hidden cursor-pointer" aria-label="Open menu">
                        <svg className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                    </button>
                    <div className="mx-auto w-full max-w-md">
                        <div className="relative">
                            <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search doctors..." className="w-full rounded-xl border border-border bg-bg-alt py-2.5 pr-4 pl-10 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10" id="search-doctors" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary font-bold text-sm">P</div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <h1 className="mb-1 text-2xl font-bold text-text-primary">Doctors</h1>
                        <p className="mb-8 text-sm text-text-secondary">Browse and book appointments with specialists</p>

                        {filteredCategories.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <svg className="mb-4 h-12 w-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                                <p className="text-text-secondary">No doctors found for &ldquo;{search}&rdquo;</p>
                            </div>
                        )}

                        {filteredCategories.map((cat, ci) => (
                            <div key={cat.category} className="mb-10">
                                <h2 className="mb-4 text-lg font-semibold text-text-primary">{cat.category}</h2>
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    {cat.doctors.map((doc, di) => (
                                        <motion.div key={doc.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: ci * 0.1 + di * 0.05 }} className="group rounded-2xl border border-border-light bg-white p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
                                            <div className="mb-4 flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary font-bold text-lg">{doc.name.split(" ")[1]?.[0] ?? "D"}</div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-text-primary">{doc.name}</p>
                                                    <p className="text-xs text-text-muted">{doc.specialty}</p>
                                                </div>
                                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${doc.available ? "bg-accent-green-light text-accent-green" : "bg-accent-red-light text-accent-red"}`}>{doc.available ? "Available" : "Busy"}</span>
                                            </div>
                                            <div className="mb-4 flex items-center gap-4 text-xs text-text-muted">
                                                <span className="flex items-center gap-1"><svg className="h-3.5 w-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> {doc.rating}</span>
                                                <span>{doc.patients.toLocaleString()} patients</span>
                                            </div>
                                            <button className="w-full rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-primary/20 transition-all duration-200 hover:bg-primary-dark active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={!doc.available}>
                                                {doc.available ? "Book Appointment" : "Not Available"}
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
