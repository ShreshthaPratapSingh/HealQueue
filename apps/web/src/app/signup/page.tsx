"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [buttonContent, setButtonContent] = useState("Create Account")
    const router = useRouter();

    const buttonCSS = "w-full rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] cursor-pointer"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            setButtonContent("Processing...");
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })
    
            const data = await response.json();
            if(response.ok){
                console.log("Singup successfull!");
                router.push("/login")
            }
            else{
                console.log(data.message);
                setButtonContent("Create Account")
            }

        }
        catch(err){
            console.log("failed");
        }
        
    };

    const inputClass =
        "w-full rounded-xl border border-border bg-bg-alt py-3.5 pr-4 pl-11 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10";

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-bg-alt px-4 py-12">
            {/* Background decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-primary/4 blur-3xl" />
                <div className="absolute bottom-0 -left-40 h-125 w-125 rounded-full bg-primary/3 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.012]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, #3B82F6 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <Link href="/" className="inline-flex items-center gap-2.5 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-dark shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2L13.09 8.26L18 6L15.74 10.91L22 12L15.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L8.26 13.09L2 12L8.26 10.91L6 6L10.91 8.26L12 2Z"
                                    fill="white"
                                    opacity="0.3"
                                />
                                <path
                                    d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-text-primary">
                            Heal<span className="text-primary">Queue</span>
                        </span>
                    </Link>
                    <p className="mt-3 text-sm text-text-secondary">
                        Create your account to get started.
                    </p>
                </motion.div>

                {/* Signup Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="rounded-2xl border border-border-light bg-white p-8 shadow-xl shadow-black/3"
                >
                    <form onSubmit={handleSubmit} className="space-y-5" id="signup-form">
                        {/* First Name + Last Name */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label
                                    htmlFor="signup-firstname"
                                    className="mb-2 block text-sm font-semibold text-text-primary"
                                >
                                    First Name
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <svg
                                            className="h-4.5 w-4.5 text-text-muted"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="signup-firstname"
                                        type="text"
                                        required
                                        value={form.firstName}
                                        onChange={(e) =>
                                            setForm({ ...form, firstName: e.target.value })
                                        }
                                        placeholder="First+Middle name"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="signup-lastname"
                                    className="mb-2 block text-sm font-semibold text-text-primary"
                                >
                                    Last Name
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <svg
                                            className="h-4.5 w-4.5 text-text-muted"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="signup-lastname"
                                        type="text"
                                        required
                                        value={form.lastName}
                                        onChange={(e) =>
                                            setForm({ ...form, lastName: e.target.value })
                                        }
                                        placeholder="Last name"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label
                                htmlFor="signup-phone"
                                className="mb-2 block text-sm font-semibold text-text-primary"
                            >
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg
                                        className="h-4.5 w-4.5 text-text-muted"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="signup-phone"
                                    type="tel"
                                    required
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({ ...form, phone: e.target.value })
                                    }
                                    placeholder="+91 98765 43210"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="signup-email"
                                className="mb-2 block text-sm font-semibold text-text-primary"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg
                                        className="h-4.5 w-4.5 text-text-muted"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="signup-email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({ ...form, email: e.target.value })
                                    }
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="signup-password"
                                className="mb-2 block text-sm font-semibold text-text-primary"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg
                                        className="h-4.5 w-4.5 text-text-muted"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="signup-password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-border bg-bg-alt py-3.5 pr-11 pl-11 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg
                                            className="h-4.5 w-4.5 text-text-muted hover:text-text-secondary transition-colors"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-4.5 w-4.5 text-text-muted hover:text-text-secondary transition-colors"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2">
                            <input
                                id="accept-terms"
                                type="checkbox"
                                required
                                className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary cursor-pointer"
                            />
                            <label
                                htmlFor="accept-terms"
                                className="text-sm text-text-secondary cursor-pointer select-none leading-snug"
                            >
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="font-medium text-primary hover:text-primary-dark transition-colors"
                                >
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    className="font-medium text-primary hover:text-primary-dark transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className={buttonCSS}
                            id="signup-submit"
                        >
                            {buttonContent}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border-light" />
                        <span className="text-xs font-medium text-text-muted">or</span>
                        <div className="h-px flex-1 bg-border-light" />
                    </div>

                    {/* Google Auth */}
                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-semibold text-text-primary transition-all duration-200 hover:bg-bg-alt hover:border-primary/20 hover:shadow-md cursor-pointer"
                        id="signup-google"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Sign up with Google
                    </button>
                </motion.div>

                {/* Login link */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 text-center text-sm text-text-secondary"
                >
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                        Sign in
                    </Link>
                </motion.p>
            </div>
        </div>
    );
}
