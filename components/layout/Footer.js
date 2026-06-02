"use client";

import { useState } from "react";
import Link from "next/link";
import { newsletterApi } from "@/lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await newsletterApi.subscribe(email);
      setStatus("success");
      setMessage(res.message || "Subscribed!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <footer className="w-full bg-ink text-parchment pt-24 pb-12 px-8 md:px-16 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-moss/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-parchment rounded-lg flex items-center justify-center">
              <span className="text-ink font-serif font-bold text-xl">V</span>
            </div>
            <span className="font-serif text-2xl text-parchment tracking-tight">VitaMotus.earth</span>
          </div>
          <p className="text-parchment/60 text-sm leading-relaxed max-w-xs">
            A calm, educational spider archive designed to help visitors understand the vital role of arachnids in our ecosystem.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-moss">The Database</h4>
          <ul className="space-y-3">
            {["Browse Families", "Genus Index", "Species Archive", "Recently Added"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-parchment/60 hover:text-amber transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-moss">Education</h4>
          <ul className="space-y-3">
            {["Spider Anatomy", "Taxonomy Guide", "Glossary", "Behavior Studies"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-parchment/60 hover:text-amber transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-moss">Stay Curious</h4>
          <div className="flex flex-col gap-4">
            <p className="text-xs text-parchment/40 italic">Receive weekly spider facts and archive updates.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="flex bg-parchment/10 rounded-full p-1 border border-parchment/10">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="bg-transparent px-4 py-2 text-xs w-full focus:outline-none placeholder:text-parchment/20"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-moss text-parchment px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-parchment hover:text-ink transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Join"}
                </button>
              </div>
              {status === "success" && (
                <p className="text-[10px] text-green-400/80 italic">{message}</p>
              )}
              {status === "error" && (
                <p className="text-[10px] text-red-400/80 italic">{message}</p>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-parchment/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.2em] text-parchment/30 font-bold">
        <p>© 2026 VitaMotus.earth | The Living Archive</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-parchment transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-parchment transition-colors">Terms of Use</Link>
          <Link href="#" className="hover:text-parchment transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
