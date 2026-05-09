"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Families", href: "/families" },
  { name: "Genera", href: "/genera" },
  { name: "Species", href: "/species" },
  { name: "Anatomy", href: "/anatomy" },
];

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-6 right-6 z-[100] pointer-events-none"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between pointer-events-auto">
        <Link href="/" className="flex flex-col group drop-shadow-[0_0_10px_#fdfaf0]">
          <span className="font-serif text-3xl text-ink tracking-tight group-hover:text-moss transition-colors duration-300">
            Vita Motus
          </span>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4 bg-ink/30" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-ink/40 font-bold italic">Life in motion</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 bg-parchment/60 backdrop-blur-xl px-8 py-3 rounded-full border border-ink/5 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[10px] font-bold text-ink/50 hover:text-moss transition-all duration-300 uppercase tracking-[0.2em] relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-moss transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          <div className="h-4 w-[1px] bg-ink/10" />
          
          <div className="flex items-center gap-5">
            <button className="text-ink/40 hover:text-moss transition-colors duration-300 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button className="text-ink/40 hover:text-moss transition-colors duration-300 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
