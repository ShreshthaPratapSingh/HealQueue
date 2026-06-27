"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const hospitals = [
    { name: "Apollo Hospital", location: "Mumbai, Maharashtra", departments: 24, beds: 500, rating: 4.8, emergency: true },
    { name: "Fortis Healthcare", location: "Delhi, NCR", departments: 20, beds: 400, rating: 4.7, emergency: true },
    { name: "Max Super Speciality", location: "Noida, UP", departments: 18, beds: 350, rating: 4.6, emergency: true },
    { name: "Medanta Hospital", location: "Gurugram, Haryana", departments: 22, beds: 450, rating: 4.9, emergency: true },
    { name: "Narayana Health", location: "Bangalore, Karnataka", departments: 16, beds: 300, rating: 4.5, emergency: false },
    { name: "AIIMS", location: "New Delhi", departments: 30, beds: 800, rating: 4.8, emergency: true },
    { name: "Kokilaben Hospital", location: "Mumbai, Maharashtra", departments: 19, beds: 380, rating: 4.7, emergency: true },
    { name: "Manipal Hospital", location: "Bangalore, Karnataka", departments: 21, beds: 420, rating: 4.6, emergency: true },
];

export default function HospitalsPage() {
    const [search, setSearch] = useState("");

    const filtered = hospitals.filter((h) => h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase()));

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="mb-1 text-2xl font-bold text-text-primary">Hospitals</h1>
                    <p className="text-sm text-text-secondary">Find hospitals near you</p>
                </div>
                <div className="w-full max-w-xs">
                    <div className="relative">
                        <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search hospitals..."
                            className="w-full rounded-xl border border-border bg-bg-alt py-2.5 pr-4 pl-10 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                            id="search-hospitals"
                        />
                    </div>
                </div>
            </div>

            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <svg className="mb-4 h-12 w-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    <p className="text-text-secondary">No hospitals found for &ldquo;{search}&rdquo;</p>
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((h, i) => (
                    <motion.div key={h.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="group rounded-2xl border border-border-light bg-white p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" /></svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-text-primary">{h.name}</p>
                                <p className="text-xs text-text-muted">{h.location}</p>
                            </div>
                            {h.emergency && <span className="rounded-full bg-accent-red-light px-2.5 py-1 text-[10px] font-semibold text-accent-red">24/7</span>}
                        </div>
                        <div className="mb-4 flex items-center gap-4 text-xs text-text-muted">
                            <span className="flex items-center gap-1"><svg className="h-3.5 w-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> {h.rating}</span>
                            <span>{h.departments} departments</span>
                            <span>{h.beds} beds</span>
                        </div>
                        <button className="w-full rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-primary/20 transition-all duration-200 hover:bg-primary-dark active:scale-[0.98] cursor-pointer">View Details</button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
