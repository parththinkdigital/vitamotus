"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SpiderCanvas = dynamic(() => import("@/components/home/SpiderCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-[#fdfaf0]">
      <div className="flex items-center gap-3 text-ink/40">
        <div className="w-4 h-4 rounded-full bg-moss animate-pulse" />
        <span className="font-bold tracking-widest uppercase">
          Loading Specimen...
        </span>
      </div>
    </div>
  ),
});

const ANATOMY_STEPS = [
  {
    id: "intro",
    title: "Structural Marvel",
    desc: "Spiders are arachnids, characterized by an exoskeleton, a segmented body, and eight jointed legs. Their anatomy is a masterclass in biological engineering.",
    camera: [-0.39, 1.57, 4.12],
    target: [-1.09, 0.72, -0.13],
    customPos: { bottom: 48, left: 48 },
  },
  {
    id: "cephalothorax",
    title: "The Cephalothorax",
    desc: "The front segment contains the brain, stomach, and poison glands. It's the command center where all limbs are attached.",
    camera: [0.82, 1.11, 3.06],
    target: [-1.03, 0.76, -0.15],
    customPos: { bottom: 350, left: 48 },
  },
  {
    id: "eyes",
    title: "Sensory Array",
    desc: "Most spiders have eight eyes, though their arrangement varies by family. They can detect movement, light polarity, and in some species, form high-resolution images.",
    camera: [-0.54, 1.32, 1.42],
    target: [0.72, 0.61, 0.13],
    customPos: { bottom: 29, left: 800 },
  },
  {
    id: "legs",
    title: "Hydraulic Limbs",
    desc: "Unlike mammals, spiders use hydraulic pressure to extend their legs. This allows for incredible strength and agility relative to their size.",
    camera: [-4.28, 1.45, 3.74],
    target: [1.02, 0.47, 0.59],
    customPos: { bottom: 350, left: 1100 },
  },
  {
    id: "abdomen",
    title: "The Abdomen",
    desc: "The rear segment houses the heart, respiratory organs, and the remarkable silk-producing glands called spinnerets.",
    camera: [-0.94, 3.7, -3.4],
    target: [2, -1.5, -0.2],
    customPos: { bottom: 350, left: 48 },
  },
  {
    id: "conclusion",
    title: "Perfectly Adapted",
    desc: "From the silk they spin to the venom they yield, every part of the spider is tuned for survival in its specific niche.",
    camera: [-0.04, 2.66, 4.31],
    target: [-0.88, 0.58, -0.29],
    customPos: { bottom: 350, left: 48 },
  },
];

export default function AnatomyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".anatomy-section");

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentStep(i),
        onEnterBack: () => setCurrentStep(i),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const step = ANATOMY_STEPS[currentStep];
  const uiPos = step.uiPos || "left";

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen selection:bg-moss/20"
    >
      {/* 1. Base Layer: The 3D Environment */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#fdfaf0]" />

        <Suspense fallback={null}>
          <SpiderCanvas
            cameraPosition={step.camera}
            cameraTarget={step.target}
            activePart={step.part}
            isInteractive={false}
            isAnimated={false}
            autoRotate={
              currentStep === 0 || currentStep === ANATOMY_STEPS.length - 1
            }
          />
        </Suspense>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(40,54,24,0.08)_100%)] shadow-[inset_0_0_150px_rgba(0,0,0,0.05)]" />
      </div>

      {/* 2. Professional Scientific HUD (Z-Index 10) */}
      <div className="fixed inset-0 z-10 pointer-events-none border-[1px] border-ink/5 m-6 overflow-hidden rounded-3xl">
        {/* Subtle HUD Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-moss/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-moss/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-moss/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-moss/40" />

        {/* Bottom Progress Terminal */}
        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-moss/60">
                {Math.round(((currentStep + 1) / ANATOMY_STEPS.length) * 100)}%
                Complete
              </span>
            </div>
            <div className="flex gap-2">
              {ANATOMY_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-[2px] rounded-full transition-all duration-1000 ease-out ${
                    i <= currentStep ? "w-16 bg-moss" : "w-6 bg-ink/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Glassmorphism Info Panel (Z-Index 30) */}
      <div
        className={`fixed z-30 pointer-events-none transition-all duration-1000 ease-in-out
          ${!step.customPos ? (uiPos === "right" ? "bottom-20 right-20 text-right items-end" : "bottom-20 left-20 text-left items-start") : ""}
          max-w-xl flex flex-col
        `}
        style={
          step.customPos
            ? {
                bottom: `${step.customPos.bottom}px`,
                left: `${step.customPos.left}px`,
              }
            : {}
        }
      >
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`flex flex-col pointer-events-auto ${!step.customPos && uiPos === "right" ? "items-end text-right" : "items-start text-left"}`}
        >
          <h2 className="text-5xl md:text-6xl font-serif text-ink mb-8 leading-none tracking-tighter drop-shadow-[0_2px_10px_rgba(253,250,240,0.8)]">
            {step.title}
          </h2>

          <p className="text-lg md:text-xl text-ink/70 font-medium leading-relaxed max-w-lg drop-shadow-[0_1px_5px_rgba(253,250,240,0.5)]">
            {step.desc}
          </p>

          <div
            className={`mt-12 flex items-center gap-8 ${!step.customPos && uiPos === "right" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className="flex gap-2.5">
              {ANATOMY_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${
                    i === currentStep
                      ? "bg-moss scale-150 shadow-[0_0_15px_rgba(40,54,24,0.3)]"
                      : "bg-ink/10"
                  }`}
                />
              ))}
            </div>
            <div className="h-[1px] w-8 bg-ink/10" />
          </div>
        </motion.div>
      </div>

      {/* Invisible Scroll Triggers */}
      <div className="relative z-20">
        {ANATOMY_STEPS.map((step, i) => (
          <section key={step.id} className="anatomy-section h-screen" />
        ))}
        <div className="h-[20vh]" />
      </div>
    </div>
  );
}
