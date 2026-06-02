"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Browse Families",
    desc: "Explore spider families and learn about their defining traits and diversity.",
    cta: "Explore families",
    imageUrl: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=800&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/>
      </svg>
    )
  },
  {
    title: "Spider Directory",
    desc: "Browse genera and species records with images, distributions, and references.",
    cta: "Browse directory",
    imageUrl: "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=800&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    )
  },
  {
    title: "Learn Anatomy",
    desc: "Understand the remarkable design of spider bodies and their functions.",
    cta: "Explore anatomy",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/><path d="M12 2a14.5 14.5 0 0 1 0 20"/>
      </svg>
    )
  },
  {
    title: "Learn Taxonomy",
    desc: "Dive into classification, naming, and the science behind spider diversity.",
    cta: "Explore taxonomy",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"/><path d="M9 12h6"/><path d="M12 9v6"/>
      </svg>
    )
  }
];

const GridPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="feature-grid-dots" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.5" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#feature-grid-dots)" />
  </svg>
);

export default function FeatureGrid({ isFourColumn = false }) {
  const gridRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".feature-card", { opacity: 1, y: 0, filter: "blur(0px)" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray(".feature-card");
        gsap.from(cards, {
          scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          y: 40, opacity: 0, filter: "blur(4px)", stagger: 0.1, duration: 0.7, ease: "power3.out",
        });
      });
    },
    { scope: gridRef },
  );

  return (
    <div ref={gridRef} className="relative w-full py-24 md:py-40 overflow-hidden">
      <GridPattern />
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[1px] w-16 bg-moss/25" />
          <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-moss/40">Archive Modules</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="feature-card group relative bg-white/60 backdrop-blur-xl border border-ink/5 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-1 flex flex-col cursor-pointer"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-moss/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Module badge */}
              <div className="absolute top-6 right-6 flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
                <span className="text-[7px] font-mono tracking-tight text-moss uppercase">M-0{i + 1}</span>
                <div className="w-6 h-[1px] bg-moss/30" />
              </div>

              {/* Icon + Title */}
              <div className="p-8 pb-4 flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fern/60 to-fern/30 border border-ink/5 flex items-center justify-center text-ink group-hover:bg-moss group-hover:text-parchment transition-all duration-500 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif text-ink tracking-tight leading-tight italic">{feature.title}</h3>
              </div>

              {/* Description */}
              <div className="px-8 pb-6 flex-1">
                <p className="text-sm text-ink/50 leading-relaxed font-medium">{feature.desc}</p>
              </div>

              {/* Image */}
              <div className="relative h-52 overflow-hidden mx-5 rounded-2xl mb-5">
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity" />
                <img 
                  src={feature.imageUrl} 
                  alt={feature.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>

              {/* CTA */}
              <div className="px-8 pb-8 mt-auto flex items-center justify-between border-t border-ink/5 pt-6">
                <button className="text-[9px] font-bold uppercase tracking-[0.35em] text-ink/40 group-hover:text-moss transition-all duration-300 flex items-center gap-3 cursor-pointer group/btn">
                  {feature.cta}
                  <svg className="w-3 h-3 text-ink/20 group-hover/btn:text-moss group-hover/btn:translate-x-0.5 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}