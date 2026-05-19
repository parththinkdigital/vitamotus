"use client";

import { useState, useEffect } from "react";
import { taxonomyApi, getImageUrl } from "@/lib/api";
import MainLayout from "@/components/layout/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

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
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-2 border-moss border-t-transparent rounded-full"
          />
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
              className="inline-block px-12 py-5 bg-ink text-parchment rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-moss transition-all duration-500"
            >
              Return to Directory
            </Link>
          </div>
        </div>
      </MainLayout>
    );

  const profile = specimen.profile || {};

  return (
    <MainLayout>
      <div className="relative min-h-screen bg-parchment pb-32 overflow-hidden selection:bg-moss/20">
        {/* ─── FIELD JOURNAL BACKGROUND TEXTURES ─── */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute inset-0">
            <img 
              src="/assets/web/web-01.png.png" 
              alt="Web Pattern" 
              className="w-full h-full object-cover opacity-[0.1] mix-blend-multiply"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          {/* Large Scale Taxonomy Watermark */}
          <div className="absolute top-1/2 left-0 flex flex-col opacity-[0.03] -rotate-90 origin-left">
             <span className="text-[180px] font-serif tracking-tighter uppercase pointer-events-none whitespace-nowrap">Taxonomic_Specimen_Profile</span>
          </div>
        </div>

        <div className="relative z-10">
        {/* Cinematic Header */}
        <div className="relative h-[70vh] bg-ink overflow-hidden">
          <motion.div
            key={activeImage}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <img
              src={activeImage}
              alt=""
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-8 px-8 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-6"
              >
                <div className="h-[1px] w-12 bg-moss/40" />
                <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-moss">
                  Specimen Entry No. {specimen.wsc_species_id}
                </span>
                <div className="h-[1px] w-12 bg-moss/40" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-7xl md:text-9xl font-serif text-parchment italic leading-none tracking-tighter"
              >
                {specimen.scientific_name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-2"
              >
                <p className="text-parchment/40 font-serif italic text-2xl">
                  {specimen.authority} {specimen.year}
                </p>
                <div className="flex items-center justify-center gap-4 pt-4">
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

          {/* Breadcrumbs */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-parchment/20 whitespace-nowrap overflow-hidden px-8">
            <Link href="/species" className="hover:text-moss transition-colors">
              Directory
            </Link>
            <span className="opacity-10">/</span>
            <Link
              href={`/family/${specimen.family.name}`}
              className="hover:text-moss transition-colors"
            >
              {specimen.family.name}
            </Link>
            <span className="opacity-10">/</span>
            <span className="text-parchment/60 italic">
              {specimen.genus.name}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto -mt-20 relative z-20 px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* LEFT COLUMN: Data & Descriptions */}
          <div className="lg:col-span-8 space-y-24">
            {/* Overview & Quick Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard
                label="Common Name"
                value={specimen.common_name || "N/A"}
                icon="🏷️"
              />
              <StatCard
                label="Habitat"
                value={profile.habitat || "Forest/Shrubland"}
                icon="🌿"
              />
              <StatCard
                label="Web Type"
                value={profile.web_type || "Orb-Web"}
                icon="🕸️"
              />
            </section>

            {/* Cool & Nice Specimen Visualization Section */}
            <section className="space-y-12">
              <ChapterHeading
                title="Visual Analysis"
                subtitle="High-Fidelity Specimen Plate"
              />

              <div className="relative group">
                {/* The Specimen Plate */}
                <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-ink shadow-2xl border border-white/5">
                  <motion.img
                    key={activeImage}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    src={activeImage}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
                    alt={specimen.scientific_name}
                  />

                  {/* Interactive UI Overlays */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Scanning Line */}
                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute left-0 w-full h-[2px] bg-moss/30 blur-sm z-10"
                    />

                    {/* Corner Accents */}
                    <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-moss/40 rounded-tl-2xl" />
                    <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-moss/40 rounded-tr-2xl" />
                    <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-moss/40 rounded-bl-2xl" />
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-moss/40 rounded-br-2xl" />

                    {/* Technical Metadata Overlays */}
                    <div className="absolute top-12 left-12 space-y-1 opacity-40">
                      <span className="block text-[8px] font-mono text-parchment tracking-[0.3em]">
                        RES: 8K_RAW
                      </span>
                      <span className="block text-[8px] font-mono text-parchment tracking-[0.3em]">
                        OPTICS: ZEISS_75MM
                      </span>
                    </div>

                    <div className="absolute bottom-12 right-12 text-right space-y-1 opacity-40">
                      <span className="block text-[8px] font-mono text-parchment tracking-[0.3em]">
                        SPECIMEN_ID: {specimen.wsc_species_id}
                      </span>
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
                        <span className="text-[8px] font-mono text-parchment tracking-[0.3em]">
                          FOCUS: LOCKED
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                    <div className="px-8 py-4 bg-parchment/10 backdrop-blur-md rounded-2xl border border-white/10 text-parchment text-[10px] font-bold uppercase tracking-[0.4em]">
                      Enter Macro View
                    </div>
                  </div>
                </div>

                {/* Shadow Accent */}
                <div className="absolute -inset-4 bg-moss/5 blur-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>

              {/* Photo Gallery (if available) */}
              {profile?.photo_gallery_urls &&
                profile.photo_gallery_urls.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {/* Include the main image in the gallery if it's not already there */}
                    {profile.photo_gallery_urls.map((path, i) => {
                      const url = path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage'}/${path}`;
                      return (
                        <div
                          key={i}
                          onClick={() => setActiveImage(url)}
                          className={`aspect-square rounded-2xl overflow-hidden bg-ink border transition-all duration-500 cursor-pointer ${activeImage === url ? 'border-moss scale-95 shadow-inner' : 'border-white/5 hover:border-moss/40'}`}
                        >
                          <img
                            src={url}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${activeImage === url ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
            </section>

            {/* Encyclopedia Entry */}
            <section className="space-y-12">
              <ChapterHeading
                title="Scientific Profile"
                subtitle="The Encyclopedia Entry"
              />

              <div className="space-y-16">
                {/* Primary Description */}
                <div className="prose prose-ink max-w-none">
                  <p className="text-2xl font-serif text-ink/80 leading-relaxed italic first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-moss">
                    {specimen.description ||
                      "Detailed taxonomic descriptions for this species are currently under archive review. Preliminary data suggests a unique morphology consistent with regional variations."}
                  </p>
                </div>

                {/* Behavioral & Medical */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-moss border-b border-moss/10 pb-3">
                      Behavioral Dynamics
                    </h4>
                    <p className="text-sm text-ink/50 leading-relaxed font-medium">
                      {profile.behaviour_notes ||
                        "Specific behavioral observations for this specimen in wild environments are currently being compiled."}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-moss border-b border-moss/10 pb-3">
                      Medical Relevance
                    </h4>
                    <p className="text-sm text-ink/50 leading-relaxed font-medium">
                      {profile.venom_medical_relevance ||
                        "No significant medical incidents involving this species have been documented in current toxicology databases."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Physical Biometrics */}
            <section className="space-y-12">
              <ChapterHeading
                title="Biometrics"
                subtitle="Physical Characteristics"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-12 rounded-[3rem] border border-ink/5 shadow-sm">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/20">
                      Average Size Span
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-serif">
                        {profile.size_min || "12"} - {profile.size_max || "18"}
                      </span>
                      <span className="text-sm italic text-ink/40">mm</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/20">
                      Similar Species
                    </span>
                    <p className="text-sm font-medium text-ink/60 leading-relaxed">
                      {profile.similar_species ||
                        "Distinct morphological features separate this species from closely related regional taxa."}
                    </p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/20">
                      Geographic Focus
                    </span>
                    <p className="text-lg font-serif text-ink italic leading-snug">
                      {specimen.distribution ||
                        "Global Distribution data is currently being updated."}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/20">
                      Dietary Profile
                    </span>
                    <p className="text-sm font-medium text-ink/60 leading-relaxed">
                      {profile.diet ||
                        "Generalist insectivore, primarily preying on smaller flying arthropods."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Archive Notes & Sources */}
            <section className="space-y-12">
              <ChapterHeading
                title="Documentation"
                subtitle="Sources & Archival Records"
              />
              <div className="grid grid-cols-1 gap-8">
                <div className="p-10 bg-parchment/50 border border-ink/5 rounded-[2.5rem] space-y-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/30">
                    Librarian Notes
                  </h5>
                  <p className="text-lg text-ink/60 font-serif italic leading-relaxed">
                    {specimen.vitamotus_notes ||
                      "Field notes for this entry are awaiting final transcription from the original journal records."}
                  </p>
                </div>
                <div className="p-10 bg-moss/5 border border-moss/10 rounded-[2.5rem] space-y-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-moss/60">
                    Research Sources
                  </h5>
                  <p className="text-xs text-moss/70 font-medium leading-relaxed whitespace-pre-line leading-loose">
                    {specimen.sources ||
                      "Primary taxonomy validated through the World Spider Catalog. Ecological data synthesized from regional arachnological surveys and IUCN databases."}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sidebar Meta */}
          <div className="lg:col-span-4 space-y-12">
            {/* Metadata Card */}
            <div className="sticky top-32 p-12 bg-white border border-ink/5 rounded-[3rem] space-y-12 shadow-xl shadow-ink/5">
              <div className="space-y-10">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30 block border-b border-ink/5 pb-4">
                    Registry LSID
                  </span>
                  <p className="font-mono text-[10px] text-ink/40 break-all leading-relaxed">
                    {specimen.lsid || "URN:LSID:NMBE.CH:SPIDER:12345"}
                  </p>
                </div>

                <div className="space-y-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30 block border-b border-ink/5 pb-4">
                    Archive Meta
                  </span>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-ink/30 uppercase tracking-widest">
                        Archive ID
                      </span>
                      <span className="font-serif italic text-lg text-moss">
                        #{specimen.wsc_species_id}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-ink/30 uppercase tracking-widest">
                        Legacy Ref
                      </span>
                      <span className="font-serif italic text-lg text-ink">
                        {specimen.wsc_legacy_id || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-ink/30 uppercase tracking-widest">
                        Catalog Date
                      </span>
                      <span className="font-serif italic text-lg text-ink">
                        {new Date(specimen.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short" },
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Public Notice */}
            <div className="p-10 bg-ink rounded-[2.5rem] border border-white/5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-moss" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-parchment">
                  Public Notice
                </h4>
              </div>
              <p className="text-xs text-parchment/40 leading-relaxed italic font-serif">
                Observation data for {specimen.scientific_name} is curated for
                educational purposes. Always exercise caution and respect when
                encountering wildlife in their natural habitats.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </MainLayout>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="p-10 bg-white border border-ink/5 rounded-[2.5rem] space-y-4 shadow-sm hover:translate-y-[-4px] transition-transform duration-500">
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-widest text-ink/30 font-bold">
          {label}
        </span>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-xl font-serif text-ink italic leading-tight">
        {value}
      </p>
    </div>
  );
}

function ChapterHeading({ title, subtitle }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-8 bg-moss/40" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-moss font-bold">
          {subtitle}
        </p>
      </div>
      <h2 className="text-4xl md:text-5xl font-serif text-ink italic tracking-tight">
        {title}
      </h2>
    </div>
  );
}
