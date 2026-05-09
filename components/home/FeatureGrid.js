"use client";

import { motion } from "framer-motion";

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

export default function FeatureGrid({ isFourColumn = false }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10`}>
      {FEATURES.map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="group relative bg-white/40 backdrop-blur-2xl border border-white rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-700 flex flex-col cursor-pointer"
        >
          {/* Decorative Technical Motif */}
          <div className="absolute top-8 right-8 flex flex-col items-end opacity-20 group-hover:opacity-50 transition-opacity">
              <span className="text-[9px] font-mono tracking-tighter text-moss uppercase italic">Module 0{i + 1}</span>
              <div className="w-12 h-[1px] bg-moss mt-1" />
          </div>

          {/* Header */}
          <div className="p-10 pb-6 flex flex-col gap-6">
             <div className="w-14 h-14 rounded-2xl bg-parchment/80 border border-ink/5 flex items-center justify-center text-ink group-hover:bg-moss group-hover:text-parchment transition-all duration-700 shadow-sm">
                {feature.icon}
             </div>
             <h3 className="text-3xl font-serif text-ink tracking-tight leading-none italic">{feature.title}</h3>
          </div>

          {/* Description */}
          <div className="px-10 pb-8">
             <p className="text-[15px] text-ink/60 leading-relaxed font-medium">
               {feature.desc}
             </p>
          </div>

          {/* Image */}
          <div className="relative h-60 overflow-hidden mx-6 rounded-[2rem] mb-10">
            <img 
              src={feature.imageUrl} 
              alt={feature.title}
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
            />
            {/* Scientific Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
          </div>

          {/* Footer CTA */}
          <div className="px-10 pb-10 mt-auto flex justify-between items-center border-t border-ink/5 pt-10">
            <button className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40 group-hover:text-moss transition-all duration-500 flex items-center gap-4 cursor-pointer">
               {feature.cta} 
               <div className="w-6 h-[1px] bg-ink/10 group-hover:w-10 group-hover:bg-moss transition-all duration-500" />
               <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
