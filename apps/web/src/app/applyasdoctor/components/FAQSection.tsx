"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "Is it free to join HealQueue?", a: "Yes! Joining HealQueue is completely free. We offer a generous free plan that includes basic queue management, patient tracking, and a dedicated dashboard. Premium features are available at affordable plans." },
  { q: "How long does the verification process take?", a: "Our team reviews applications within 24-48 hours. Once your documents are verified, your account is activated and you can start managing your queue immediately." },
  { q: "What documents are required?", a: "You'll need your medical license certificate, a government-issued ID, your degree certificates, and clinic registration proof. All documents are securely stored and encrypted." },
  { q: "Can I add my receptionist?", a: "Absolutely! Once approved, you can invite your receptionist to join with a dedicated receptionist dashboard for managing walk-ins, appointments, and the patient queue." },
  { q: "Is patient data secure?", a: "Yes. HealQueue is fully HIPAA-compliant. All patient data is encrypted at rest and in transit. We follow industry-best security practices to protect sensitive healthcare information." },
  { q: "Can I manage multiple clinics?", a: "Yes, our platform supports multi-clinic management. You can manage queues across different locations from a single dashboard with separate analytics for each." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-3">Frequently Asked Questions</h2>
          <p className="text-sm text-text-secondary">Everything you need to know about joining HealQueue.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border-light bg-white overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="flex w-full items-center justify-between px-6 py-4 text-left cursor-pointer">
                <span className="text-sm font-semibold text-text-primary pr-4">{faq.q}</span>
                <svg className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <div className="px-6 pb-4">
                      <p className="text-xs leading-relaxed text-text-secondary">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Support card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 rounded-2xl border border-primary/20 bg-primary-50/50 p-6 text-center">
          <h3 className="text-sm font-bold text-text-primary mb-1">Still have questions?</h3>
          <p className="text-xs text-text-secondary mb-4">Our support team is here to help you get started.</p>
          <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary-dark cursor-pointer">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
