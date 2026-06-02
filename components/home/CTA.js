"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const statsRef = useRef([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cardRef.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(".cta-stat", { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        });

        tl.from(cardRef.current, { y: 60, opacity: 0, scale: 0.97, filter: "blur(6px)", duration: 0.9, ease: "power3.out" })
          .from(".cta-label", { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
          .from(".cta-heading", { y: 24, opacity: 0, filter: "blur(4px)", duration: 0.7, ease: "power3.out" }, "-=0.3")
          .from(".cta-description", { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
          .from(".cta-button", { y: 20, opacity: 0, scale: 0.97, stagger: 0.08, duration: 0.5, ease: "power3.out" }, "-=0.2")
          .from(".cta-stat", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }, "-=0.2");

        const statValues = [
          { el: statsRef.current[0], end: 138, suffix: "" },
          { el: statsRef.current[1], end: 49, suffix: "k+" },
          { el: statsRef.current[2], end: 12, suffix: "k+" },
        ];

        statValues.forEach(({ el, end, suffix }) => {
          if (!el) return;
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: end,
            scrollTrigger: { trigger: el.parentElement, start: "top 90%", toggleActions: "play none none reverse" },
            duration: 1.5, ease: "power2.out",
            onUpdate: () => { el.textContent = Math.round(proxy.val) + suffix; },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="w-full overflow-hidden">
      <div ref={cardRef} className="relative bg-gradient-to-b from-[#1c1c1c] to-[#161616] rounded-none md:rounded-[3rem] overflow-hidden text-center flex flex-col items-center gap-12 px-8 py-24 md:p-32 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
        
        {/* Layered glows */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-moss/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-clay/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-parchment/3 rounded-full blur-[100px] pointer-events-none" />

        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/5 pointer-events-none" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-white/5 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-white/5 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/5 pointer-events-none" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <span className="cta-label inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.5em] text-moss/50">
            <span className="w-8 h-[1px] bg-moss/20" />
            Archive Expansion
            <span className="w-8 h-[1px] bg-moss/20" />
          </span>
          <h2 className="cta-heading text-5xl md:text-7xl font-serif text-parchment leading-[0.95] tracking-tight">
            Join the journey into the<br />
            <span className="italic font-light text-parchment/50">Arachnid Kingdom.</span>
          </h2>
          <p className="cta-description text-parchment/30 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            Become part of a global research community documenting arachnid biodiversity. Access exclusive field guides and real-time biometric data.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
          <button className="cta-button group relative px-10 py-5 bg-parchment text-ink rounded-xl font-bold text-sm tracking-wide hover:bg-white transition-all duration-300 active:scale-[0.97] cursor-pointer overflow-hidden shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)]">
            <span className="relative z-10">Start Exploring</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
          <button className="cta-button group relative px-10 py-5 border border-white/10 text-parchment rounded-xl font-bold text-sm tracking-wide hover:bg-white/5 transition-all duration-300 active:scale-[0.97] cursor-pointer overflow-hidden">
            <span className="relative z-10">Join Community</span>
          </button>
        </div>

        <div className="relative z-10 w-full max-w-lg pt-10 border-t border-white/5">
          <div className="flex items-center justify-center gap-12">
            {[
              { label: "Archived Families", val: "138", suffix: "" },
              { label: "Specimen Records", val: "49k+", suffix: "k+" },
              { label: "Global Researchers", val: "12k+", suffix: "k+" }
            ].map((stat) => (
              <div key={stat.label} className="cta-stat flex flex-col items-center gap-2">
                <span
                  ref={(el) => statsRef.current.push(el)}
                  className="text-4xl md:text-5xl font-serif text-parchment tracking-tight leading-none"
                >
                  {stat.val}
                </span>
                <span className="text-[7px] uppercase tracking-[0.4em] text-parchment/15 font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}