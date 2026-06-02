"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

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
    customPos: { bottom: 14, left: 4 },
  },
  {
    id: "cephalothorax",
    title: "The Cephalothorax",
    desc: "The front segment (prosoma) contains the brain, stomach, and venom glands. It is the structural anchor where all eight limbs are attached.",
    camera: [0.82, 1.11, 3.06],
    target: [-1.03, 0.76, -0.15],
    customPos: { bottom: 53, left: 4 },
  },
  {
    id: "eyes",
    title: "Sensory Array",
    desc: "Most spiders possess eight eyes, arranged specifically by family. They detect motion, light polarity, and in some species, high-resolution imagery.",
    camera: [-0.54, 1.32, 1.42],
    target: [0.72, 0.61, 0.13],
    customPos: { bottom: 12, left: 50 },
  },
  {
    id: "chelicerae",
    title: "Chelicerae",
    desc: "The chelicerae are the spider's mouthparts, each tipped with a sharp fang connected to a venom gland. They pierce prey and inject venom that liquefies tissue, enabling external digestion.",
    camera: [-0.55, 0.7, 1.7], target: [0.01, 0.42, -0.08], customPos: { bottom: 14, left: 4 },
  },
  {
    id: "pedipalps",
    title: "Pedipalps",
    desc: "Pedipalps are the second pair of appendages, functioning as sensory organs for touch and taste. In males, the tips are modified into bulbus copulatory organs used for sperm transfer during mating.",
    camera: [0.65, 0.64, 0.92], target: [-0.07, 0.33, 0.07], customPos: { bottom: 14, left: 4 }
  },
  {
    id: "legs",
    title: "Hydraulic Limbs",
    desc: "Each leg consists of seven segments: coxa, trochanter, femur, patella, tibia, metatarsus, and tarsus. Spiders use hydraulic fluid pressure (hemolymph) to extend their legs — the same principle as a hydraulic press — allowing explosive jumps, rapid sprints, and acrobatic web navigation. Clawed tarsi enable grip on silk and vertical surfaces.",
    camera: [-4.28, 1.45, 3.74],
    target: [1.02, 0.47, 0.59],
    customPos: { bottom: 45, left: 69.44 },
  },
  {
    id: "booklungs",
    title: "Book Lungs",
    desc: "Book lungs are the spider's primary respiratory organs, located on the underside of the abdomen. They consist of stacked leaf-like plates (lamellae) that maximize surface area for gas exchange — a design that predates the evolution of insect tracheae by millions of years. Some species also possess a tracheal system for supplementary oxygen intake.",
    camera: [-0.95, -0.89, -0.41], target: [-0.71, -0.22, -0.74], customPos: { bottom: 14, left: 10 }
  },
  {
    id: "spinnerets",
    title: "Spinnerets",
    desc: "Spinnerets are movable, finger-like appendages at the rear of the abdomen that extrude liquid silk protein (fibroin) from multiple silk glands. The silk hardens instantly upon exposure to air. Spiders can produce up to seven different silk types, each with distinct properties — from dragline silk stronger than steel to sticky capture silk that remains elastic at extreme temperatures.",
    camera: [-1.27, -0.94, -2.31], target: [-0.52, -0.12, -2.23], customPos: { bottom: 40, left: 3.33 }
  },
  {
    id: "abdomen",
    title: "The Abdomen",
    desc: "The rear segment (opisthosoma) houses the heart, respiratory organs (book lungs), and the reproductive system. Unlike the cephalothorax, the abdomen has no external appendages.",
    camera: [-0.94, 3.7, -3.4],
    target: [2, -1.5, -0.2],
    customPos: { bottom: 40, left: 4 },
  },
  {
    id: "conclusion",
    title: "Perfectly Adapted",
    desc: "From the silk they spin to the hydraulic limbs they move with, every part of the spider is tuned for survival in its specific niche — a 400-million-year evolutionary masterpiece.",
    camera: [-0.04, 2.66, 4.31],
    target: [-0.88, 0.58, -0.29],
    customPos: { bottom: 38.89, left: 3.33 },
  },
];

export default function AnatomyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState("3d");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    if (viewMode !== "3d" || !isDesktop) return;
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
  }, [viewMode, isDesktop]);

  const show3DView = isDesktop && viewMode === "3d";

  return show3DView ? (
    <Desktop3DView
      currentStep={currentStep}
      setViewMode={setViewMode}
      containerRef={containerRef}
    />
  ) : (
    <TextView setViewMode={isDesktop ? setViewMode : undefined} />
  );
}

