"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const [theme, setTheme] = useState("light");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="mb-1 text-2xl font-bold text-text-primary">Settings</h1>
      <p className="mb-8 text-sm text-text-secondary">Manage your preferences</p>

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Notifications */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-4 text-base font-semibold text-text-primary">Notifications</h3>
          <div className="space-y-4">
            {[
              { key: "email" as const, label: "Email notifications", desc: "Receive appointment reminders via email" },
              { key: "sms" as const, label: "SMS notifications", desc: "Get text messages for urgent updates" },
              { key: "push" as const, label: "Push notifications", desc: "Browser push notifications" },
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

        {/* Appearance */}
        <div className="rounded-2xl border border-border-light bg-white p-6">
          <h3 className="mb-4 text-base font-semibold text-text-primary">Appearance</h3>
          <div className="flex gap-3">
            {["light", "dark", "system"].map((t) => (
              <button key={t} onClick={() => setTheme(t)} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-all duration-200 cursor-pointer ${theme === t ? "border-primary bg-primary-50 text-primary" : "border-border text-text-secondary hover:bg-bg-alt"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-accent-red/20 bg-white p-6">
          <h3 className="mb-2 text-base font-semibold text-accent-red">Danger Zone</h3>
          <p className="mb-4 text-xs text-text-muted">Irreversible and destructive actions</p>
          <div className="flex gap-3">
            <button className="rounded-xl border border-accent-red/30 px-5 py-2.5 text-sm font-semibold text-accent-red transition-all duration-200 hover:bg-accent-red-light cursor-pointer">Delete Account</button>
            <button className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text-secondary transition-all duration-200 hover:bg-bg-alt cursor-pointer">Export Data</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
