"use client";

import { motion } from "framer-motion";

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Focused on the Western Ghats",
    desc: "Documenting the unique spider diversity of one of the world's biodiversity hotspots."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    title: "High-quality Records",
    desc: "Curated images, reliable data, and referenced information."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    title: "Educational & Non-commercial",
    desc: "An educational initiative for learning, research, and conservation."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: "Global Perspective",
    desc: "Connecting spider natural history across regions and ecosystems."
  }
];

export default function ValueBar() {
  return (
    <div className="w-full bg-[#1c1c1c] py-24 text-parchment overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16 space-y-24">
        {/* Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {VALUES.map((value, i) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-moss group-hover:bg-moss group-hover:text-parchment transition-all duration-700 shadow-sm">
                {value.icon}
              </div>
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-parchment/80 leading-snug group-hover:text-parchment transition-colors">{value.title}</h4>
                <p className="text-[13px] text-parchment/30 leading-relaxed max-w-[260px] italic font-medium">
                  {value.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tagline Footer */}
        <div className="flex flex-col items-center gap-8 pt-16 border-t border-white/5">
           <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.6em] text-parchment/20 italic select-none">
              <div className="h-[1px] w-16 bg-white/5" />
              Observe. Understand. Value. Protect.
              <div className="h-[1px] w-16 bg-white/5" />
           </div>
        </div>
      </div>
    </div>
  );
}
