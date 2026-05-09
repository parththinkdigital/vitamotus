"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#1c1c1c] relative rounded-[4rem] p-16 md:p-32 overflow-hidden text-center flex flex-col items-center gap-16 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)]"
      >
        {/* Abstract Background Elements - High-End Depth */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-moss/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-clay/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] pointer-events-none" />
        
        {/* Technical Silk Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] web-pattern pointer-events-none" />

        <div className="space-y-10 max-w-4xl relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-moss/60 mb-4 block">Archive Expansion Program</span>
          <h2 className="text-6xl md:text-[5.5rem] font-serif text-parchment leading-[0.95] tracking-tighter">
            Join the journey into the <br />
            <span className="italic font-light text-parchment/60 serif-italics underline decoration-moss/20 underline-offset-[20px]">Arachnid Kingdom.</span>
          </h2>
          <p className="text-parchment/40 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto tracking-tight">
            Become part of a global research community documenting arachnid biodiversity. Access exclusive field guides and real-time biometric data.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 relative z-10">
          <button className="px-16 py-7 bg-parchment text-ink rounded-2xl font-bold text-lg hover:bg-moss hover:text-parchment transition-all duration-500 cursor-pointer shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] active:scale-95">
            Start Exploring
          </button>
          <button className="px-16 py-7 border border-parchment/10 text-parchment rounded-2xl font-bold text-lg hover:bg-parchment hover:text-ink transition-all duration-500 cursor-pointer active:scale-95">
            Join Community
          </button>
        </div>

        <div className="pt-20 flex flex-wrap items-center justify-center gap-16 relative z-10 border-t border-parchment/5 w-full max-w-4xl">
           {[
             { label: "Archived Families", val: "138" },
             { label: "Specimen Records", val: "49k+" },
             { label: "Global Researchers", val: "12k+" }
           ].map((stat, i) => (
             <div key={stat.label} className="flex flex-col items-center gap-3">
                <span className="text-5xl font-serif text-parchment tracking-tighter">{stat.val}</span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-parchment/20 font-bold">{stat.label}</span>
             </div>
           ))}
        </div>
      </motion.div>
    </div>
  );
}
