"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const problemPoints = [
  { icon: "⏰", title: "Long Wait Times", desc: "Patients spend hours in crowded waiting rooms with no visibility into their queue position." },
  { icon: "❓", title: "Unpredictable Queues", desc: "No way to know how many patients are ahead or when your turn will come." },
  { icon: "😤", title: "Frustrating Experience", desc: "Uncertainty and wasted time lead to poor patient satisfaction and missed appointments." },
];

const features = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-1.5M12 12l3-1.5M12 12l-3-1.5M12 12V9" />
      </svg>
    ),
    title: "Live Queue Tracking",
    desc: "See your real-time queue position, estimated wait time, and get notified when your turn approaches.",
    color: "from-primary to-primary-dark",
    bgColor: "bg-primary-50",
    textColor: "text-primary",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: "Walk-in + Online Hybrid",
    desc: "Whether you walk in or book online, everyone is managed in one unified, fair queue system.",
    color: "from-accent-green to-emerald-600",
    bgColor: "bg-accent-green-light",
    textColor: "text-accent-green",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
      </svg>
    ),
    title: "Clinic Integration",
    desc: "Clinics get a powerful dashboard to manage patients, control queues, and optimize their workflow.",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    textColor: "text-violet-600",
  },
];

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative bg-bg-alt py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mx-auto max-w-2xl text-center mb-20">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-dark uppercase mb-4">Why HealQueue?</span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Healthcare waiting rooms are <span className="text-primary">broken</span>
          </h2>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed">We built HealQueue to fix the frustrating, time-wasting experience of waiting at clinics.</p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-24">
          {problemPoints.map((point, i) => (
            <AnimatedCard key={point.title} delay={i * 0.1}>
              <div className="group rounded-2xl border border-accent-red/10 bg-white p-7 transition-all duration-300 hover:border-accent-red/20 hover:shadow-lg hover:shadow-accent-red/5 hover:-translate-y-1">
                <span className="text-3xl mb-4 block">{point.icon}</span>
                <h3 className="text-lg font-bold text-text-primary mb-2">{point.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{point.desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Solution header */}
        <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block rounded-full bg-accent-green-light px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-green uppercase mb-4">The Solution</span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Smart queue management, <span className="text-accent-green">reimagined</span>
          </h2>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed">Real-time transparency for patients. Powerful tools for clinics.</p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <AnimatedCard key={feature.title} delay={i * 0.15}>
              <div className="group relative overflow-hidden rounded-2xl border border-border-light bg-white p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br opacity-5 -translate-y-1/2 translate-x-1/2 transition-transform duration-500 group-hover:scale-150" style={{ backgroundImage: `linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))` }} />
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bgColor} ${feature.textColor} transition-transform duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
