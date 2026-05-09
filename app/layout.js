"use client";

import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDebug = pathname?.startsWith("/debug");
  const isAnatomy = pathname?.startsWith("/anatomy");

  if (isDebug) {
    return (
      <html lang="en" className="h-full antialiased">
        <body className="h-full bg-parchment text-ink">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-parchment text-ink selection:bg-moss selection:text-parchment">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          {!isAnatomy && <Footer />}
        </SmoothScroll>
      </body>
    </html>
  );
}
