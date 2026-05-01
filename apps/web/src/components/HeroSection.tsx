"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white pt-24">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-16 lg:flex-row lg:gap-16 lg:px-8 lg:py-24">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-accent-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-primary-dark uppercase">Now Available</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Real-Time Doctor{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Queue Management</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-10 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl lg:mx-0 mx-auto">
            Book smarter. Wait less. Experience healthcare without uncertainty.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer" id="hero-get-started">
              Get Started
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
            <button onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })} className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-8 py-4 text-base font-semibold text-text-primary shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 cursor-pointer" id="hero-learn-more">
              Learn More
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-12 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
            {[{ value: "50+", label: "Clinics" }, { value: "10k+", label: "Patients Served" }, { value: "4.9", label: "Rating" }].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs font-medium text-text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Illustration */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex-1">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-primary-light/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-white/50 p-2 shadow-2xl shadow-primary/10 backdrop-blur-sm">
              <Image src="/hero-illustration.png" alt="HealQueue - Real-time doctor queue management" width={600} height={500} priority className="h-auto w-full rounded-2xl object-cover" />
            </div>

            {/* Floating card - Queue position */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border-light bg-white px-5 py-4 shadow-xl shadow-black/5 lg:-left-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-green-light">
                  <svg className="h-5 w-5 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-muted">Your Position</p>
                  <p className="text-lg font-bold text-text-primary">#3 in Queue</p>
                </div>
              </div>
            </div>

            {/* Floating card - Wait time */}
            <div className="absolute -top-4 -right-4 rounded-2xl border border-border-light bg-white px-5 py-4 shadow-xl shadow-black/5 lg:-right-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-muted">Est. Wait</p>
                  <p className="text-lg font-bold text-primary">~12 min</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 28C1248 32 1344 48 1392 56L1440 64V80H0V40Z" fill="#F9FAFB" />
        </svg>
      </div>
    </section>
  );
}
