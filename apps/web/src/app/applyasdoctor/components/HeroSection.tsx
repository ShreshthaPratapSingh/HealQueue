"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "42+", label: "Clinics Onboarded" },
  { value: "1.2L+", label: "Patients Served" },
  { value: "68%", label: "Wait Time Reduced" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white pt-32 pb-16 px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-accent-green/5 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left content */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-green/20 bg-accent-green-light px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-xs font-semibold text-accent-green">Now Accepting Applications</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-text-primary lg:text-5xl">
              Join HealQueue as a{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Verified Doctor
              </span>
            </h1>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-text-secondary">
              Streamline your patient queue, reduce wait times, and grow your practice with India&apos;s fastest-growing healthcare queue management platform.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <a href="#apply-form" className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]">
                Start Application →
              </a>
              <span className="text-xs text-text-muted">Takes ~5 minutes</span>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 text-[11px] text-text-muted">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                Verified Platform
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                HIPAA Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Free to Join
              </span>
            </div>
          </motion.div>

          {/* Right - Stats cards */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:max-w-sm lg:ml-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="rounded-2xl border border-border-light bg-white/80 backdrop-blur-sm p-5 text-center transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
              >
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-text-muted">{stat.label}</p>
              </motion.div>
            ))}

            {/* Testimonial card */}
            <div className="rounded-2xl border border-border-light bg-white/80 backdrop-blur-sm p-5">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-xs text-text-secondary leading-relaxed italic">&ldquo;HealQueue reduced my patient wait time by 70%. My clinic runs smoother than ever.&rdquo;</p>
              <p className="mt-2 text-[11px] font-semibold text-text-primary">Dr. Anika Sharma</p>
              <p className="text-[10px] text-text-muted">General Physician, Gurgaon</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
