"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative bg-bg-alt py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary-dark uppercase mb-4">Contact</span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">Get in Touch</h2>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">Have questions or feedback? We&apos;d love to hear from you.</p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-6">Let&apos;s connect</h3>
              <p className="text-text-secondary leading-relaxed">Whether you&apos;re a clinic looking to integrate or a patient with feedback, we&apos;re here to help.</p>
            </div>

            <div className="space-y-5">
              {[
                { icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>, label: "Email", value: "support@healqueue.com" },
                { icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>, label: "Phone", value: "+91 98765 43210" },
                { icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>, label: "Location", value: "Mumbai, India" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary">{item.icon}</div>
                  <div>
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{item.label}</p>
                    <p className="text-sm font-semibold text-text-primary mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-border-light bg-white p-8 shadow-xl shadow-black/[0.03]" id="contact-form">
              {submitted && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center gap-3 rounded-xl bg-accent-green-light px-5 py-4 border border-accent-green/20">
                  <svg className="h-5 w-5 text-accent-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-sm font-medium text-accent-green">Message sent successfully! We&apos;ll get back to you soon.</p>
                </motion.div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-text-primary">Name</label>
                  <input id="contact-name" type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="Your full name" className="w-full rounded-xl border border-border bg-bg-alt px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-text-primary">Email</label>
                  <input id="contact-email" type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="you@example.com" className="w-full rounded-xl border border-border bg-bg-alt px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-text-primary">Message</label>
                  <textarea id="contact-message" required rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} placeholder="How can we help you?" className="w-full resize-none rounded-xl border border-border bg-bg-alt px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10" />
                </div>
              </div>

              <button type="submit" className="mt-6 w-full rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] cursor-pointer" id="contact-submit">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
