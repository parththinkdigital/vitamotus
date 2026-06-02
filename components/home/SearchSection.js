"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TAXONOMY_CHIPS = [
  "Order Araneae", "Family Lycosidae", "Family Salticidae", "Family Theraphosidae", "Genus Heteropoda", "Genus Nephila"
];

export default function SearchSection() {
  const sectionRef = useRef(null);
  const inputRef = useRef(null);
  const chipsRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([inputRef.current, ".taxonomy-chip"], { opacity: 1, y: 0, scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        });

        tl.from(inputRef.current, { y: 24, opacity: 0, filter: "blur(4px)", duration: 0.6, ease: "power3.out" })
          .from(chipsRef.current, { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
          .from(".taxonomy-chip", { y: 12, opacity: 0, scale: 0.95, stagger: 0.04, duration: 0.4, ease: "power3.out" }, "-=0.3");
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="w-full py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] w-16 bg-moss/25" />
          <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-moss/40">Search Database</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Search Input */}
          <div ref={inputRef} className="flex-1 relative w-full group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none z-10">
              <svg className="w-5 h-5 text-ink/20 group-focus-within:text-moss transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search species, genera, families..."
              className="w-full bg-white/40 backdrop-blur-xl border border-ink/5 rounded-2xl py-6 pl-14 pr-8 text-base text-ink placeholder:text-ink/20 focus:outline-none focus:border-moss/20 focus:bg-white/60 transition-all duration-500 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)]"
            />
            <div className="absolute right-4 inset-y-4 flex items-center">
              <span className="text-[8px] font-mono text-moss/30 tracking-wider uppercase font-bold px-3 py-1.5 bg-moss/5 rounded-lg border border-moss/10">
                Enter
              </span>
            </div>
          </div>

          {/* Taxonomy Chips */}
          <div ref={chipsRef} className="flex-1 flex flex-col gap-5 w-full">
            <div className="flex items-center gap-4">
              <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-ink/20 shrink-0">Quick Access</span>
              <div className="h-[1px] flex-1 bg-ink/5" />
            </div>
            <div className="flex flex-wrap gap-2">
              {TAXONOMY_CHIPS.map((chip) => (
                <button
                  key={chip}
                  className="taxonomy-chip px-4 py-2 bg-white/40 backdrop-blur-sm border border-ink/5 rounded-lg text-[8px] font-bold uppercase tracking-[0.15em] text-ink/50 hover:text-moss hover:border-moss/20 hover:bg-white/60 hover:shadow-sm transition-all duration-300 cursor-pointer"
                >
                  {chip}
                </button>
              ))}
              <button className="group px-4 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-moss/60 hover:text-moss transition-all duration-300 flex items-center gap-2 cursor-pointer">
                Browse Index
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}