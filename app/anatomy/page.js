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
    <div className="fixed inset-0 flex items-center justify-center bg-parchment">
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

const TEXT_SECTIONS = [
  {
    id: "full-body",
    title: "Full Body Overview (Dorsal View)",
    desc: "The spider's body is strictly divided into two primary tagmata (body regions) connected by a narrow, flexible stalk, facilitating both structural integrity and predatory mobility.",
    image: "/anatomy-img/full-body.jpg",
    details: [
      "Anterior Part (Prosoma / Cephalothorax): The fused head and thorax region. It serves as the neurosensory and locomotive hub of the spider, housing the brain, stomach, and major muscle attachments. All eight legs and the pedipalps articulate from this region.",
      "Posterior Part (Opisthosoma / Abdomen): The large, unsegmented posterior region. It contains vital visceral organs including the heart, respiratory organs (book lungs), digestive tract, reproductive organs, and silk glands.",
      "Pedicel: A narrow, muscular cylinder connecting the prosoma to the opisthosoma. It allows the abdomen to move independently, which is crucial for directing silk delivery or maneuvering during egg production and defense.",
      "Eyes: Positioned at the anterior front of the prosoma to provide an expansive field of view.",
      "Pedipalps: A pair of jointed appendages located near the mouthparts, functioning as sensory organs and, in males, as intromittent mating organs.",
      "Legs (1, 2, 3, 4): Four pairs of ambulatory appendages numbered sequentially from anterior to posterior.",
      "Spinnerets: Small, mobile finger-like appendages located at the posterior tip of the opisthosoma, containing microscopic spigots through which silk is extruded.",
    ],
  },
  {
    id: "head",
    title: "Head & Mouthparts (Anterior View)",
    desc: "The cephalic region is highly specialized for sensory perception, prey capture, and the initial mechanical breakdown of food.",
    image: "/anatomy-img/head.jpg",
    details: [
      "Eyes (Lycosid Arrangement): Wolf spiders possess eight eyes arranged in three distinct rows — a top row of two medium-sized eyes, a prominent middle row consisting of two exceptionally large Anterior Median Eyes (AME) that provide high-resolution telephoto-like vision, and a bottom row of four smaller eyes providing a wide-angle view of the horizon.",
      "Chelicerae: Massive, muscular structures situated below the eyes. They act as the jaws of the spider, providing the mechanical power needed to hold struggling prey.",
      "Fangs: Sharp, curved, hollow structures at the distal end of each chelicera. The fangs fold into a groove when at rest and swing out to pierce prey, injecting venom from internal venom glands to immobilize and pre-digest the target.",
      "Pedipalps: Flanking the chelicerae, these short, leg-like appendages are heavily covered in chemosensory hairs (setae) to taste and feel objects in the environment.",
    ],
  },
  {
    id: "sexual-dimorphism",
    title: "Sexual Dimorphism & Ventral Structures",
    desc: "The ventral surface reveals the structures responsible for respiration and reproduction, showcasing clear differences between males and females.",
    image: "/anatomy-img/gender.jpeg",
    details: [
      "Sternum: A flat, shield-shaped plate on the ventral side of the prosoma, situated between the leg bases, providing structural support to the cephalothorax.",
      "Book Lungs: Pairs of respiratory organs visible as faint, pale patches on the anterior ventral side of the opisthosoma. They consist of leaf-like vascularized plates stacked together like pages in a book, facilitating efficient gas exchange.",
      "Epigyne (Female Only): A specialized, hardened (sclerotized) external plate located on the ventral midline of the female abdomen. It contains openings leading to the internal spermathecae where the male's sperm is stored after mating.",
      "Male Pedipalps: In males, the distal ends of the pedipalps are highly modified, swollen structures (often resembling boxing gloves) that function as complex secondary sex organs used to transfer sperm to the female epigyne.",
      "Spinnerets: Located at the posterior terminus, these structures are present in both sexes but vary in use depending on reproductive and lifestyle behaviors.",
    ],
  },
  {
    id: "leg-segmentation",
    title: "Leg Segmentation in Detail",
    desc: "Each of the spider's eight walking legs is highly articulated, consisting of seven distinct segments configured to optimize leverage, speed, and sensory input.",
    image: "/anatomy-img/leg.jpg",
    details: [
      "Coxa: The short, robust proximal segment that anchors the leg firmly to the lateral margins of the prosoma.",
      "Trochanter: A small, pivoting segment acting as a hinge between the coxa and the femur, allowing smooth multi-directional adjustments.",
      "Femur: The longest and thickest segment of the leg, packed with powerful muscles that drive locomotion and jumping capabilities.",
      "Patella: A short, rigid knee-like joint that connects the femur to the tibia, providing a structural pivot point for vertical leg movement.",
      "Tibia: A long, strong segment typically equipped with protective spines and tactile hairs to detect vibrations and air currents.",
      "Metatarsus: A slender, flexible segment located between the tibia and tarsus, adding extra reach and springiness to the gait.",
      "Tarsus: The ultimate, distal segment of the leg, acting as the spider's \"foot\". It is densely covered in specialized sensory hairs.",
      "Claw: Situated at the tip of the tarsus. Hunting spiders like wolf spiders typically possess two or three tiny, curved claws that provide an exceptional grip on rough surfaces, silk webs, or prey.",
    ],
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
          <div className="absolute inset-0 bg-parchment" />
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
          <h2 className="text-5xl md:text-6xl font-serif text-ink mb-4 leading-none tracking-tighter drop-shadow-[0_2px_10px_rgba(244,234,215,0.9)]">
            {step.title}
          </h2>
          <p className="text-lg text-justify md:text-xl text-ink/70 font-medium leading-relaxed max-w-[425px] drop-shadow-[0_1px_5px_rgba(244,234,215,0.6)]">
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-parchment selection:bg-moss selection:text-parchment">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-ink/5 pointer-events-none">
        <div className="h-full bg-amber transition-all duration-150 ease-out" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      {/* Header */}
      <header className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-8 md:px-20 lg:px-28 overflow-hidden">
        <div className="absolute inset-0 web-pattern opacity-[0.025]" />
        <div className="absolute inset-0 bg-gradient-to-b from-moss/5 to-transparent pointer-events-none" />
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-moss/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-moss/10 rounded-tr-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          {setViewMode && (
            <motion.button
              onClick={() => setViewMode("3d")}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="mb-10 inline-flex items-center gap-2 bg-ink/5 border border-ink/10 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-ink/60 hover:bg-ink/10 hover:text-ink transition-all duration-300 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-moss">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              3D Model
            </motion.button>
          )}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-moss/40" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-moss/60">
              Morphological Study
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-ink italic leading-none tracking-tight">
            Anatomy of a Spider
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/50 font-medium max-w-2xl leading-relaxed">
            A journey through 400 million years of evolutionary design — from
            hydraulic limbs to silk-spinning organs.
          </p>
          <div className="mt-8 silk-line max-w-[200px]" />
        </div>
      </header>

      {/* Field Guide Label */}
      <div className="px-8 md:px-20 lg:px-28 mb-20 md:mb-28">
        <div className="max-w-5xl mx-auto flex items-center gap-6">
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.5em] text-clay/40">
            Specimen — Lycosidae
          </span>
          <div className="h-px flex-1 bg-clay/10" />
          <span className="text-[9px] font-mono text-clay/30">
            {TEXT_SECTIONS.length} Sections
          </span>
        </div>
      </div>

      {/* Sections */}
      <div className="px-8 md:px-20 lg:px-28 pb-32 md:pb-48">
        {TEXT_SECTIONS.map((section, i) => (
          <motion.section
            key={section.id}
            {...fadeUp}
            className="max-w-5xl mx-auto mb-32 md:mb-44 last:mb-0"
          >
            <div className="md:grid md:grid-cols-12 md:gap-16 lg:gap-24">
              {/* Image */}
              <div className="md:col-span-6 lg:col-span-5 mb-8 md:mb-0 md:sticky md:top-32 md:self-start">
                <div className="rounded-2xl overflow-hidden border border-moss/10 shadow-[0_8px_30px_-12px_rgba(40,54,24,0.12)] group">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-parchment/10 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-parchment/30 rounded-tl-lg pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-parchment/30 rounded-br-lg pointer-events-none" />
                  <div className="absolute top-3 right-3 bg-parchment/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-ink/40 border border-ink/5 pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-mono text-moss/50 font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-moss/15" />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink italic leading-tight tracking-tight mb-3">
                  {section.title}
                </h2>
                <p className="text-base md:text-lg text-ink/60 font-medium leading-relaxed max-w-2xl mb-10">
                  {section.desc}
                </p>
                <div className="space-y-6">
                  {section.details.map((detail, j) => {
                    const match = detail.match(/^([^:]+):\s*(.*)$/);
                    if (!match) {
                      return (
                        <p key={j} className="text-sm md:text-base text-ink/50 leading-relaxed">
                          {detail}
                        </p>
                      );
                    }
                    const [, term, rest] = match;
                    return (
                      <div key={j} className="pl-4 border-l-2 border-moss/15">
                        <h3 className="text-base md:text-lg font-serif font-bold text-ink italic leading-snug tracking-tight mb-1">
                          {term}
                        </h3>
                        <p className="text-sm md:text-base text-ink/50 leading-relaxed">
                          {rest}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {i < TEXT_SECTIONS.length - 1 && (
              <div className="mt-32 md:mt-44">
                <div className="silk-line" />
              </div>
            )}
          </motion.section>
        ))}
      </div>

      {/* Footer */}
      <footer className="px-8 md:px-20 lg:px-28 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto pt-16 border-t border-ink/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-moss/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-moss/40" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20">
              Vitamotus Archive
            </p>
          </div>
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 hover:text-ink transition-colors duration-300"
          >
            <span className="w-0 group-hover:w-6 h-px bg-ink/30 transition-all duration-300" />
            Return Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
