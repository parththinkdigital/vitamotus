"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Lottie from "lottie-react";

// Assets
import spiderFall from "@/public/lottiee/spiderfall.json";

// Components
import Hero from "./Hero";
import CTA from "./CTA";
import SpiderCanvas from "./SpiderCanvas";
import FeatureGrid from "./FeatureGrid";
import SearchSection from "./SearchSection";
import ValueBar from "./ValueBar";
import SpeciesOfTheDay from "./SpeciesOfTheDay";
import SpecimenGallery from "./SpecimenGallery";

gsap.registerPlugin(ScrollTrigger);

/**
 * Chapter Heading Component (Clean & Minimalist)
 */
const ChapterHeading = ({ title, subtitle, light = false }) => (
  <div className="space-y-6 chapter-header">
    <div className="flex items-center gap-4">
      <div
        className={`h-[1px] w-12 ${light ? "bg-parchment/10" : "bg-ink/10"}`}
      />
    </div>

    <h2
      className={`text-4xl md:text-8xl font-serif italic tracking-tighter leading-[0.9] chapter-title ${light ? "text-parchment" : "text-ink"}`}
    >
      {title}
    </h2>

    {subtitle && (
      <p
        className={`text-lg md:text-xl font-serif max-w-lg chapter-subtitle ${light ? "text-parchment/50" : "text-ink/40"}`}
      >
        {subtitle}
      </p>
    )}
  </div>
);

/**
 * Data Point Component (Minimalist)
 */
const DataPoint = ({ label, value, light = false }) => (
  <div className="flex flex-col gap-1">
    <span
      className={`text-[9px] font-bold uppercase tracking-widest mb-1 text-moss/40`}
    >
      {label}
    </span>
    <span
      className={`text-4xl font-serif tracking-tighter ${light ? "text-parchment" : "text-ink"}`}
    >
      {value}
    </span>
  </div>
);

