"use client";

import { motion } from "framer-motion";

const TAXONOMY_CHIPS = [
  "Order Araneae", "Family Lycosidae", "Family Salticidae", "Family Theraphosidae", "Genus Heteropoda", "Genus Nephila"
];

export default function SearchSection() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-16 py-4">
      {/* Search Input */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex-1 relative w-full group"
      >
        <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-ink/20 group-focus-within:text-moss transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="Search species, genera, families..."
          className="w-full bg-parchment/40 backdrop-blur-xl border border-white/20 rounded-[1.25rem] py-7 pl-16 pr-8 text-lg text-ink placeholder:text-ink/20 focus:outline-none focus:border-moss/30 focus:ring-[12px] focus:ring-moss/5 transition-all duration-700 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)]"
        />
        <div className="absolute right-4 inset-y-4 flex items-center">
            <div className="h-full w-[1px] bg-ink/5 mr-4" />
            <span className="text-[10px] font-mono text-moss/40 tracking-tighter mr-2 uppercase select-none font-bold">Press Enter</span>
        </div>
      </motion.div>

      {/* Taxonomy Chips */}
      <div className="flex-1 flex flex-col gap-6 w-full">
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-ink/30 shrink-0">Quick Access Archive</span>
          <div className="h-[1px] flex-grow bg-ink/5" />
        </div>
        <div className="flex flex-wrap gap-2.5">
          {TAXONOMY_CHIPS.map((chip, i) => (
            <motion.button
              key={chip}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.6 }}
              viewport={{ once: true }}
              className="px-5 py-2.5 bg-fern/40 backdrop-blur-md border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] text-ink/60 hover:border-moss/40 hover:text-moss hover:bg-white hover:shadow-lg hover:shadow-moss/5 transition-all duration-500 cursor-pointer"
            >
              {chip}
            </motion.button>
          ))}
          <button className="px-5 py-2.5 text-moss text-[9px] font-bold uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all duration-500 flex items-center gap-2 group cursor-pointer">
             Browse Complete Index
             <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
