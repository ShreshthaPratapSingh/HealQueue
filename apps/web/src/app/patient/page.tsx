"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function PatientPage() {
  const { loading } = useAuth("PATIENT");
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace("/patient/doctors");
    }
  }, [loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-alt">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return null;
}
