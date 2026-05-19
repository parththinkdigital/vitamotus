"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CardSwap, { Card } from "./CardSwap";

const GALLERY_SPECIMENS = [
  { 
    id: "VM-0017", 
    name: "Argiope bruennichi", 
    common: "Wasp Spider", 
    family: "Araneidae", 
    img: "/hero-img/spider-img-01.jpg", 
    desc: "A striking orb-weaver known for its yellow and black abdominal stripes, mimicry designed to deter avian predators." 
  },
  { 
    id: "VM-0042", 
    name: "Nephila clavipes", 
    common: "Golden Silk Orb-Weaver", 
    family: "Nephilidae", 
    img: "/hero-img/spider-img-02.jpg", 
    desc: "Produces silk of incredible strength and a unique golden hue, creating webs that can span several meters." 
  },
  { 
    id: "VM-0093", 
    name: "Theraphosa blondi", 
    common: "Goliath Birdeater", 
    family: "Theraphosidae", 
    img: "/hero-img/spider-img-03.jpg", 
    desc: "The world's largest spider by mass and size, this terrestrial tarantula is a master of the forest floor." 
  },
  { 
    id: "VM-0128", 
    name: "Maratus volans", 
    common: "Peacock Spider", 
    family: "Salticidae", 
    img: "/hero-img/spider-img-04.jpg", 
    desc: "A miniature marvel known for its vivid colors and complex rhythmic courtship displays." 
  },
  { 
    id: "VM-0201", 
    name: "Phoneutria nigriventer", 
    common: "Brazilian Wandering", 
    family: "Ctenidae", 
    img: "/hero-img/spider-img-05.jpg", 
    desc: "Highly defensive and active at night, this specimen is studied for its unique neurotoxic venom profiles." 
  },
];

export default function SpecimenGallery() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  return (
    <section className="w-full py-40 bg-parchment relative overflow-hidden border-t border-ink/5">
      {/* Background Decorative Element */}
      <div className="absolute top-20 left-10 -rotate-90 origin-top-left pointer-events-none opacity-[0.03] select-none">
        <span className="text-[10vw] font-serif font-black text-ink whitespace-nowrap leading-none uppercase">
          Vitamotus Archive
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col lg:flex-row items-center gap-20 relative z-10">
        
        {/* Left Side: Specimen Details */}
        <div className="w-full lg:w-1/2 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.8em] text-moss block">Visual Catalog</span>
              <div className="h-[1px] w-12 bg-moss/20" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif text-ink italic leading-tight tracking-tight">
              Digital <span className="not-italic text-ink/20">Specimen</span> Gallery.
            </h2>
          </div>

          <div className="relative min-h-[350px] pl-8 border-l border-moss/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCardIndex}
                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="space-y-10"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-moss">
                      REF_{GALLERY_SPECIMENS[activeCardIndex].id}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-moss/20" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/30">
                      Family: {GALLERY_SPECIMENS[activeCardIndex].family}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-serif text-ink italic tracking-tight leading-none">
                    {GALLERY_SPECIMENS[activeCardIndex].name}
                  </h3>
                  
                  <p className="text-[12px] font-bold uppercase tracking-[0.5em] text-moss">
                    {GALLERY_SPECIMENS[activeCardIndex].common}
                  </p>
                </div>

                <p className="text-xl text-ink/60 font-serif leading-relaxed max-w-lg italic">
                  "{GALLERY_SPECIMENS[activeCardIndex].desc}"
                </p>

                <div className="flex gap-6 pt-4">
                  <button className="px-10 py-5 bg-ink text-parchment rounded-2xl font-bold transition-all duration-500 hover:bg-moss shadow-xl hover:shadow-2xl active:scale-95">
                    <span className="uppercase tracking-[0.3em] text-[10px]">View Full Specimen</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: The Clean Card Stack */}
        <div className="w-full lg:w-1/2 relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-moss/5 via-transparent to-moss/5 blur-[100px] rounded-full pointer-events-none opacity-40" />
          
          <div className="relative w-full h-full max-w-[450px]">
            <CardSwap
              activeIndex={activeCardIndex}
              width={380}
              height={500}
              delay={5000}
              onSwap={(idx) => setActiveCardIndex(idx)}
            >
              {GALLERY_SPECIMENS.map((specimen, i) => (
                <Card 
                  key={specimen.id} 
                  onClick={() => setActiveCardIndex(i)}
                  className="cursor-pointer"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={specimen.img}
                      alt={specimen.name}
                      fill
                      className="object-cover"
                      priority={i < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                    
                    {/* Content on the card */}
                    <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-2">
                       <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-white/50">{specimen.id}</span>
                       <h4 className="text-2xl font-serif text-white italic tracking-tighter">{specimen.name}</h4>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

      </div>
    </section>
  );
}
