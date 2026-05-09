"use client";

import { motion } from "framer-motion";

const TAXONOMY_PATH = ["Arthropoda", "Arachnida", "Araneae", "Theraphosidae", "Poecilotheria", "P. metallica"];

export default function SpeciesOfTheDay({ isHorizontal = false }) {
  const species = {
    scientificName: "Poecilotheria metallica",
    commonName: "Gooty sapphire ornamental tarantula",
    family: "Theraphosidae",
    habitat: "Tropical dry deciduous forests",
    distribution: "Endemic to India (Andhra Pradesh, Telangana, Karnataka)",
    note: "A striking arboreal tarantula known for its metallic blue coloration and intricate patterns. Often found on tree trunks.",
    imageUrl: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=2000&auto=format&fit=crop"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-ink/5 flex flex-col jointed-border"
    >
      <div className="flex flex-col">
        {/* Image Area */}
        <div className="relative h-[300px] overflow-hidden group">
          <div className="absolute top-6 left-6 z-20 bg-amber text-parchment text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl flex items-center gap-3 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Entry of the Day
          </div>
          <img 
            src={species.imageUrl} 
            alt={species.scientificName}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        </div>

        {/* Data Area */}
        <div className="p-10 flex flex-col gap-10">
          <div className="space-y-3">
            <h3 className="text-4xl lg:text-5xl font-serif italic text-ink leading-tight tracking-tight">{species.scientificName}</h3>
            <p className="text-base font-bold text-moss tracking-wide uppercase text-[12px]">{species.commonName}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 text-sm">
            {[
              { label: "Family", value: species.family },
              { label: "Distribution", value: species.distribution },
              { label: "Habitat", value: species.habitat },
              { label: "Scientific Note", value: species.note, italic: true }
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/30">{item.label}</span>
                <span className={`text-ink/80 font-medium leading-relaxed ${item.italic ? 'italic text-ink/60 text-xs' : 'text-sm'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full py-5 border-2 border-ink/5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-ink hover:text-parchment hover:border-ink transition-all flex items-center justify-center gap-3 cursor-pointer group">
            View full profile 
            <span className="text-lg group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Taxonomy Breadcrumb Footer */}
      <div className="bg-moss/[0.05] border-t border-ink/5 px-8 py-5 flex flex-wrap gap-3">
        {TAXONOMY_PATH.map((item, i) => (
          <div key={item} className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/80 border border-ink/5 text-ink/50">
              {item}
            </span>
            {i < TAXONOMY_PATH.length - 1 && <span className="text-ink/20 text-xs">/</span>}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
