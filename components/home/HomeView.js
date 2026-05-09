"use client";

import Hero from "./Hero";
import CTA from "./CTA";
import SpiderCanvas from "./SpiderCanvas";
import FeatureGrid from "./FeatureGrid";
import SearchSection from "./SearchSection";
import ValueBar from "./ValueBar";
import SpeciesOfTheDay from "./SpeciesOfTheDay";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeView() {
  return (
    <div className="relative min-h-screen flex flex-col bg-parchment overflow-hidden selection:bg-moss/20">
      {/* Global Background Elements */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply grain-texture" />
      
      <main className="relative z-10 flex w-full flex-col items-center">
        {/* CHAPTER 0: THE PROLOGUE (VITA MOTUS HERO) */}
        <section className="w-full">
          <Hero />
        </section>

        {/* CHAPTER 1: VITA (Life in Biodiversity) */}
        <section className="w-full max-w-7xl mx-auto px-8 md:px-16 py-40 border-t border-ink/5">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="space-y-12"
              >
                 <div className="space-y-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.8em] text-moss block">Chapter I</span>
                    <h2 className="text-7xl md:text-8xl font-serif text-ink italic leading-none tracking-tighter">
                       Vita.
                    </h2>
                    <div className="w-16 h-[2px] bg-moss" />
                 </div>
                 
                 <div className="space-y-8">
                    <p className="text-2xl text-ink/80 font-serif leading-relaxed">
                       Life is not merely existence; it is a complex tapestry of biological innovation. 
                       In the arachnid kingdom, life manifests as intricate architecture and survival mastery.
                    </p>
                    <p className="text-lg text-ink/60 font-medium leading-relaxed max-w-lg">
                       Our archive documents over 4,900 specimens, each a unique expression of biological resilience and natural beauty.
                    </p>
                 </div>

                 <div className="flex gap-12 pt-4">
                    <div className="flex flex-col">
                       <span className="text-4xl font-serif text-ink tracking-tighter">138</span>
                       <span className="text-[9px] font-bold uppercase tracking-widest text-moss/60">Families Recorded</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-4xl font-serif text-ink tracking-tighter">4.9k+</span>
                       <span className="text-[9px] font-bold uppercase tracking-widest text-moss/60">Specimen Files</span>
                    </div>
                 </div>
              </motion.div>

              <div className="w-full">
                 <SpeciesOfTheDay isHorizontal={false} />
              </div>
           </div>
        </section>

        {/* CHAPTER 2: MOTUS (Life in Motion / The Lab) */}
        <section className="w-full bg-ink py-40 text-parchment relative overflow-hidden">
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.05] web-pattern pointer-events-none invert" />
          
          <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1 relative h-[600px] w-full">
               <div className="absolute inset-0 border border-parchment/10 rounded-[4rem] bg-parchment/[0.02] backdrop-blur-sm" />
               <SpiderCanvas 
                 cameraPosition={[0, 1, 4]} 
                 autoRotate={true}
                 isInteractive={true}
                 modelPosition={[0, -0.2, 0]}
               />
               
               {/* Metadata Overlay */}
               <div className="absolute top-10 left-10 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-moss uppercase tracking-[0.4em]">Kinetic Analysis</span>
                  <span className="text-xl font-serif italic text-parchment">Biomechanical Movement</span>
               </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2 space-y-12"
            >
               <div className="space-y-6">
                  <span className="text-[11px] font-bold uppercase tracking-[0.8em] text-moss block">Chapter II</span>
                  <h2 className="text-7xl md:text-8xl font-serif text-parchment italic leading-none tracking-tighter">
                     Motus.
                  </h2>
                  <div className="w-16 h-[2px] bg-moss" />
               </div>

               <div className="space-y-8">
                  <p className="text-2xl text-parchment/80 font-serif leading-relaxed">
                     Motion is the definitive proof of life. Through our digital reconstruction, 
                     we observe the kinetic grace of the arachnid body.
                  </p>
                  <p className="text-lg text-parchment/40 font-medium leading-relaxed max-w-lg">
                     Every joint, every hair, and every vibration is recorded with scientific precision, 
                     allowing us to witness the mechanics of nature.
                  </p>
               </div>

               <div className="pt-8">
                  <Link
                    href="/anatomy"
                    className="inline-flex items-center gap-6 px-12 py-6 bg-parchment text-ink rounded-2xl font-bold hover:bg-moss hover:text-parchment transition-all duration-500 group"
                  >
                    <span className="uppercase tracking-[0.2em] text-[11px]">Launch Kinetic Lab</span>
                    <div className="w-8 h-[1px] bg-ink/30 group-hover:bg-parchment group-hover:w-12 transition-all duration-500" />
                  </Link>
               </div>
            </motion.div>
          </div>
        </section>

        {/* CHAPTER 3: VITA MOTUS (The Synergy / The Archive) */}
        <section className="w-full py-40 bg-parchment">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="flex flex-col items-center text-center mb-32 space-y-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.8em] text-moss">Chapter III</span>
              <h2 className="text-6xl md:text-8xl font-serif text-ink tracking-tighter leading-none">
                 The <span className="italic font-normal">Synthesis.</span>
              </h2>
              <p className="text-2xl text-ink/60 max-w-2xl font-serif">
                 The intersection of biological life and kinetic motion forms the core of the 
                 <span className="text-ink font-bold"> Vita Motus</span> archive.
              </p>
            </div>

            {/* Feature Bento Grid */}
            <FeatureGrid isFourColumn={true} />
            
            <div className="mt-40">
               <div className="flex flex-col items-center text-center mb-16 space-y-4">
                 <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-moss/40 italic">Search the Archive</span>
               </div>
               <SearchSection />
            </div>
          </div>
        </section>

        {/* THE EPILOGUE (CTA) */}
        <section className="w-full py-20">
          <CTA />
        </section>

        {/* Principles Footer */}
        <ValueBar />
      </main>

      {/* Narrative Tracking (Floating) */}
      <div className="fixed top-1/2 right-10 -translate-y-1/2 flex flex-col gap-10 items-center z-50 pointer-events-none hidden xl:flex">
         {[0, 1, 2, 3].map(i => (
           <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-[1px] h-10 bg-moss/10" />
              <div className="w-1.5 h-1.5 rounded-full border border-moss/40" />
           </div>
         ))}
      </div>
    </div>
  );
}
