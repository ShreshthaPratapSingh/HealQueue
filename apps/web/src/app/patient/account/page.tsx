"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AccountPage() {
  const [profile, setProfile] = useState({ firstName: "Patient", lastName: "User", email: "patient@healqueue.com", phone: "+91 98765 43210", dob: "1995-06-15", gender: "Male", bloodGroup: "O+" });

  const inputClass = "w-full rounded-xl border border-border bg-bg-alt py-3 px-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="mb-1 text-2xl font-bold text-text-primary">Account</h1>
      <p className="mb-8 text-sm text-text-secondary">Manage your personal information</p>

      <div className="mx-auto max-w-2xl rounded-2xl border border-border-light bg-white p-6 lg:p-8">
        {/* Avatar */}
        <div className="mb-8 flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-100 text-3xl font-bold text-primary">{profile.firstName[0]}{profile.lastName[0]}</div>
          <div>
            <p className="text-lg font-bold text-text-primary">{profile.firstName} {profile.lastName}</p>
            <p className="text-sm text-text-muted">{profile.email}</p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-text-primary">First Name</label>
              <input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-text-primary">Last Name</label>
              <input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">Email</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-primary">Phone</label>
            <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className={inputClass} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-text-primary">Date of Birth</label>
              <input type="date" value={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-text-primary">Gender</label>
              <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className={inputClass}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-text-primary">Blood Group</label>
              <select value={profile.bloodGroup} onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })} className={inputClass}>
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl active:scale-[0.98] cursor-pointer">Save Changes</button>
        </form>
      </div>
    </motion.div>
  );
}
