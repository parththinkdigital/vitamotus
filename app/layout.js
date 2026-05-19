"use client";

import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDebug = pathname?.startsWith("/debug");
  const isAnatomy = pathname?.startsWith("/anatomy");
  const isAdmin = pathname?.startsWith("/admin");

  if (isDebug || isAdmin) {
    return (
      <html lang="en" className="h-full antialiased">
        <body className="h-full bg-parchment text-ink">
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-parchment text-ink selection:bg-moss selection:text-parchment">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          {!isAnatomy && <Footer />}
        </SmoothScroll>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
