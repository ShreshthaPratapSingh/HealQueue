"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Application {
  id: number;
  name: string;
  specialization: string;
  clinic: string;
  experience: string;
  licenseId: string;
  email: string;
  phone: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialApps: Application[] = [
  { id: 1, name: "Dr. Rajesh Kumar", specialization: "Cardiologist", clinic: "Heart Care Clinic", experience: "12 years", licenseId: "MCI-78432", email: "rajesh.k@email.com", phone: "+91 98765 43210", date: "May 12, 2026", status: "Pending" },
  { id: 2, name: "Dr. Meera Reddy", specialization: "Dermatologist", clinic: "SkinFirst Clinic", experience: "8 years", licenseId: "MCI-65291", email: "meera.r@email.com", phone: "+91 87654 32109", date: "May 11, 2026", status: "Pending" },
  { id: 3, name: "Dr. Vikram Singh", specialization: "Orthopedic Surgeon", clinic: "BoneJoint Hospital", experience: "15 years", licenseId: "MCI-45123", email: "vikram.s@email.com", phone: "+91 76543 21098", date: "May 10, 2026", status: "Approved" },
  { id: 4, name: "Dr. Ananya Das", specialization: "Pediatrician", clinic: "KidsCare Clinic", experience: "6 years", licenseId: "MCI-89012", email: "ananya.d@email.com", phone: "+91 65432 10987", date: "May 9, 2026", status: "Rejected" },
  { id: 5, name: "Dr. Arjun Mehta", specialization: "ENT Specialist", clinic: "ENT Solutions", experience: "10 years", licenseId: "MCI-34567", email: "arjun.m@email.com", phone: "+91 54321 09876", date: "May 8, 2026", status: "Pending" },
  { id: 6, name: "Dr. Priya Sharma", specialization: "Gynecologist", clinic: "Women Wellness Center", experience: "14 years", licenseId: "MCI-23456", email: "priya.s@email.com", phone: "+91 43210 98765", date: "May 7, 2026", status: "Pending" },
  { id: 7, name: "Dr. Sanjay Gupta", specialization: "Neurologist", clinic: "BrainCare Hospital", experience: "18 years", licenseId: "MCI-12345", email: "sanjay.g@email.com", phone: "+91 32109 87654", date: "May 6, 2026", status: "Approved" },
  { id: 8, name: "Dr. Kavita Nair", specialization: "Ophthalmologist", clinic: "EyeSight Clinic", experience: "9 years", licenseId: "MCI-56789", email: "kavita.n@email.com", phone: "+91 21098 76543", date: "May 5, 2026", status: "Pending" },
];

const statusConfig: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-600 border-amber-200",
  Approved: "bg-accent-green-light text-accent-green border-accent-green/20",
  Rejected: "bg-accent-red-light text-accent-red border-accent-red/20",
};

