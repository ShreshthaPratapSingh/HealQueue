"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="mb-1 text-2xl font-bold text-text-primary">Settings</h1>
      <p className="mb-8 text-sm text-text-secondary">Manage your profile and clinic preferences</p>

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Profile */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-5 text-base font-semibold text-text-primary">Profile</h3>
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-xl font-bold text-primary">
              RS
            </div>
            <div>
              <p className="text-base font-semibold text-text-primary">Rekha Sharma</p>
              <p className="text-sm text-text-muted">Receptionist</p>
              <button className="mt-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">
                Change photo
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Full Name", value: "Rekha Sharma" },
              { label: "Role", value: "Receptionist" },
              { label: "Email", value: "rekha@healqueue.com" },
              { label: "Phone", value: "+91 98765 00001" },
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

        {/* Clinic Info */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-5 text-base font-semibold text-text-primary">Clinic Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Clinic Name", value: "Sharma Health Clinic" },
              { label: "Doctor", value: "Dr. Anika Sharma" },
              { label: "Address", value: "123 MG Road, Pune 411001" },
              { label: "Operating Hours", value: "9:00 AM - 6:00 PM" },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-1.5 block text-xs font-semibold text-text-secondary">{field.label}</label>
                <div className="w-full rounded-xl border border-border-light bg-bg-alt py-2.5 px-4 text-sm text-text-secondary">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-5 text-base font-semibold text-text-primary">Notifications</h3>
          <div className="space-y-4">
            {[
              { key: "email" as const, label: "Email notifications", desc: "Receive queue updates via email" },
              { key: "sms" as const, label: "SMS notifications", desc: "Get text messages for urgent alerts" },
              { key: "push" as const, label: "Push notifications", desc: "Browser notifications for new patients" },
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
      </div>
    </motion.div>
  );
}
