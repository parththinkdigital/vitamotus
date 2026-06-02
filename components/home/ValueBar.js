"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Focused on the Western Ghats",
    desc: "Documenting the unique spider diversity of one of the world's biodiversity hotspots."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    title: "High-quality Records",
    desc: "Curated images, reliable data, and referenced information."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    title: "Educational & Non-commercial",
    desc: "An educational initiative for learning, research, and conservation."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: "Global Perspective",
    desc: "Connecting spider natural history across regions and ecosystems."
  }
];

export default function ValueBar() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".value-card", { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(".value-tagline", { opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        });

        tl.from(".value-card", { y: 40, opacity: 0, filter: "blur(4px)", stagger: 0.12, duration: 0.7, ease: "power3.out" })
          .from(".value-tagline", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-b from-[#1c1c1c] to-[#141414] text-parchment overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-24 md:py-32">
        
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[1px] w-16 bg-white/8" />
          <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-parchment/15">Core Principles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
          {VALUES.map((value, i) => (
            <div key={value.title} className="value-card group relative">
              {/* Subtle connecting line */}
              {i < VALUES.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-8 w-8 h-[1px] bg-white/5" />
              )}
              
              <div className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-parchment/30 group-hover:text-moss group-hover:bg-white/5 group-hover:border-moss/20 transition-all duration-500">
                  {value.icon}
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-parchment/60 leading-snug group-hover:text-parchment transition-colors duration-500">
                    {value.title}
                  </h4>
                  <p className="text-sm text-parchment/20 leading-relaxed font-serif italic group-hover:text-parchment/30 transition-colors duration-500">
                    {value.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="value-tagline mt-24 pt-12 border-t border-white/5 flex flex-col items-center gap-6">
          <div className="flex items-center gap-6 text-[8px] font-bold uppercase tracking-[0.6em] text-parchment/10 select-none">
            <div className="h-[1px] w-12 bg-white/5" />
            Observe. Understand. Value. Protect.
            <div className="h-[1px] w-12 bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}