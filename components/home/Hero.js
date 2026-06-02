"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = [0.23, 1, 0.32, 1];

const STATS = [
  { label: "Families Cataloged", value: "138" },
  { label: "Specimens Archived", value: "4.9k+" },
  { label: "Evolution Span", value: "300M" },
];

function SplitReveal({ children, className = "" }) {
  const text = String(children);
  return (
    <span className={className} aria-label={children}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="split-char inline-block"
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function WordReveal({ children, className = "" }) {
  const text = String(children);
  const words = text.split(" ");
  return (
    <span className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-reveal inline-block overflow-hidden"
          aria-hidden="true"
        >
          <span className="word-reveal-inner inline-block">
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const glowRef = useRef(null);
  const scanRef = useRef(null);
  const frameRef = useRef(null);
  const webRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useGSAP(
    () => {
      if (shouldReduce) {
        gsap.set(
          [badgeRef.current, titleRef.current, subtitleRef.current, ctaRef.current, statsRef.current, frameRef.current],
          { opacity: 1 }
        );
        gsap.set(".split-char", { opacity: 1, y: 0 });
        gsap.set(".word-reveal-inner", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5 }
      )
      .fromTo(
        ".split-char",
        { opacity: 0, y: 48, rotateX: -12 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.03, duration: 0.8 },
        "-=0.2"
      )
      .fromTo(
        ".word-reveal-inner",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.035, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      )
      .fromTo(
        frameRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.8, transformOrigin: "left center" },
        "-=0.4"
      );

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.08,
          opacity: 0.6,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (scanRef.current) {
        gsap.to(scanRef.current, {
          y: "100vh",
          duration: 7,
          ease: "none",
          repeat: -1,
          delay: 2,
        });
      }

      if (webRef.current) {
        gsap.to(webRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={(e) => {
        if (shouldReduce || !webRef.current) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 24;
        const y = (clientY / window.innerHeight - 0.5) * 16;
        gsap.to(webRef.current, {
          x, y, duration: 2.5, ease: "power2.out",
        });
      }}
      className="relative min-h-screen w-full bg-ink text-parchment flex items-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,#1a2f25_0%,#0a120e_50%,#060a08_100%)]" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img ref={webRef} src="/spider-webs/02.png" alt="" className="absolute right-0 top-0 h-full w-auto object-cover opacity-[0.2] mix-blend-lighten" draggable={false} />
      </div>

      <div className="absolute top-8 left-8 w-24 h-24 pointer-events-none text-parchment/5">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <path d="M0 0 L100 0 M0 0 L0 100" stroke="currentColor" strokeWidth="0.5" />
          <path d="M15 0 L15 15 L0 15" stroke="currentColor" strokeWidth="0.5" />
          <path d="M30 0 L30 8" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
          <path d="M0 30 L8 30" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
          <path d="M0 50 L5 50" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
          <path d="M50 0 L50 5" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute bottom-8 right-8 w-24 h-24 pointer-events-none text-parchment/5 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <path d="M0 0 L100 0 M0 0 L0 100" stroke="currentColor" strokeWidth="0.5" />
          <path d="M15 0 L15 15 L0 15" stroke="currentColor" strokeWidth="0.5" />
          <path d="M30 0 L30 8" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
          <path d="M0 30 L8 30" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-8 md:px-16 pt-36 pb-24">
        <div className="max-w-4xl">
          <div ref={badgeRef} className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-amber/20 bg-amber/[0.03] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber/60 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-amber/70">
              Scientific Archive
            </span>
          </div>

          <h1
            ref={titleRef}
            className="font-display text-[clamp(4rem,16vw,12rem)] font-bold leading-[0.82] tracking-[-0.05em] text-parchment mb-6"
          >
            <SplitReveal>Vita Motus</SplitReveal>
          </h1>

          <p
            ref={subtitleRef}
            className="text-base md:text-lg text-parchment/35 font-sans leading-relaxed max-w-xl mb-12"
          >
            <WordReveal>
              An immersive digital archive exploring the architectural elegance and kinetic precision of arachnid lifeforms.
            </WordReveal>
          </p>

          <div ref={ctaRef}>
            <Link
              href="/species"
              className="group inline-flex items-center gap-4 bg-parchment text-ink px-8 py-4 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white active:scale-[0.97] transition-all duration-500"
            >
              <span>Explore Archive</span>
              <span className="w-6 h-[1px] bg-ink/30 group-hover:w-10 transition-all duration-500" />
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-8 md:gap-16 mt-24 md:mt-36 max-w-lg overflow-visible"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5">
              <span className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber/30" />
                <span className="text-3xl md:text-4xl font-serif text-parchment">
                  {stat.value}
                </span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-parchment/20 overflow-visible">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink to-transparent pointer-events-none" />

      <div className="absolute bottom-12 left-8 md:left-16 flex items-center gap-3 font-mono text-[8px] text-parchment/10 tracking-[0.3em] uppercase z-10">
        <span className="w-4 h-[1px] bg-parchment/10" />
        Cat. Ref. // VM.001
      </div>
    </section>
  );
}
