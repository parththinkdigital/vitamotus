"use client";

import { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1];

const HERO_IMAGES = Array.from(
  { length: 16 },
  (_, i) => ({
    src: `/hero-img/hero-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `Hero specimen ${i + 1}`,
  })
);

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

export default function SpecimenGallery() {
  const sectionRef = useRef(null);
  const navRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const trackRef = useRef(null);
  const shouldReduce = useReducedMotion();

  useGSAP(
    () => {
      if (shouldReduce) {
        gsap.set([navRef.current, titleRef.current, subtitleRef.current], {
          opacity: 1,
        });
        gsap.set(".split-char", { opacity: 1, y: 0 });
        gsap.set(trackRef.current, { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });

      tl.fromTo(
        navRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          trackRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        )
        .fromTo(
          ".carousel-card",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0 0 0)",
            stagger: 0.04,
            duration: 0.7,
            ease: EASE_OUT,
          },
          "-=0.5"
        )
        .fromTo(
          ".split-char",
          { opacity: 0, y: 48, rotateX: -12 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.035, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.1"
        );

      const track = trackRef.current;
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth / 2),
          duration: 50,
          ease: "none",
          repeat: -1,
        });
      }
    },
    { scope: sectionRef }
  );


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-ink text-parchment overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a2f25_0%,#0a120e_60%,#060a08_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Cinematic carousel */}
      <div className="relative z-10 flex items-center justify-center w-full h-[50vh] md:h-[55vh] overflow-hidden top-[7.5rem]">
        <div
          className="w-full max-w-full  mx-auto overflow-hidden
            [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"
        >
          <div
            ref={trackRef}
            className="flex gap-2 md:gap-4"
          >
            {HERO_IMAGES.map((img, i) => (
              <div
                key={i}
                className="carousel-card relative shrink-0 h-[40vh] md:h-[45vh] border border-parchment/8 bg-white/[0.02] overflow-hidden rounded-md"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-auto contrast-[0.9] brightness-[0.8] saturate-[0.5]"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: title left, description right — anchored to baseline */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 pb-8 md:pb-12">
        <div className="flex items-end justify-between gap-8">
          <h1
            ref={titleRef}
            className="font-display text-[clamp(3.5rem,14vw,11rem)] font-bold leading-[0.82] tracking-[-0.05em] text-parchment shrink-0"
          >
            <SplitReveal>Gallery</SplitReveal>
          </h1>
          <p
            ref={subtitleRef}
            className="max-w-[280px] text-right text-xs md:text-sm text-parchment/25 font-sans leading-relaxed"
          >
            An immersive digital archive exploring the architectural elegance
            and kinetic precision of arachnid lifeforms.
          </p>
        </div>
      </div>
    </section>
  );
}
