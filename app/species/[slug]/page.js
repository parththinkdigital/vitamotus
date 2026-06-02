"use client";

import { useState, useEffect } from "react";
import { taxonomyApi, getImageUrl } from "@/lib/api";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
};

export default function SpeciesProfilePage() {
  const params = useParams();
  const [specimen, setSpecimen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    async function loadSpecimen() {
      try {
        const data = await taxonomyApi.getSpecimen(params.slug);
        setSpecimen(data);
      } catch (err) {
        setError("Specimen profile not found in archive.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSpecimen();
  }, [params.slug]);

  useEffect(() => {
    if (specimen) {
      setActiveImage(getImageUrl(specimen));
    }
  }, [specimen]);

  if (loading)
    return (
      <MainLayout>
        <div className="min-h-screen bg-parchment flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-10 h-10 rounded-full border-2 border-moss/20 border-t-moss animate-spin motion-reduce:animate-none motion-reduce:border-moss/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20 motion-reduce:text-ink/40">
              Loading Specimen
            </span>
          </div>
        </div>
      </MainLayout>
    );

  if (error || !specimen)
    return (
      <MainLayout>
        <div className="min-h-screen bg-parchment flex items-center justify-center p-8 text-center">
          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-serif text-ink italic">{error}</h2>
            <p className="text-ink/40 font-medium">
              The requested taxonomic record might have been relocated or is
              awaiting digitization.
            </p>
            <Link
              href="/species"
              className="inline-block px-12 py-5 bg-ink text-parchment rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-moss transition-colors duration-500 active:scale-[0.97]"
            >
              Return to Directory
            </Link>
          </div>
        </div>
      </MainLayout>
    );

  const profile = specimen.profile || {};
  const hasGallery = profile.photo_gallery_urls?.length > 0;

  return (
    <MainLayout>
      <div className="relative min-h-screen bg-parchment pb-32 overflow-hidden selection:bg-moss/20">
        {/* Hero */}
        <div className="relative h-[70vh] bg-ink overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-8 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
                className="flex items-center justify-center gap-6 mb-8"
              >
                <div className="h-px w-12 bg-moss/40" />
                <div className="h-px w-12 bg-moss/40" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
                className="text-7xl md:text-9xl font-serif text-parchment italic leading-none tracking-tighter"
              >
                {specimen.scientific_name}
              </motion.h1>

              {specimen.subspecies && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.38 }}
                  className="text-2xl md:text-3xl font-serif text-parchment/30 italic tracking-wide mt-4"
                >
                  subsp. {specimen.subspecies}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.45 }}
                className="mt-6"
              >
                <p className="text-parchment/40 font-serif italic text-2xl">
                  {specimen.authority} {specimen.year}
                </p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="px-4 py-1 rounded-full border border-parchment/10 text-[9px] font-bold uppercase tracking-widest text-parchment/30 italic">
                    {specimen.taxon_status}
                  </span>
                  {profile.conservation_status && (
                    <span className="px-4 py-1 rounded-full bg-moss/20 border border-moss/30 text-[9px] font-bold uppercase tracking-widest text-moss italic">
                      IUCN: {profile.conservation_status}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {specimen.family && (
            <nav className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-parchment/20 px-8">

              <span className="opacity-10">/</span>
              <Link href={`/family/${specimen.family.name}`} className="hover:text-moss transition-colors duration-300">
                {specimen.family.name}
              </Link>
              <span className="opacity-10">/</span>
              <span className="text-parchment/60 italic">{specimen.genus?.name}</span>
            </nav>
          )}
        </div>

        {/* Content: Editorial layout */}
        <div className="mx-auto relative z-10 px-8 md:px-20 lg:px-28 space-y-20 md:space-y-15">

              {/* Habitat card + Image — side by side */}
              {(profile.habitat || hasGallery) && (
                <div className={`grid gap-8 md:gap-12 items-start ${profile.habitat && hasGallery ? 'grid-cols-1 md:grid-cols-[1fr_2fr]' : ''}`}>
                  {profile.habitat && (
                    <motion.div {...fadeUp} className="-mt-10 md:-mt-16 [&>div]:!p-6 md:[&>div]:!p-10 [&>div>p]:!text-xl md:[&>div>p]:!text-3xl">
                      <StatCard label="Habitat" value={profile.habitat}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                      </StatCard>
                    </motion.div>
                  )}
                  {hasGallery && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                      className="relative aspect-[4/3] overflow-hidden bg-ink rounded-3xl shadow-xl mt-30"
                    >
                      <motion.img
                        key={activeImage}
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        src={activeImage}
                        className="w-full h-full object-cover top-0 left"
                        alt={specimen.scientific_name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <p className="text-xl md:text-2xl font-serif text-parchment italic leading-tight mt-1">
                          {specimen.scientific_name}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Quick Stats — remaining */}
              {(specimen.common_name || profile.web_type) && (
                <motion.section {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {specimen.common_name && (
                    <StatCard label="Common Name" value={specimen.common_name}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                    </StatCard>
                  )}
                  {profile.web_type && (
                    <StatCard label="Web Type" value={profile.web_type}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"/></svg>
                    </StatCard>
                  )}
                </motion.section>
              )}

              {/* Scientific Profile */}
              {(specimen.description || profile.behaviour_notes || profile.venom_medical_relevance) && (
                <motion.section {...fadeUp} className="space-y-16 md:space-y-20">
                  <SectionHeading title="Scientific Profile" subtitle="The Encyclopedia Entry" />

                  <div className="max-w-full space-y-20">
                    {specimen.description && (
                      <p className="text-3xl md:text-4xl font-serif text-ink/80 leading-relaxed italic first-letter:text-8xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:text-moss text-justify">
                        {specimen.description}
                      </p>
                    )}

                    {(profile.behaviour_notes || profile.venom_medical_relevance) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 pt-4">
                        {profile.behaviour_notes && (
                          <div className="space-y-8">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-moss border-b border-moss/10 pb-4">
                              Behavioral Dynamics
                            </h4>
                            <p className="text-base md:text-lg text-ink/50 leading-relaxed font-medium">
                              {profile.behaviour_notes}
                            </p>
                          </div>
                        )}
                        {profile.venom_medical_relevance && (
                          <div className="space-y-8">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-moss border-b border-moss/10 pb-4">
                              Medical Relevance
                            </h4>
                            <p className="text-base md:text-lg text-ink/50 leading-relaxed font-medium">
                              {profile.venom_medical_relevance}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.section>
              )}

              {/* Hobbyist Summary */}
              {profile.hobbyist_summary && (
                <motion.section {...fadeUp} className="space-y-10 md:space-y-15">
                  <SectionHeading title="Hobbyist Summary" subtitle="For the Curious Naturalist" />
                  <div className="max-w-full">
                    <div className="relative p-12 md:p-16 bg-moss rounded-3xl border border-parchment/10 shadow-lg shadow-ink/10">
                      <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-parchment/10 rounded-tl-xl opacity-30" />
                      <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-parchment/10 rounded-tr-xl opacity-30" />
                      <p className="text-xl md:text-2xl font-serif text-parchment/80 italic leading-relaxed">
                        {profile.hobbyist_summary}
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Biometrics */}
              {(profile.size_min || profile.size_max || profile.similar_species || specimen.distribution || profile.diet) && (
                <motion.section {...fadeUp} className="space-y-10 md:space-y-15">
                  <SectionHeading title="Biometrics" subtitle="Physical Characteristics" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 bg-moss p-14 md:p-18 rounded-3xl border border-parchment/10 shadow-lg shadow-ink/10">
                    <div className="space-y-10">
                      {(profile.size_min || profile.size_max) && (
                        <BiometricBlock label="Average Size Span">
                          <div className="flex items-baseline gap-3">
                            <span className="text-5xl md:text-6xl font-serif text-parchment leading-none">
                              {profile.size_min || "—"} &ndash; {profile.size_max || "—"}
                            </span>
                            <span className="text-base italic text-parchment/40">mm</span>
                          </div>
                        </BiometricBlock>
                      )}
                      {profile.similar_species && (
                        <BiometricBlock label="Similar Species">
                          <p className="text-base md:text-lg font-medium text-parchment/60 leading-relaxed">
                            {profile.similar_species}
                          </p>
                        </BiometricBlock>
                      )}
                    </div>
                    <div className="space-y-10">
                      {specimen.distribution && (
                        <BiometricBlock label="Geographic Focus">
                          <p className="text-xl md:text-2xl font-serif text-parchment italic leading-snug">
                            {specimen.distribution}
                          </p>
                        </BiometricBlock>
                      )}
                      {profile.diet && (
                        <BiometricBlock label="Dietary Profile">
                          <p className="text-base md:text-lg font-medium text-parchment/60 leading-relaxed">
                            {profile.diet}
                          </p>
                        </BiometricBlock>
                      )}
                    </div>
                  </div>
                </motion.section>
              )}

              {/* References */}
              {profile.references_list && (
                <motion.section {...fadeUp} className="space-y-16 md:space-y-20">
                  <SectionHeading title="References" subtitle="Cited Literature" />
                  <div className="max-w-4xl">
                    <div className="p-12 md:p-14 bg-parchment border border-ink/5 rounded-3xl shadow-sm">
                      <p className="text-sm text-ink/60 font-medium leading-loose whitespace-pre-line">
                        {profile.references_list}
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Registry & Archive */}
              {(specimen.lsid || specimen.wsc_species_id || specimen.wsc_legacy_id) && (
                <motion.section {...fadeUp} className="space-y-16 md:space-y-20">
                  <SectionHeading title="Registry & Archive" subtitle="Catalog Identification" />

                  <div className="group relative p-14 md:p-18 bg-moss rounded-3xl border border-parchment/10 shadow-xl shadow-ink/20 transition-[border-color,box-shadow] duration-500 ease-out hover:border-parchment/20 hover:shadow-[0_0_0_1px_rgba(244,234,215,0.06),0_32px_64px_-12px_rgba(0,0,0,0.3)]">
                    <CornerAccents />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      {specimen.lsid && (
                        <div className="space-y-10">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-parchment/35">
                              Registry LSID
                            </span>
                            <span className="text-[8px] font-mono text-parchment/20 uppercase tracking-widest">WSC</span>
                          </div>
                          <div className="relative p-5 bg-ink/40 rounded-2xl border border-parchment/8 group/code">
                            <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-moss/30 to-transparent" />
                            <div className="flex items-start justify-between gap-4">
                              <p className="font-mono text-[11px] text-parchment/65 break-all leading-relaxed select-all tracking-wide">
                                {specimen.lsid}
                              </p>
                              <button
                                onClick={() => navigator.clipboard.writeText(specimen.lsid)}
                                className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-parchment/5 border border-parchment/5 text-parchment/25 hover:text-parchment/60 hover:bg-parchment/10 hover:border-parchment/10 active:scale-[0.97] transition-[color,background-color,border-color,transform] duration-200 ease-out"
                                aria-label="Copy LSID to clipboard"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-10">
                        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-parchment/35 block border-b border-parchment/8 pb-4">
                          Archive Meta
                        </span>
                        <div className="space-y-7">
                          <MetaRow label="Archive ID" value={`#${specimen.wsc_species_id}`} />
                          {specimen.wsc_legacy_id && (
                            <MetaRow label="Legacy Ref" value={specimen.wsc_legacy_id} />
                          )}
                          <MetaRow
                            label="Catalog Date"
                            value={new Date(specimen.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Documentation */}
              {(specimen.vitamotus_notes || specimen.sources) && (
                <motion.section {...fadeUp} className="space-y-16 md:space-y-20">
                  <SectionHeading title="Documentation" subtitle="Sources & Archival Records" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {specimen.vitamotus_notes && (
                      <DocCard
                        label="Librarian Notes"
                        bg="bg-parchment"
                        textColor="text-ink/60"
                        labelColor="text-ink/25"
                        borderColor="border-ink/5"
                        hoverBorderColor="hover:border-moss/20"
                      >
                        <p className="text-lg md:text-xl text-ink/60 font-serif italic leading-relaxed">
                          {specimen.vitamotus_notes}
                        </p>
                      </DocCard>
                    )}
                    {specimen.sources && (
                      <DocCard
                        label="Research Sources"
                        bg="bg-moss"
                        textColor="text-parchment/65"
                        labelColor="text-parchment/45"
                        borderColor="border-parchment/10"
                        hoverBorderColor="hover:border-parchment/20"
                      >
                        <p className="text-sm text-parchment/65 font-medium leading-relaxed whitespace-pre-line">
                          {specimen.sources}
                        </p>
                      </DocCard>
                    )}
                  </div>
                </motion.section>
              )}

          {/* Public Notice */}
          <motion.div {...fadeUp} className="group relative p-12 md:p-16 bg-ink rounded-3xl border border-parchment/5 shadow-inner shadow-black/20 transition-[border-color] duration-500 ease-out hover:border-parchment/10">
            <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-parchment/5 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-parchment/5 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-4 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-moss/60" />
                <span className="absolute inline-flex h-full w-full rounded-full bg-moss animate-ping motion-reduce:animate-none" />
              </span>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-parchment">
                Public Notice
              </h4>
            </div>
            <p className="text-base md:text-lg text-parchment/35 leading-relaxed italic font-serif max-w-3xl">
              Observation data for {specimen.scientific_name} is curated for
              educational purposes. Always exercise caution and respect when
              encountering wildlife in their natural habitats.
            </p>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}

function StatCard({ label, value, children }) {
  return (
    <div className="p-12 md:p-14 bg-moss border border-parchment/10 rounded-3xl space-y-5 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_0_0_1px_rgba(244,234,215,0.15),0_4px_12px_-2px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-parchment/50 font-bold">
          {label}
        </span>
        <span className="text-parchment/25">{children}</span>
      </div>
      <p className="text-2xl md:text-3xl font-serif text-parchment italic leading-tight">
        {value}
      </p>
    </div>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-5">
        <div className="h-px w-10 bg-moss/40" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-moss font-bold">
          {subtitle}
        </p>
      </div>
      <h2 className="text-5xl md:text-7xl font-serif text-ink italic tracking-tight leading-none">
        {title}
      </h2>
    </div>
  );
}

function BiometricBlock({ label, children }) {
  return (
    <div className="space-y-3">
      <span className="text-[10px] font-bold uppercase tracking-widest text-parchment/40">
        {label}
      </span>
      {children}
    </div>
  );
}

function DocCard({ label, children, bg, textColor, labelColor, borderColor, hoverBorderColor }) {
  return (
    <div className={`group relative p-12 md:p-14 ${bg} ${borderColor} rounded-3xl space-y-5 shadow-sm transition-[border-color,box-shadow] duration-500 ease-out ${hoverBorderColor} ${hoverBorderColor.includes('moss') ? 'hover:shadow-[0_0_0_1px_rgba(73,107,74,0.08),0_8px_24px_-4px_rgba(0,0,0,0.04)]' : 'hover:shadow-[0_0_0_1px_rgba(244,234,215,0.08),0_8px_24px_-4px_rgba(0,0,0,0.15)]'}`}>
      <div className={`absolute top-5 left-5 w-5 h-5 border-t border-l rounded-tl-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${borderColor.replace('border-', 'border-').replace('/10', '/20')}`} />
      <div className={`absolute top-5 right-5 w-5 h-5 border-t border-r rounded-tr-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${borderColor.replace('border-', 'border-').replace('/10', '/20')}`} />
      <h5 className={`text-[10px] font-bold uppercase tracking-[0.3em] ${labelColor}`}>
        {label}
      </h5>
      {children}
    </div>
  );
}

function CornerAccents() {
  return (
    <>
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-parchment/10 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-parchment/10 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-parchment/10 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-parchment/10 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="flex justify-between items-end group/row cursor-default">
      <span className="text-[9px] text-parchment/30 uppercase tracking-[0.3em] transition-colors duration-300 group-hover/row:text-parchment/50">
        {label}
      </span>
      <span className="font-serif italic text-xl text-parchment transition-colors duration-300 group-hover/row:text-parchment/80">
        {value}
      </span>
    </div>
  );
}
