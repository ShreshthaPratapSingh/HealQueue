"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Personal Info", "Professional", "Clinic", "Documents", "Account"];

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
}: {
  label: string;

  type?: string;

  placeholder: string;

  value: string;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-text-muted mb-1.5 block">
        {label}

        {required && (
          <span className="text-accent-red ml-0.5">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-border-light bg-bg-alt px-4 py-2.5 text-sm"
      />
    </div>
  );
}

function Select({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
  return (
    <div>
      <label className="text-xs font-medium text-text-muted mb-1.5 block">{label}<span className="text-accent-red ml-0.5">*</span></label>
      <select value={value} onChange={onChange} className="w-full rounded-xl border border-border-light bg-bg-alt px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/40 focus:bg-white focus:shadow-sm transition-all cursor-pointer appearance-none">
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function UploadCard({
  label,
  desc,
  onFileSelect,
  currentFile,
}: {
  label: string;
  desc: string;
  onFileSelect: (file: File) => void;
  currentFile: File | null;
}) {
  const uploaded = currentFile !== null;
  const fileName = currentFile?.name ?? "";

  return (
    <label
      className={`group rounded-xl border-2 border-dashed p-5 text-center transition-all cursor-pointer block ${uploaded
        ? "border-accent-green/40 bg-accent-green-light/30"
        : "border-border bg-bg-alt hover:border-primary/30 hover:bg-primary-50/20"
        }`}
    >
      {/* REAL FILE INPUT */}
      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          onFileSelect(file);
        }}
      />

      {uploaded ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-green-light">
            <svg
              className="h-5 w-5 text-accent-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <p className="text-xs font-semibold text-accent-green">
            {label} uploaded
          </p>

          <p className="text-[10px] text-text-muted">
            {fileName}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-border-light group-hover:border-primary/20">
            <svg
              className="h-5 w-5 text-text-muted group-hover:text-primary transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>

          <p className="text-xs font-semibold text-text-primary">
            {label}
          </p>

          <p className="text-[10px] text-text-muted">
            {desc}
          </p>
        </div>
      )}
    </label>
  );
}

function SuccessScreen() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-green-light">
        <svg className="h-10 w-10 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </motion.div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Application Submitted!</h2>
      <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">Your application has been received. Our team will review your documents and get back to you within 24-48 hours.</p>
      <div className="mx-auto max-w-sm rounded-2xl border border-amber-200 bg-amber-50 p-5 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-sm font-bold text-amber-700">Under Review</span>
        </div>
        <p className="text-xs text-amber-600">Estimated approval: 24–48 hours</p>
      </div>
      <div className="rounded-2xl border border-border-light bg-white p-5 max-w-sm mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-text-primary">Confirmation email sent</p>
            <p className="text-[11px] text-text-muted">Check your inbox for details</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",

    email: "",
    phone: "",

    gender: "",
    dob: "",

    specialization: "",
    qualification: "",

    yearsOfExperience: "",

    currentHospital: "",

    currentPosition: "",

    consultationFee: "",

    languagesSpoken: "",

    medicalLicenseNumber: "",

    clinicName: "",
    clinicAddress: "",

    city: "",
    state: "",

    zipCode: "",

    clinicPhone: "",

    workingHours: "",

    numberOfStaff: "",

    facilities: [] as string[],

    password: "",
    confirmPassword: "",
  });

  const [files, setFiles] = useState({
    profilePhoto: null as File | null,

    medicalLicense: null as File | null,

    governmentId: null as File | null,

    degreeCertificate: null as File | null,

    clinicRegistration: null as File | null,
  });

  const next = () => { if (step < steps.length - 1) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const handleSubmit = async () => {
    try {
      const submitData = new FormData();

      // TEXT FIELDS
      Object.entries(formData).forEach(
        ([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              submitData.append(key, item);
            });
          } else {
            submitData.append(
              key,
              value.toString()
            );
          }
        }
      );

      // FILES
      Object.entries(files).forEach(
        ([key, value]) => {
          if (value) {
            submitData.append(key, value);
          }
        }
      );

      const response = await fetch(
        "http://localhost:5000/api/doctor-applications/apply",
        {
          method: "POST",

          credentials: "include",

          body: submitData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to submit application"
        );
      }

      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (submitted) return <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16" id="apply-form"><div className="rounded-2xl border border-border-light bg-white p-8"><SuccessScreen /></div></div>;

  return (
    <section className="py-16 px-6 lg:px-8" id="apply-form">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl font-bold text-text-primary mb-2">Doctor Application Form</h2>
          <p className="text-sm text-text-secondary">Fill in your details to get started. All fields marked with * are required.</p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((s, i) => (
              <button key={s} onClick={() => setStep(i)} className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${i <= step ? "text-primary" : "text-text-muted"}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-all ${i < step ? "bg-accent-green text-white" : i === step ? "bg-primary text-white shadow-md shadow-primary/25" : "bg-bg-alt text-text-muted border border-border-light"}`}>
                  {i < step ? <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> : i + 1}
                </span>
                <span className="hidden sm:inline">{s}</span>
              </button>
            ))}
          </div>
          <div className="h-1.5 w-full rounded-full bg-bg-alt overflow-hidden">
            <motion.div animate={{ width: `${((step + 1) / steps.length) * 100}%` }} transition={{ duration: 0.4 }} className="h-full rounded-full bg-linear-to-r from-primary to-primary-light" />
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-border-light bg-white p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

              {step === 0 && (
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Personal Information</h3>
                  <p className="text-xs text-text-muted mb-6">Tell us about yourself</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="First Name"
                      placeholder="Rajesh"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Last Name"
                      placeholder="Kumar"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lastName: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="rajesh@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                    />
                    <Select label="Gender" options={["Male", "Female", "Other"]} value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
                    <Input
                      label="Date of Birth"
                      type="date"
                      placeholder=""
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dob: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mt-5">
                    <label className="text-xs font-medium text-text-muted mb-2 block">
                      Profile Photo
                    </label>

                    <UploadCard
                      label="Profile Photo"
                      desc="JPG, PNG up to 5MB"
                      currentFile={files.profilePhoto}
                      onFileSelect={(file) => {
                        setFiles({
                          ...files,
                          profilePhoto: file,
                        });
                      }}
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Professional Information</h3>
                  <p className="text-xs text-text-muted mb-6">Your medical credentials and experience</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select label="Specialization" options={["General Physician", "Cardiologist", "Dermatologist", "Orthopedic", "Pediatrician", "Gynecologist", "ENT", "Neurologist", "Ophthalmologist", "Dentist"]} value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} />
                    <Select label="Years of Experience" options={["0-2 years", "3-5 years", "6-10 years", "11-15 years", "15+ years"]} value={formData.yearsOfExperience} onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })} />
                    <Input
                      label="Medical License Number"
                      placeholder="MCI-XXXXX"
                      value={formData.medicalLicenseNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          medicalLicenseNumber: e.target.value,
                        })
                      }
                    />
                    <Select label="Qualification" options={["MBBS", "MD", "MS", "DM", "MCh", "DNB", "BDS", "MDS"]} value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} />
                    <Input
                      label="Hospital / Clinic Name"
                      placeholder="Current workplace"
                      value={formData.currentHospital}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentHospital: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Current Position"
                      placeholder="e.g. Senior Consultant"
                      value={formData.currentPosition}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentPosition: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Consultation Fee (₹)"
                      type="number"
                      placeholder="500"
                      value={formData.consultationFee}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          consultationFee: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Languages Spoken"
                      placeholder="English, Hindi"
                      value={formData.languagesSpoken}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          languagesSpoken: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Clinic Information</h3>
                  <p className="text-xs text-text-muted mb-6">Where will you be using HealQueue?</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Input
                        label="Clinic Name"
                        placeholder="Your clinic's name"
                        value={formData.clinicName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            clinicName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        label="Clinic Address"
                        placeholder="Full address"
                        value={formData.clinicAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            clinicAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Input
                      label="City"
                      placeholder="e.g. Mumbai"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          city: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="State"
                      placeholder="e.g. Maharashtra"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          state: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="ZIP Code"
                      placeholder="400001"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          zipCode: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Clinic Phone"
                      type="tel"
                      placeholder="+91 22 XXXX XXXX"
                      value={formData.clinicPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          clinicPhone: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Working Hours"
                      placeholder="e.g. 9:00 AM – 5:00 PM"
                      value={formData.workingHours}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          workingHours: e.target.value,
                        })
                      }
                    />
                    <Select label="Number of Staff" options={["1-3", "4-10", "11-20", "20+"]} value={formData.numberOfStaff} onChange={(e) => setFormData({ ...formData, numberOfStaff: e.target.value })} />
                  </div>
                  <div className="mt-4">
                    <label className="text-xs font-medium text-text-muted mb-2 block">Available Facilities</label>
                    <div className="flex flex-wrap gap-2">
                      {["Pharmacy", "Lab", "X-Ray", "Parking", "WiFi", "Wheelchair Access", "Emergency"].map((f) => (
                        <label key={f} className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs cursor-pointer transition-colors ${formData.facilities.includes(f) ? "border-primary/40 bg-primary-50/30 text-primary" : "border-border-light text-text-secondary hover:bg-bg-alt"}`}>
                          <input
                            type="checkbox"
                            className="rounded accent-primary"
                            checked={formData.facilities.includes(f)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({ ...formData, facilities: [...formData.facilities, f] });
                              } else {
                                setFormData({ ...formData, facilities: formData.facilities.filter((item) => item !== f) });
                              }
                            }}
                          />
                          {f}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Documents Upload</h3>
                  <p className="text-xs text-text-muted mb-6">Upload your verification documents. All files are securely encrypted.</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <UploadCard
                      label="Medical License"
                      desc="PDF or image, max 10MB"
                      currentFile={files.medicalLicense}
                      onFileSelect={(file) => {
                        setFiles({
                          ...files,
                          medicalLicense: file,
                        });
                      }}
                    />
                    <UploadCard
                      label="Government ID"
                      desc="Aadhaar, PAN, or Passport"
                      currentFile={files.governmentId}
                      onFileSelect={(file) => {
                        setFiles({
                          ...files,
                          governmentId: file,
                        });
                      }}
                    />
                    <UploadCard
                      label="Degree Certificate"
                      desc="MBBS / MD / MS certificate"
                      currentFile={files.degreeCertificate}
                      onFileSelect={(file) => {
                        setFiles({
                          ...files,
                          degreeCertificate: file,
                        });
                      }}
                    />
                    <UploadCard
                      label="Clinic Registration"
                      desc="Registration proof"
                      currentFile={files.clinicRegistration}
                      onFileSelect={(file) => {
                        setFiles({
                          ...files,
                          clinicRegistration: file,
                        });
                      }}
                    />
                  </div>
                  <div className="mt-5 rounded-xl border border-primary/20 bg-primary-50/50 p-4 flex items-start gap-3">
                    <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                    <div>
                      <p className="text-xs font-semibold text-primary">Your documents are secure</p>
                      <p className="text-[11px] text-primary/70">All uploads are encrypted and stored securely. They are only used for verification purposes.</p>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">Account Setup</h3>
                  <p className="text-xs text-text-muted mb-6">Create your login credentials</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Min 8 characters"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Confirm Password"
                      type="password"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mt-6 space-y-3">
                    {[
                      { text: "I agree to the Terms & Conditions and Privacy Policy", required: true },
                      { text: "I confirm that all information provided is accurate", required: true },
                      { text: "I'd like to receive updates about new features and tips", required: false },
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" className="mt-0.5 rounded accent-primary" />
                        <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">
                          {item.text}{item.required && <span className="text-accent-red ml-0.5">*</span>}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-border-light pt-6">
            <button onClick={prev} disabled={step === 0} className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:bg-bg-alt disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
              ← Back
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-text-muted hidden sm:inline">Step {step + 1} of {steps.length}</span>
              {step < steps.length - 1 ? (
                <button onClick={next} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-lg active:scale-[0.98] cursor-pointer">
                  Continue →
                </button>
              ) : (
                <button onClick={handleSubmit} className="rounded-xl bg-accent-green px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-green/25 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer">
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