export default function HomeView() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useGSAP(
    () => {
      // ─── CHAPTER REVEALS ───
      const sections = gsap.utils.toArray("section[data-chapter]");

      sections.forEach((section) => {
        const header = section.querySelector(".chapter-header");
        const content = section.querySelectorAll(".reveal-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        if (header) {
          tl.from(header.children, {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "expo.out",
          });
        }

        if (content.length > 0) {
          tl.from(
            content,
            {
              y: 40,
              opacity: 0,
              stagger: 0.15,
              duration: 1.2,
              ease: "expo.out",
            },
            "-=0.6",
          );
        }
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col bg-parchment overflow-x-hidden selection:bg-moss/20"
    >
      {/* ─── GLOBAL PROGRESS TRACKER ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-moss origin-left z-[100]"
        style={{ scaleX }}
      />

      <main className="relative z-10 w-full flex flex-col items-center">
        <section className="w-full">
          <Hero />
        </section>

        {/* ═══ CHAPTER I: VITA ═══ */}
        <section
          data-chapter="1"
          className="relative w-full py-20 md:py-40 border-t border-ink/5 overflow-hidden"
        >
          {/* ─── FIELD JOURNAL TEXTURES & WEB BG ─── */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            {/* Organic Web Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/assets/web/web-01.png.png" 
                alt="Web Pattern" 
                className="w-full h-full object-cover opacity-[0.08] mix-blend-multiply md:scale-110"
              />
            </div>

            {/* Subtle Dot Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
            
            {/* Organic Biological Patterns (Corner Sketched Web/Cells) */}
            <div className="absolute -top-24 -left-24 w-96 h-96 border border-ink/[0.03] rounded-full [mask-image:linear-gradient(to_bottom_right,black,transparent)]" />
            <div className="absolute -bottom-48 -right-48 w-[40rem] h-[40rem] border border-ink/[0.02] rounded-full [mask-image:linear-gradient(to_top_left,black,transparent)]" />
            
            {/* Scientific Watermarks */}
            <div className="absolute top-20 right-20 flex flex-col items-end opacity-20">
              <span className="text-[8px] font-mono tracking-[0.4em] uppercase">Ref_Log // 300.21</span>
              <div className="w-12 h-[1px] bg-ink/10 mt-2" />
            </div>

            {/* Faint 'Cell' Overlays */}
            <svg className="absolute top-1/2 left-10 w-64 h-64 opacity-[0.03] -translate-y-1/2" viewBox="0 0 100 100">
              <path d="M50 10 Q 70 10 80 30 T 90 50 T 70 90 T 30 90 T 10 50 T 20 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.2" />
              <path d="M50 35 L 50 65 M35 50 L 65 50" stroke="currentColor" strokeWidth="0.2" />
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7 space-y-20 reveal-content">
              <ChapterHeading
                title="Vita."
                subtitle="The biological blueprint of the arachnid world."
              />
              <div className="space-y-10">
                <h3 className="text-4xl md:text-5xl font-serif text-ink italic leading-tight">
                  "Life is an intricate masterclass in biological innovation."
                </h3>
                <p className="text-xl text-ink/40 font-medium leading-relaxed max-w-xl">
                  Our archive documents over 4,900 specimens, each a unique
                  expression of resilience and evolution spanning 300 million
                  years.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "Morphology",
                    "Venom Profiles",
                    "Silk Engineering",
                    "Evolutionary Tracking",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-5 py-2.5 border border-ink/10 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-ink/30 hover:text-moss hover:border-moss transition-all duration-500 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 reveal-content flex flex-col justify-center border-l border-ink/5 lg:pl-20 relative">
              {/* Drifting Spider Fall Animation */}
              <div className="absolute -top-120 -right-150 w-300 h-300 pointer-events-none opacity-90">
                <Lottie
                  animationData={spiderFall}
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <div className="space-y-10 relative z-10">
                <DataPoint label="Cataloged Families" value="138" />
                <DataPoint label="Unique Specimens" value="4.9k+" />
                <DataPoint label="Genetic Strings" value="2.1k" />
              </div>
            </div>
          </div>
        </section>


        {/* ═══ CHAPTER II: MOTUS_REBORN ═══ */}
        <section
          data-chapter="2"
          className="relative w-full h-screen overflow-hidden bg-[#050816] text-[#f4f1ea] flex items-center justify-center"
        >
          {/* ─── CINEMATIC ENVIRONMENT ─── */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Deep Space / Neural Web Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a0f24_0%,#050816_100%)]" />
            
            {/* Interactive Grid System */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(244,241,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,234,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent:80%)]" />

            {/* 3D Model Integration (Hidden on mobile for performance) */}
            <div className="absolute inset-0 scale-110 lg:scale-100 hidden md:block">
              <SpiderCanvas
                cameraPosition={[0, 2, 8]}
                cameraTarget={[0, 0, 0]}
                autoRotate={0.4}
                isInteractive={false}
                modelPosition={[0, -0.8, 0]}
              />
            </div>

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,22,0.4)_60%,#050816_100%)] pointer-events-none" />

            {/* Aurora / Neural Glare (Cream/Parchment style) */}
            <motion.div
              animate={{ 
                opacity: [0.05, 0.1, 0.05],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-parchment/10 blur-[160px] pointer-events-none"
            />
            
            <motion.div
              animate={{ 
                opacity: [0.03, 0.08, 0.03],
                scale: [1.2, 1, 1.2],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-parchment/5 blur-[140px] pointer-events-none"
            />
          </div>

          {/* ─── HUD OVERLAY CONTENT ─── */}
          <div className="relative z-10 w-full h-full max-w-[1800px] mx-auto px-10 md:px-20 flex flex-col justify-between py-24 pointer-events-none">
            
            {/* TOP BAR: Research Metadata */}
            <div className="flex justify-between items-start w-full">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-[1px] bg-parchment/30" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-parchment/60">Protocol II: Motus</span>
                </div>
                <h2 className="text-6xl md:text-9xl font-serif italic leading-[0.85] text-white/90 drop-shadow-2xl">
                  Motus<span className="text-parchment/20">.</span>
                </h2>
                <p className="max-w-sm text-white/40 text-sm font-medium leading-relaxed mt-6 italic">
                  Synthetic biomechanics: Reconstructing evolutionary intelligence through motion architecture.
                </p>
              </motion.div>

              <div className="hidden xl:flex flex-col items-end gap-6 pt-4">
                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-1">Subject Status</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-parchment/80">ACTIVE_SIMULATION</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-parchment/60 animate-pulse" />
                  </div>
                </div>
                <div className="h-20 w-[1px] bg-white/10" />
                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-1">Neural Sync</div>
                  <div className="text-xs font-mono text-white/70">98.42%</div>
                </div>
              </div>
            </div>

            {/* MIDDLE SECTION: Floating Data Points */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Dynamic Scanner HUD (Responsive sizing) */}
              <div className="relative w-[18rem] h-[18rem] md:w-[45rem] md:h-[45rem] flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-white/5 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 md:inset-16 border border-parchment/5 rounded-full border-dashed"
                />
                
                {/* Orbital Metrics */}
                {[
                  { label: "Hydraulics", val: "842 PSI", pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
                  { label: "Latency", val: "0.04 ms", pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
                  { label: "Throughput", val: "08.21 Tb/s", pos: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" },
                  { label: "Stability", val: "99.9%", pos: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2" }
                ].map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`absolute ${m.pos} bg-[#050816]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex flex-col items-center gap-1 shadow-2xl`}
                  >
                    <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-white/30">{m.label}</span>
                    <span className="text-[10px] md:text-xs font-mono text-parchment/60">{m.val}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* BOTTOM SECTION: Navigation & Summary */}
            <div className="w-full flex flex-col lg:flex-row items-end lg:items-center justify-between gap-12 pointer-events-auto">
              
              {/* Feature Cards: High-end research style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full lg:max-w-4xl">
                {[
                  { title: "Kinetic Mapping", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { title: "Sensory Mesh", icon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" },
                  { title: "Neural Reflex", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * i }}
                    className="group relative overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-xl p-6 rounded-2xl hover:border-parchment/30 transition-all duration-500"
                  >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-parchment/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 rounded-lg bg-parchment/5 group-hover:bg-parchment/10 transition-colors">
                        <svg className="w-4 h-4 text-parchment/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={card.icon} />
                        </svg>
                      </div>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">{card.title}</h3>
                    </div>
                    <p className="text-[11px] text-white/30 font-serif italic leading-relaxed">
                      Reconstructing predatory sequence through kinetic simulation.
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Enter Button */}
              <div className="flex flex-col items-center lg:items-end gap-6 shrink-0">
                <p className="hidden xl:block text-right text-xs font-serif italic text-white/30 max-w-[200px]">
                  "Motion is not animation. It is evidence of engineered survival."
                </p>
                <Link
                  href="/anatomy"
                  className="group relative flex items-center gap-8 bg-parchment text-[#050816] px-10 py-5 rounded-full font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white transition-all duration-500 overflow-hidden shadow-[0_0_40px_rgba(244,241,234,0.15)]"
                >
                  <span className="relative z-10">Access Motion Archive</span>
                  <div className="relative z-10 w-10 h-[1px] bg-[#050816]/30 group-hover:w-14 group-hover:bg-[#050816] transition-all duration-500" />
                  
                  {/* Hover Glare Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                  />
                </Link>
              </div>
            </div>

          </div>
        </section>


        {/* ═══ CHAPTER III ═══ */}
        <section
          data-chapter="3"
          className="w-full py-20 md:py-40 border-b border-ink/5"
        >
          <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-center">
            <div className="text-center mb-24">
              <ChapterHeading
                title="Spotlight."
                subtitle="The specimen of the day."
              />
            </div>
            <div className="w-full max-w-6xl min-h-[400px] reveal-content">
              <SpeciesOfTheDay isHorizontal={true} />
            </div>
          </div>
        </section>

        {/* ═══ CHAPTER IV ═══ */}
        <section data-chapter="4" className="w-full py-20 md:py-40 bg-ink/5">
          <div className="max-w-7xl mx-auto px-8 md:px-16 mb-20">
            <ChapterHeading
              title="Gallery."
              subtitle="A high-fidelity visual database."
            />
          </div>
          <div className="reveal-content">
            <SpecimenGallery />
          </div>
        </section>

        {/* ═══ CHAPTER V ═══ */}
        <section data-chapter="5" className="w-full py-24 md:py-60">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="text-center mb-32 flex flex-col items-center">
              <ChapterHeading
                title="Synthesis."
                subtitle="The intersection of life and motion."
              />
            </div>
            <div className="reveal-content">
              <FeatureGrid isFourColumn={true} />
            </div>
            <div className="mt-60 reveal-content">
              <SearchSection />
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-ink/5">
          <CTA />
        </section>

        <ValueBar />
      </main>
    </div>
  );
}
