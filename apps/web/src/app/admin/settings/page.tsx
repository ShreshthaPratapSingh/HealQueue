"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["Profile", "Notifications", "Clinic", "Security"];

function Toggle({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-text-primary">{label}</span>
      <button onClick={onToggle} className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${enabled ? "bg-primary" : "bg-gray-200"}`}>
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [queueAlerts, setQueueAlerts] = useState(true);
  const [appAlerts, setAppAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-secondary">Manage your account and system preferences</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1 rounded-xl bg-bg-alt p-1 w-fit">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${activeTab === tab ? "bg-white text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"}`}>{tab}</button>
        ))}
      </div>

      <div className="max-w-2xl">
        {activeTab === "Profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="rounded-2xl border border-border-light bg-white p-6">
              <h3 className="text-base font-semibold text-text-primary mb-5">Profile Information</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-xl font-bold text-white shadow-lg shadow-primary/25">A</div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Admin User</p>
                  <p className="text-xs text-text-muted">Super Administrator</p>
                  <button className="mt-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">Change avatar</button>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Full Name", value: "Admin User", type: "text" },
                  { label: "Email", value: "admin@healqueue.com", type: "email" },
                  { label: "Phone", value: "+91 98765 43210", type: "tel" },
                  { label: "Role", value: "Super Admin", type: "text" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs font-medium text-text-muted mb-1.5 block">{field.label}</label>
                    <input type={field.type} defaultValue={field.value} className="w-full rounded-xl border border-border-light bg-bg-alt px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/30 focus:bg-white transition-colors" />
                  </div>
                ))}
              </div>
              <button className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary-dark cursor-pointer">Save Changes</button>
            </div>
          </motion.div>
        )}

        {activeTab === "Notifications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="rounded-2xl border border-border-light bg-white p-6">
              <h3 className="text-base font-semibold text-text-primary mb-2">Notification Preferences</h3>
              <p className="text-xs text-text-muted mb-4">Choose how you want to be notified</p>
              <div className="divide-y divide-border-light">
                <Toggle enabled={emailNotif} onToggle={() => setEmailNotif(!emailNotif)} label="Email Notifications" />
                <Toggle enabled={pushNotif} onToggle={() => setPushNotif(!pushNotif)} label="Push Notifications" />
                <Toggle enabled={queueAlerts} onToggle={() => setQueueAlerts(!queueAlerts)} label="Queue Alerts" />
                <Toggle enabled={appAlerts} onToggle={() => setAppAlerts(!appAlerts)} label="Application Alerts" />
                <Toggle enabled={weeklyReport} onToggle={() => setWeeklyReport(!weeklyReport)} label="Weekly Report Email" />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "Clinic" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="rounded-2xl border border-border-light bg-white p-6">
              <h3 className="text-base font-semibold text-text-primary mb-2">Clinic Management</h3>
              <p className="text-xs text-text-muted mb-4">System-wide clinic settings</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-text-muted mb-1.5 block">Default Queue Limit</label>
                  <input type="number" defaultValue={50} className="w-full rounded-xl border border-border-light bg-bg-alt px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/30 focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-muted mb-1.5 block">Max Wait Time Alert (minutes)</label>
                  <input type="number" defaultValue={20} className="w-full rounded-xl border border-border-light bg-bg-alt px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/30 focus:bg-white transition-colors" />
                </div>
                <Toggle enabled={autoApprove} onToggle={() => setAutoApprove(!autoApprove)} label="Auto-approve verified doctors" />
              </div>
              <button className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary-dark cursor-pointer">Save Settings</button>
            </div>
          </motion.div>
        )}

        {activeTab === "Security" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="rounded-2xl border border-border-light bg-white p-6">
              <h3 className="text-base font-semibold text-text-primary mb-2">Security Settings</h3>
              <p className="text-xs text-text-muted mb-4">Protect your admin account</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-text-muted mb-1.5 block">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-border-light bg-bg-alt px-4 py-2.5 text-sm outline-none focus:border-primary/30 focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-muted mb-1.5 block">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-border-light bg-bg-alt px-4 py-2.5 text-sm outline-none focus:border-primary/30 focus:bg-white transition-colors" />
                </div>
                <Toggle enabled={twoFA} onToggle={() => setTwoFA(!twoFA)} label="Two-Factor Authentication" />
              </div>
              <button className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary-dark cursor-pointer">Update Security</button>
            </div>

            <div className="rounded-2xl border border-border-light bg-white p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Active Sessions</h3>
              <div className="space-y-3">
                {[
                  { device: "Chrome · Windows", location: "Gurgaon, India", current: true },
                  { device: "Safari · macOS", location: "Mumbai, India", current: false },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-border-light px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{session.device}</p>
                      <p className="text-[11px] text-text-muted">{session.location}</p>
                    </div>
                    {session.current ? (
                      <span className="rounded-full bg-accent-green-light px-2.5 py-1 text-[10px] font-semibold text-accent-green">Current</span>
                    ) : (
                      <button className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-accent-red hover:bg-accent-red-light transition-colors cursor-pointer">Revoke</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
