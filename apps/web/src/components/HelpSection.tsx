"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    question: "How does HealQueue work?",
    answer: "HealQueue connects patients with clinics through a real-time queue management system. Patients can join a queue remotely via their phone or walk in at the clinic. The system tracks each patient's position and provides live estimated wait times, so you always know when to arrive.",
  },
  {
    question: "Can I join the queue remotely?",
    answer: "Yes! HealQueue supports remote queue joining. Simply open the app, select your clinic and doctor, and join the queue from anywhere. You'll receive real-time updates about your position and a notification when it's almost your turn, so you can time your arrival perfectly.",
  },
  {
    question: "What if I am late?",
    answer: "If you're running late, you can update your status through the app. Depending on the clinic's policy, your position may be held for a grace period, or you may be moved down the queue. The clinic staff can also manually adjust your position if needed.",
  },
  {
    question: "Is HealQueue free for patients?",
    answer: "Yes, HealQueue is completely free for patients. We believe everyone deserves a transparent and stress-free healthcare experience. Clinics pay a small subscription fee to access the management dashboard and advanced features.",
  },
  {
    question: "How do clinics integrate with HealQueue?",
    answer: "Clinics can sign up for a HealQueue dashboard account. Integration is simple — the receptionist uses our web-based dashboard to manage the queue, and patients automatically receive updates. No hardware or complex setup required.",
  },
  {
    question: "Is my data safe with HealQueue?",
    answer: "Absolutely. We take data privacy seriously. All patient data is encrypted in transit and at rest. We comply with healthcare data regulations and never share personal information with third parties. Your health data stays between you and your healthcare provider.",
  },
];

function AccordionItem({ faq, index, isOpen, onToggle }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`group rounded-2xl border transition-all duration-300 ${isOpen ? "border-primary/20 bg-primary-50/30 shadow-lg shadow-primary/5" : "border-border-light bg-white hover:border-primary/10 hover:shadow-md"}`}>
      <button onClick={onToggle} className="flex w-full items-center justify-between px-7 py-6 text-left cursor-pointer" id={`faq-toggle-${index}`} aria-expanded={isOpen} aria-controls={`faq-content-${index}`}>
        <span className="flex items-center gap-4">
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors duration-300 ${isOpen ? "bg-primary text-white" : "bg-bg-alt text-text-muted group-hover:bg-primary-100 group-hover:text-primary"}`}>
            {index + 1}
          </span>
          <span className={`text-base font-semibold transition-colors duration-300 ${isOpen ? "text-primary-dark" : "text-text-primary"}`}>{faq.question}</span>
        </span>
        <span className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-primary text-white rotate-180" : "bg-bg-alt text-text-muted group-hover:bg-primary-100"}`}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div id={`faq-content-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
            <div className="px-7 pb-6 pl-19">
              <p className="text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HelpSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="help" className="relative bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/[0.02] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header */}
        <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-dark uppercase mb-4">FAQ</span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed">Everything you need to know about HealQueue</p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} faq={faq} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.5 }} className="mt-12 text-center">
          <p className="text-text-secondary mb-4">Still have questions?</p>
          <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
            Contact Us
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