function DetailModal({ app, onClose, onApprove, onReject }: { app: Application; onClose: () => void; onApprove: () => void; onReject: () => void }) {
  const [notes, setNotes] = useState("");
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25 }} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border-light bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light bg-white/90 backdrop-blur-sm px-6 py-4 rounded-t-2xl">
          <h2 className="text-lg font-bold text-text-primary">Application Details</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-bg-alt transition-colors cursor-pointer">
            <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-xl font-bold text-white shadow-lg shadow-primary/25">
              {app.name.split(" ").slice(1).map((n) => n[0]).join("")}
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-primary">{app.name}</h3>
              <p className="text-sm text-text-secondary">{app.specialization}</p>
              <span className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusConfig[app.status]}`}>{app.status}</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Clinic", value: app.clinic },
              { label: "Experience", value: app.experience },
              { label: "License ID", value: app.licenseId },
              { label: "Email", value: app.email },
              { label: "Phone", value: app.phone },
              { label: "Applied On", value: app.date },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-bg-alt p-3">
                <p className="text-[11px] font-medium text-text-muted mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-text-primary">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Uploaded Documents</h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {["Medical License Certificate", "Degree Certificate", "ID Proof", "Clinic Registration"].map((doc) => (
                <div key={doc} className="flex items-center gap-3 rounded-xl border border-border-light px-4 py-3 hover:bg-bg-alt transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                  </div>
                  <span className="text-xs font-medium text-text-secondary">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Experience Timeline</h4>
            <div className="space-y-3">
              {[
                { period: "2020 – Present", role: "Senior Consultant", place: app.clinic },
                { period: "2016 – 2020", role: "Consultant", place: "City Hospital" },
                { period: "2014 – 2016", role: "Resident", place: "AIIMS Delhi" },
              ].map((exp, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5" />
                    {i < 2 && <div className="w-0.5 flex-1 bg-primary-100" />}
                  </div>
                  <div className="pb-3">
                    <p className="text-sm font-semibold text-text-primary">{exp.role}</p>
                    <p className="text-[11px] text-text-muted">{exp.place} · {exp.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Notes */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-2">Admin Notes</h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add review notes here..."
              className="w-full rounded-xl border border-border-light bg-bg-alt px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-primary/30 focus:bg-white transition-colors resize-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          {app.status === "Pending" && (
            <div className="flex items-center gap-3 pt-2">
              <button onClick={onApprove} className="flex-1 rounded-xl bg-accent-green px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-accent-green/20 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer">
                Approve Application
              </button>
              <button onClick={onReject} className="flex-1 rounded-xl border border-accent-red/30 bg-accent-red-light px-5 py-3 text-sm font-semibold text-accent-red transition-all hover:bg-accent-red hover:text-white active:scale-[0.98] cursor-pointer">
                Reject Application
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DoctorApplicationsPage() {
  const [apps, setApps] = useState(initialApps);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filtered = apps.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.specialization.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = { total: apps.length, pending: apps.filter((a) => a.status === "Pending").length, approved: apps.filter((a) => a.status === "Approved").length, rejected: apps.filter((a) => a.status === "Rejected").length };

  const handleApprove = (id: number) => { setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: "Approved" as const } : a)); setSelectedApp(null); };
  const handleReject = (id: number) => { setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: "Rejected" as const } : a)); setSelectedApp(null); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-text-primary">Doctor Applications</h1>
        <p className="text-sm text-text-secondary">Review and manage doctor onboarding applications</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: counts.total, bg: "bg-primary-50", color: "text-primary" },
          { label: "Pending", value: counts.pending, bg: "bg-amber-50", color: "text-amber-600" },
          { label: "Approved", value: counts.approved, bg: "bg-accent-green-light", color: "text-accent-green" },
          { label: "Rejected", value: counts.rejected, bg: "bg-accent-red-light", color: "text-accent-red" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border-light bg-white p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs font-medium text-text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-xl border border-border-light bg-white px-4 py-2 transition-colors focus-within:border-primary/30">
          <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <input type="text" placeholder="Search doctors..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 bg-transparent text-sm outline-none placeholder:text-text-muted" id="app-search" />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Pending", "Approved", "Rejected"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${filterStatus === s ? "bg-primary text-white shadow-sm" : "bg-white border border-border-light text-text-secondary hover:bg-bg-alt"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border-light bg-white">
        <div className="hidden lg:grid grid-cols-12 gap-4 border-b border-border-light px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          <div className="col-span-3">Doctor</div>
          <div className="col-span-2">Clinic</div>
          <div className="col-span-1">Exp.</div>
          <div className="col-span-2">License</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-alt mb-4">
              <svg className="h-7 w-7 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0h3m-3 0v3m0-3v-3m-6.75 9h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
            </div>
            <p className="text-sm font-medium text-text-secondary">No applications found</p>
            <p className="text-xs text-text-muted mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((app) => (
              <motion.div key={app.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-center border-b border-border-light px-6 py-4 transition-colors hover:bg-bg-alt">
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">{app.name.split(" ").slice(1).map((n) => n[0]).join("")}</div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{app.name}</p>
                    <p className="text-[11px] text-text-muted">{app.specialization}</p>
                  </div>
                </div>
                <div className="lg:col-span-2 text-xs text-text-secondary"><span className="lg:hidden text-text-muted">Clinic: </span>{app.clinic}</div>
                <div className="lg:col-span-1 text-xs text-text-secondary"><span className="lg:hidden text-text-muted">Exp: </span>{app.experience}</div>
                <div className="lg:col-span-2 text-xs text-text-muted font-mono"><span className="lg:hidden text-text-muted font-sans">License: </span>{app.licenseId}</div>
                <div className="lg:col-span-1 text-[11px] text-text-muted">{app.date.split(",")[0]}</div>
                <div className="lg:col-span-1">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusConfig[app.status]}`}>{app.status}</span>
                </div>
                <div className="lg:col-span-2 flex items-center justify-end gap-2">
                  {app.status === "Pending" && (
                    <>
                      <button onClick={() => handleApprove(app.id)} className="rounded-lg bg-accent-green/10 px-2.5 py-1.5 text-[11px] font-semibold text-accent-green hover:bg-accent-green hover:text-white transition-all cursor-pointer">Approve</button>
                      <button onClick={() => handleReject(app.id)} className="rounded-lg bg-accent-red/10 px-2.5 py-1.5 text-[11px] font-semibold text-accent-red hover:bg-accent-red hover:text-white transition-all cursor-pointer">Reject</button>
                    </>
                  )}
                  <button onClick={() => setSelectedApp(app)} className="rounded-lg bg-primary-50 px-2.5 py-1.5 text-[11px] font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">Details</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-xs text-text-muted">Showing {filtered.length} of {apps.length} applications</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${p === 1 ? "bg-primary text-white" : "text-text-secondary hover:bg-bg-alt"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <DetailModal app={selectedApp} onClose={() => setSelectedApp(null)} onApprove={() => handleApprove(selectedApp.id)} onReject={() => handleReject(selectedApp.id)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
