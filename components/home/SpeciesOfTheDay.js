"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { taxonomyApi } from "@/lib/api";
import Link from "next/link";

const easing = [0.23, 1, 0.32, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easing },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.06, duration: 0.35, ease: easing },
  }),
};

export default function SpeciesOfTheDay() {
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await taxonomyApi.getSpeciesOfTheDay();
        setSpecies(data);
      } catch (err) {
        console.error("Failed to load spotlight specimen:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  if (loading || !species) {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-ink/15">
          Loading archive log...
        </span>
      </div>
    );
  }

  return (
    <motion.div
      variants={!shouldReduce ? cardVariants : undefined}
      initial={shouldReduce ? undefined : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group relative overflow-hidden rounded-[2rem] border border-ink/8 bg-gradient-to-b from-parchment to-parchment/95 px-8 py-8 shadow-lg sm:px-11 sm:py-10"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 select-none">
        <span className="font-serif text-[18rem] font-bold leading-[0.7] tracking-[-0.06em] text-ink/[0.02]">
          {String(species.wsc_species_id || "00").slice(-2)}
        </span>
      </div>

      <div className="relative z-10 space-y-6 sm:space-y-7">
        <motion.div
          variants={!shouldReduce ? itemVariants : undefined}
          initial={shouldReduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-moss uppercase">
              Archive Log_{species.wsc_species_id}
            </span>
            <div className="h-px flex-1 bg-moss/10" />
          </div>
          <h3 className="mt-3 font-serif text-4xl font-bold italic leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {species.scientific_name}
          </h3>
          {species.common_name && (
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.35em] text-ink/35 sm:text-sm">
              {species.common_name}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={!shouldReduce ? itemVariants : undefined}
          initial={shouldReduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              {
                label: "Family",
                value: species.family.name,
              },
              {
                label: "Distribution",
                value: species.distribution,
              },
  
              { label: "Year", value: species.year },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <span className="block font-mono text-[8px] font-bold uppercase tracking-[0.35em] text-ink/20">
                  {item.label}
                </span>
                <p className="text-sm font-medium text-ink/70 sm:text-base">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={!shouldReduce ? itemVariants : undefined}
          initial={shouldReduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="border-t border-ink/5 pt-6"
        >
          <span className="block font-mono text-[8px] font-bold uppercase tracking-[0.35em] text-ink/20">
            Archivist&rsquo;s Note
          </span>
          <div className="relative mt-2">
            <span className="absolute -left-1 -top-1 font-serif text-5xl leading-none text-moss/15">
              &ldquo;
            </span>
            <p className="relative pl-6 font-serif text-base italic leading-relaxed text-ink/60 sm:text-lg">
              {species.vitamotus_notes ||
                "A distinctive member of the " +
                  species.family.name +
                  " family, cataloged by " +
                  species.authority +
                  " in " +
                  species.year +
                  "."}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={!shouldReduce ? itemVariants : undefined}
          initial={shouldReduce ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="!mt-8"
        >
          <Link
            href={`/species/${species.scientific_name.replace(/ /g, "-")}`}
            className="group/btn inline-flex cursor-pointer items-center gap-3 rounded-2xl bg-ink px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-parchment shadow-xl transition-all duration-200 ease-out hover:bg-moss hover:shadow-2xl active:scale-[0.97]"
          >
            View Details
            <span className="inline-block transition-transform duration-200 ease-out group-hover/btn:translate-x-1.5">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
