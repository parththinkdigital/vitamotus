"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { taxonomyApi, getImageUrl } from "@/lib/api";
import Link from "next/link";

const TAXONOMY_PATH = ["Arthropoda", "Arachnida", "Araneae", "Theraphosidae", "Poecilotheria", "P. metallica"];

export default function SpeciesOfTheDay({ isHorizontal = false }) {
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await taxonomyApi.getSpeciesOfTheDay();
        setSpecies(data);
      } catch (err) {
        console.error("Failed to load spotlight specimen:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  if (loading || !species) return (
    <div className={`h-[500px] w-full bg-parchment/50 animate-pulse rounded-[3rem] border border-ink/5 flex items-center justify-center`}>
      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20">Syncing with Archive...</span>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-parchment/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden shadow-2xl border border-ink/5 flex ${isHorizontal ? 'flex-col lg:flex-row' : 'flex-col'} group`}
    >
      {/* ─── IMAGE AREA ─── */}
      <div className={`relative overflow-hidden ${isHorizontal ? 'w-full lg:w-1/2 min-h-[500px]' : 'h-[400px]'} bg-ink`}>
        <div className="absolute top-8 left-8 z-20 bg-moss text-parchment text-[10px] font-bold uppercase tracking-[0.4em] px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
          <div className="w-1.5 h-1.5 rounded-full bg-parchment animate-pulse" />
          Field Spotlight
        </div>
        
        <img 
          src={getImageUrl(species)}
          alt={species.scientific_name}
          className="w-full h-full object-cover opacity-80 transition-transform duration-[2000ms] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
        />
        
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-r from-transparent via-moss/40 to-transparent z-10"
        />

        <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-1 text-left">
           <span className="text-[9px] font-mono text-parchment/60 uppercase tracking-[0.2em]">Lens: 2.4x Zoom</span>
           <span className="text-[9px] font-mono text-parchment/60 uppercase tracking-[0.2em]">Exposure: -1.2 EV</span>
        </div>
      </div>

      {/* ─── DATA AREA ─── */}
      <div className={`p-12 lg:p-16 flex flex-col justify-between ${isHorizontal ? 'w-full lg:w-1/2' : 'w-full'}`}>
        <div className="space-y-10 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-mono font-bold text-moss tracking-[0.2em] uppercase">Archive Log_{species.wsc_species_id}</span>
               <div className="h-[1px] w-12 bg-moss/20" />
            </div>
            <h3 className="text-5xl lg:text-7xl font-serif italic text-ink leading-none tracking-tighter">
              {species.scientific_name}
            </h3>
            <p className="text-sm font-bold text-ink/40 tracking-[0.3em] uppercase">{species.common_name || 'Accepted Scientific Species'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { label: "Family", value: species.family.name },
              { label: "Distribution", value: species.distribution },
              { label: "Status", value: species.taxon_status },
            ].map((item) => (
              <div key={item.label} className="space-y-2 border-l border-moss/10 pl-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/20">{item.label}</span>
                <p className="text-sm text-ink/80 font-medium leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-ink/5">
             <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/20 block">Archivist's Note</span>
             <p className="text-lg font-serif italic text-ink/60 leading-relaxed max-w-lg">
               "{species.vitamotus_notes || "A distinctive member of the " + species.family.name + " family, cataloged by " + species.authority + " in " + species.year + "."}"
             </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <Link 
            href={`/species/${species.scientific_name.replace(/ /g, '-')}`}
            className="flex-1 py-6 bg-ink text-parchment rounded-2xl text-[10px] font-bold text-center uppercase tracking-[0.4em] hover:bg-moss transition-all duration-500 shadow-xl group"
          >
            Launch Full Analysis <span className="ml-4 inline-block transition-transform group-hover:translate-x-2">→</span>
          </Link>
          <div className="flex items-center gap-4 px-6 border border-ink/5 rounded-2xl">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-parchment bg-moss/20" />)}
             </div>
             <span className="text-[9px] font-bold text-ink/30 uppercase tracking-widest">12 Verified Scans</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
