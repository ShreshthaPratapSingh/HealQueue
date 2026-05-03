"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [consultTime, setConsultTime] = useState("15");
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true, queueAlerts: true });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="mb-1 text-2xl font-bold text-text-primary">Settings</h1>
      <p className="mb-8 text-sm text-text-secondary">Manage your profile, clinic, and preferences</p>

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Doctor Profile */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-5 text-base font-semibold text-text-primary">Doctor Profile</h3>
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-xl font-bold text-primary">
              AS
            </div>
            <div>
              <p className="text-base font-semibold text-text-primary">Dr. Anika Sharma</p>
              <p className="text-sm text-text-muted">General Physician</p>
              <button className="mt-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">
                Change photo
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Full Name", value: "Dr. Anika Sharma" },
              { label: "Specialization", value: "General Physician" },
              { label: "Email", value: "anika.sharma@healqueue.com" },
              { label: "Phone", value: "+91 98765 43210" },
              { label: "License Number", value: "MCI-12345-2020" },
              { label: "Experience", value: "12 years" },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-1.5 block text-xs font-semibold text-text-secondary">{field.label}</label>
                <input
                  type="text"
                  defaultValue={field.value}
                  className="w-full rounded-xl border border-border bg-bg-alt py-2.5 px-4 text-sm text-text-primary outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                />
              </div>
            ))}
          </div>
          <button className="mt-5 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark active:scale-[0.98] cursor-pointer">
            Save Profile
          </button>
        </div>

        {/* Clinic Details */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-5 text-base font-semibold text-text-primary">Clinic Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Clinic Name", value: "Sharma Health Clinic" },
              { label: "Address", value: "123 MG Road, Pune 411001" },
              { label: "Operating Hours", value: "9:00 AM - 6:00 PM" },
              { label: "Working Days", value: "Mon - Sat" },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-1.5 block text-xs font-semibold text-text-secondary">{field.label}</label>
                <input
                  type="text"
                  defaultValue={field.value}
                  className="w-full rounded-xl border border-border bg-bg-alt py-2.5 px-4 text-sm text-text-primary outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                />
              </div>
            ))}
          </div>
          <button className="mt-5 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark active:scale-[0.98] cursor-pointer">
            Save Clinic Info
          </button>
        </div>

        {/* Consultation Time */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-2 text-base font-semibold text-text-primary">Consultation Time</h3>
          <p className="mb-5 text-xs text-text-muted">Average time per patient — affects estimated wait times</p>
          <div className="flex flex-wrap gap-2">
            {["10", "15", "20", "25", "30"].map((t) => (
              <button
                key={t}
                onClick={() => setConsultTime(t)}
                className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  consultTime === t
                    ? "border-primary bg-primary-50 text-primary"
                    : "border-border text-text-secondary hover:bg-bg-alt"
                }`}
              >
                {t} min
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-5 text-base font-semibold text-text-primary">Notifications</h3>
          <div className="space-y-4">
            {[
              { key: "email" as const, label: "Email notifications", desc: "Receive appointment confirmations via email" },
              { key: "sms" as const, label: "SMS notifications", desc: "Get text messages for urgent updates" },
              { key: "push" as const, label: "Push notifications", desc: "Browser push notifications for queue updates" },
              { key: "queueAlerts" as const, label: "Queue alerts", desc: "Get notified when queue reaches threshold" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between rounded-xl border border-border-light px-4 py-3.5">
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.label}</p>
                  <p className="text-xs text-text-muted">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                  className={`relative h-6 w-11 rounded-full transition-colors duration-200 cursor-pointer ${notifications[item.key] ? "bg-primary" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${notifications[item.key] ? "translate-x-5" : ""}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-accent-red/20 bg-white p-6">
          <h3 className="mb-2 text-base font-semibold text-accent-red">Danger Zone</h3>
          <p className="mb-4 text-xs text-text-muted">Irreversible and destructive actions</p>
          <div className="flex gap-3">
            <button className="rounded-xl border border-accent-red/30 px-5 py-2.5 text-sm font-semibold text-accent-red transition-all hover:bg-accent-red-light cursor-pointer">
              Delete Account
            </button>
            <button className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:bg-bg-alt cursor-pointer">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
