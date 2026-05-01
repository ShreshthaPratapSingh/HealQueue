import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HealQueue — Real-Time Doctor Queue Management",
  description:
    "Book smarter. Wait less. HealQueue is a real-time doctor appointment and queue management system designed to reduce waiting time, improve clinic efficiency, and provide transparency to patients.",
  keywords: [
    "healthcare",
    "queue management",
    "doctor appointment",
    "clinic",
    "real-time",
    "HealQueue",
  ],
  openGraph: {
    title: "HealQueue — Real-Time Doctor Queue Management",
    description:
      "Book smarter. Wait less. Experience healthcare without uncertainty.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
