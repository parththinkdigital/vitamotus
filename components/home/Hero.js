"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpiderCanvas from "./SpiderCanvas";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Typography Animations
  const vitaX = useTransform(scrollYProgress, [0, 0.4], [0, -300]);
  const motusX = useTransform(scrollYProgress, [0, 0.4], [0, 300]);
  const vitaOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const motusOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  
  // 3D Model Scale & Position
  const spiderScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1.5, 0.8]);
  const spiderY = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 50, 0]);

  // Meaning Reveal
  const meaningOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 1, 0]);
  const meaningY = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [50, 0, -50]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[300vh] w-full bg-parchment"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Grain & Silk Lines */}
        <div className="absolute inset-0 opacity-[0.05] grain-texture pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-moss/5 to-transparent pointer-events-none" />

        {/* 1. THE NAME: VITA MOTUS */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
          <motion.h1 
            style={{ x: vitaX, opacity: vitaOpacity }}
            className="text-[10vw] md:text-[20vw] font-serif font-black text-ink leading-none tracking-tighter"
          >
            VITA
          </motion.h1>
          <motion.h1 
            style={{ x: motusX, opacity: motusOpacity }}
            className="text-[10vw] md:text-[20vw] font-serif font-black text-ink leading-none tracking-tighter"
          >
            MOTUS
          </motion.h1>
        </div>

        {/* 2. THE SPECIMEN: Central 3D Focus */}
        <motion.div 
          style={{ scale: spiderScale, y: spiderY }}
          className="relative z-20 w-full h-full max-w-5xl max-h-[80vh]"
        >
          <SpiderCanvas 
            isInteractive={false} 
            autoRotate={true}
            cameraPosition={[0, 0, 4]}
          />
        </motion.div>

        {/* 3. THE MEANING: Life in Motion Reveal */}
        <motion.div 
          style={{ opacity: meaningOpacity, y: meaningY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6 text-center"
        >
           <span className="text-moss text-[12px] font-bold uppercase tracking-[0.8em] mb-6">Etymology</span>
           <h2 className="text-6xl md:text-8xl font-serif text-ink italic leading-tight">
             Life <span className="text-moss/40 not-italic font-sans font-light px-4">in</span> Motion.
           </h2>
           <p className="mt-10 text-xl md:text-2xl text-ink/60 max-w-2xl font-medium leading-relaxed tracking-tight">
             From the Latin <span className="text-ink font-bold italic">Vita</span> (Life) and <span className="text-ink font-bold italic">Motus</span> (Motion). 
             A digital sanctuary documenting the biological vibrancy and kinetic beauty of the arachnid world.
           </p>
           
           {/* Visual Divider */}
           <div className="mt-12 w-24 h-[1px] bg-moss/30" />
        </motion.div>

        {/* 4. SCROLL INDICATOR */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40">
           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20">Begin Discovery</span>
           <motion.div 
             animate={{ y: [0, 8, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-[1px] h-12 bg-gradient-to-b from-moss/40 to-transparent"
           />
        </div>


      </div>
    </section>
  );
}
