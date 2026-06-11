"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ErrorBanner from "@/components/ui/ErrorBanner";
import { CardSkeleton } from "@/components/ui/LoadingSkeleton";
import type { AvailableDoctor } from "@/types/queue.types";

const API_BASE = "http://localhost:5000/api/queue";

export default function DoctorsPage() {
    const [search, setSearch] = useState("");
    const [doctors, setDoctors] = useState<AvailableDoctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [joiningQueueId, setJoiningQueueId] = useState<string | null>(null);
    const [joinSuccess, setJoinSuccess] = useState<{ queueId: string; tokenNumber: number; estimatedWait: number } | null>(null);

    // Fetch available doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(`${API_BASE}/doctors/available`, { credentials: "include" });
                if (!res.ok) throw new Error("Failed to fetch available doctors");
                const data = await res.json();
                setDoctors(data.doctors || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    // Join queue
    const handleJoinQueue = async (queueId: string) => {
        setJoiningQueueId(queueId);
        try {
            const res = await fetch(`${API_BASE}/join`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ queueId, type: "ONLINE" }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to join queue");
            }
            const data = await res.json();
            setJoinSuccess({ queueId, tokenNumber: data.tokenNumber, estimatedWait: data.estimatedWait });
            setDoctors((prev) =>
                prev.map((d) =>
                    d.queue._id === queueId
                        ? { ...d, waitingCount: d.waitingCount + 1, estimatedWait: d.estimatedWait + d.queue.estimatedWaitPerPatient }
                        : d
                )
            );
        } catch (err: any) {
            setError(err.message);
        } finally {
            setJoiningQueueId(null);
        }
    };

    // Filter
    const filtered = doctors.filter((d) => {
        const doctorName = `${d.queue.doctorId.firstName} ${d.queue.doctorId.lastName}`.toLowerCase();
        const clinicName = d.queue.clinicId.name.toLowerCase();
        const q = search.toLowerCase();
        return doctorName.includes(q) || clinicName.includes(q);
    });

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="mb-1 text-2xl font-bold text-text-primary">Available Doctors</h1>
                    <p className="text-sm text-text-secondary">Join a doctor&apos;s queue to get your token</p>
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
                            placeholder="Search doctors..."
                            className="w-full rounded-xl border border-border bg-bg-alt py-2.5 pr-4 pl-10 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                            id="search-doctors"
                        />
                    </div>
                </div>
            </div>

            {/* Join Success Toast */}
            {joinSuccess && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-2xl border-2 border-accent-green/20 bg-accent-green-light p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-green text-xl font-bold text-white shadow-lg shadow-accent-green/25">
                            #{joinSuccess.tokenNumber}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-text-primary">You&apos;re in the queue!</p>
                            <p className="text-xs text-text-secondary">
                                Your token is <span className="font-bold">#{joinSuccess.tokenNumber}</span> · Estimated wait: <span className="font-bold">{joinSuccess.estimatedWait} min</span>
                            </p>
                        </div>
                        <button onClick={() => setJoinSuccess(null)} className="ml-auto text-xs font-semibold text-accent-green hover:underline cursor-pointer">Dismiss</button>
                    </div>
                </motion.div>
            )}

            {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

            {/* Loading */}
            {loading && (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
                </div>
            )}

            {/* No doctors */}
            {!loading && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <svg className="mb-4 h-12 w-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
                    </svg>
                    <p className="text-text-secondary font-medium">{search ? `No doctors found for "${search}"` : "No doctors are available right now"}</p>
                    <p className="text-xs text-text-muted mt-1">Check back later or try a different search</p>
                </div>
            )}

            {/* Doctor cards */}
            {!loading && filtered.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((item, i) => {
                        const doctor = item.queue.doctorId;
                        const clinic = item.queue.clinicId;
                        const doctorName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
                        const initial = doctor.lastName?.[0] ?? doctor.firstName?.[0] ?? "D";
                        const alreadyJoined = joinSuccess?.queueId === item.queue._id;

                        return (
                            <motion.div
                                key={item.queue._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="group rounded-2xl border border-border-light bg-white p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary font-bold text-lg">{initial}</div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-text-primary">{doctorName}</p>
                                        <p className="text-xs text-text-muted">{clinic.name}</p>
                                    </div>
                                    <span className="rounded-full bg-accent-green-light px-2.5 py-1 text-[10px] font-semibold text-accent-green">Open</span>
                                </div>
                                <div className="mb-4 flex items-center gap-4 text-xs text-text-muted">
                                    <span className="flex items-center gap-1">
                                        <svg className="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                        {item.waitingCount} in queue
                                    </span>
                                    <span>~{item.estimatedWait} min wait</span>
                                </div>
                                {clinic.address && <p className="mb-4 text-[11px] text-text-muted truncate">📍 {clinic.address}</p>}
                                <button
                                    onClick={() => handleJoinQueue(item.queue._id)}
                                    disabled={joiningQueueId === item.queue._id || alreadyJoined}
                                    className="w-full rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-primary/20 transition-all duration-200 hover:bg-primary-dark active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {alreadyJoined ? `Joined · Token #${joinSuccess?.tokenNumber}` : joiningQueueId === item.queue._id ? "Joining..." : "Join Queue"}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}
