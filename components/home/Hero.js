"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";

import spiderWalk from "@/public/lottiee/spider-walk.json";

const SPECIMENS = [
  {
    id: "VM-001",
    name: "Argiope bruennichi",
    common: "Wasp Spider",
    img: "/hero-img/spider-img-01.jpg",
  },
  {
    id: "VM-002",
    name: "Nephila clavipes",
    common: "Golden Silk Orb-Weaver",
    img: "/hero-img/spider-img-02.jpg",
  },
  {
    id: "VM-003",
    name: "Theraphosa blondi",
    common: "Goliath Birdeater",
    img: "/hero-img/spider-img-03.jpg",
  },
  {
    id: "VM-004",
    name: "Maratus volans",
    common: "Peacock Spider",
    img: "/hero-img/spider-img-05.jpg",
  },
];

export default function Hero() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /* ───── AUTO SWITCH SPECIMENS ───── */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActiveIndex((p) => (p + 1) % SPECIMENS.length);
    }, 6000);

    return () => clearInterval(t);
  }, [paused]);



  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-parchment"
    >
      {/* ───────── BACKGROUND ───────── */}
      <div className="absolute inset-0 hero-bg-layer">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={SPECIMENS[activeIndex].img}
              alt="spider specimen"
              fill
              priority
              className="object-cover grayscale contrast-[1.15] brightness-[1.05]"
            />
            <div className="absolute inset-0 bg-parchment/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-parchment/70 via-transparent to-parchment" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ───────── GRAIN OVERLAY ───────── */}
      <div className="absolute inset-0 grain-overlay opacity-5 pointer-events-none bg-[url('/assets/web/web-01.png.png')] mix-blend-multiply" />

      {/* ───────── CONTENT ───────── */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-between pt-32 pb-24">

        {/* TITLE */}
        <div>
          <h1 className="text-[12vw] lg:text-[10rem] font-serif italic leading-[0.8] text-ink tracking-tighter">
            <span className="block overflow-hidden title-line">
              <span className="block">Vita.</span>
            </span>
            <span className="block overflow-hidden title-line pl-[10vw] text-ink/30 font-black not-italic">
              <span className="block">Motus</span>
            </span>
          </h1>

          <p className="hero-desc mt-10 max-w-xl text-lg md:text-xl text-ink/50 font-serif italic border-l border-moss/20 pl-6 leading-relaxed">
            An immersive digital archive exploring the architectural elegance
            and kinetic precision of arachnid lifeforms.
          </p>
        </div>

        {/* SPECIMEN NAV */}
        <div 
          className="flex gap-10 items-end"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {SPECIMENS.map((s, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={s.id}
                onClick={() => setActiveIndex(i)}
                className="nav-item group flex flex-col items-start gap-2"
              >
                <div
                  className={`h-[1px] transition-all duration-700 ${
                    active
                      ? "w-20 bg-moss"
                      : "w-8 bg-ink/10 group-hover:bg-moss/40"
                  }`}
                />
                <div className="flex flex-col">
                  <span
                    className={`text-[10px] tracking-[0.35em] uppercase transition ${
                      active ? "text-ink" : "text-ink/25"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`text-[11px] italic font-serif transition-all duration-500 ${
                      active 
                        ? "text-moss opacity-100" 
                        : "text-ink/40 opacity-0 group-hover:opacity-60"
                    }`}
                  >
                    {s.common}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ───────── LOTTIE SPIDER (BOTTOM WALK LAYER) ───────── */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20 overflow-hidden">
        <div className="relative w-full h-[140px]">
          {/* Ground shadow/line */}
          <div className="absolute bottom-[20px] w-full h-[1px] bg-ink/5" />

          {/* Walking spider */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "900%" }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-[-10px] w-[180px]"
          >
            <Lottie
              animationData={spiderWalk}
              loop={true}
              autoplay={true}
              style={{
                width: "150%",
                height: "100%",
                filter: "contrast(1.2) brightness(0.8) grayscale(1)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}