function Desktop3DView({ currentStep, setViewMode, containerRef }) {
  const step = ANATOMY_STEPS[currentStep];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen selection:bg-moss/20"
    >
      {/* Toggle button */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => setViewMode("text")}
          className="pointer-events-auto bg-ink/5 backdrop-blur-md border border-ink/10 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-ink/60 hover:bg-ink/10 hover:text-ink transition-all duration-300"
        >
          Text Guide
        </button>
      </div>

      {/* 3D Environment */}
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
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(40,54,24,0.08)_100%)] shadow-[inset_0_0_150px_rgba(0,0,0,0.05)]" />
      </div>

      {/* HUD Frame */}
      <div className="fixed inset-0 z-10 pointer-events-none border-[1px] border-ink/5 m-6 overflow-hidden rounded-3xl">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-moss/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-moss/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-moss/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-moss/40" />
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
                  className={`h-[2px] rounded-full transition-all duration-1000 ease-out ${i <= currentStep ? "w-16 bg-moss" : "w-6 bg-ink/10"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div
        className="fixed z-30 pointer-events-none transition-all duration-1000 ease-in-out max-w-xl flex flex-col"
        style={{ bottom: `${step.customPos.bottom}%`, left: `${step.customPos.left}%` }}
      >
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col pointer-events-auto items-start text-justify"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-ink mb-4 leading-none tracking-tighter drop-shadow-[0_2px_10px_rgba(253,250,240,0.8)]">
            {step.title}
          </h2>
          <p className="text-lg text-justify md:text-xl text-ink/70 font-medium leading-relaxed max-w-[425px] drop-shadow-[0_1px_5px_rgba(253,250,240,0.5)]">
            {step.desc}
          </p>
         
        </motion.div>
      </div>

      {/* Scroll Triggers */}
      <div className="relative z-20">
        {ANATOMY_STEPS.map((step) => (
          <section key={step.id} className="anatomy-section h-screen" />
        ))}
        <div className="h-[20vh]" />
      </div>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
};

function TextView({ setViewMode }) {
  return (
    <div className="min-h-screen bg-[#fdfaf0] selection:bg-moss/20">
      {/* Header */}
      <header className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-8 md:px-20 lg:px-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-moss/5 to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          {setViewMode && (
            <button
              onClick={() => setViewMode("3d")}
              className="mb-10 inline-flex items-center gap-2 bg-ink/5 border border-ink/10 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-ink/60 hover:bg-ink/10 hover:text-ink transition-all duration-300"
            >
              3D Model
            </button>
          )}
          <h1 className="text-6xl md:text-8xl font-serif text-ink italic leading-none tracking-tight">
            Anatomy of a Spider
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/50 font-medium max-w-2xl leading-relaxed">
            A journey through 400 million years of evolutionary design — from
            hydraulic limbs to silk-spinning organs.
          </p>
          <div className="mt-8 h-px w-24 bg-moss/30" />
        </div>
      </header>

      {/* Sections */}
      <div className="px-8 md:px-20 lg:px-28 pb-32 md:pb-48 space-y-40 md:space-y-56">
        {ANATOMY_STEPS.map((step, i) => (
          <motion.section
            key={step.id}
            {...fadeUp}
            className="max-w-5xl mx-auto"
          >
            <div className="md:grid md:grid-cols-12 md:gap-16 lg:gap-24">
              {/* Image / diagram placeholder */}
              <div className="md:col-span-5 lg:col-span-4 mb-8 md:mb-0">
                <div className="relative aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-moss/10 to-ink/5 border border-ink/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full border-2 border-moss/20 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-moss/40">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </div>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20">
                        Diagram
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-moss/20 rounded-tl-2xl" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-moss/20 rounded-br-2xl" />
                </div>
              </div>

              {/* Text content */}
              <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-mono text-moss/50 font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-moss/15" />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink italic leading-tight tracking-tight mb-6">
                  {step.title}
                </h2>
                <p className="text-base md:text-lg text-ink/60 font-medium leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Footer */}
      <footer className="px-8 md:px-20 lg:px-28 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto pt-16 border-t border-ink/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20">
            Vitamotus Archive
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 hover:text-ink transition-colors duration-300"
          >
            Return Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
