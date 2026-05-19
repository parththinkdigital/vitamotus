'use client';

import MainLayout from '@/components/layout/MainLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-parchment pt-32 pb-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <ChapterHeading 
            title="The Living Archive" 
            subtitle="Understanding the vision behind VitaMotus.earth" 
          />

          <div className="mt-24 space-y-20">
            {/* Section 1: The Mission */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-moss">The Mission</span>
              </div>
              <div className="md:col-span-2 space-y-8">
                <p className="text-3xl font-serif text-ink leading-snug">
                  VitaMotus is a calm, educational natural-history archive designed to help visitors understand the complexity and beauty of arachnids.
                </p>
                <p className="text-lg text-ink/60 leading-relaxed font-medium">
                  We believe that understanding leads to appreciation. By mapping the vast taxonomy of spiders—from the towering Theraphosidae to the microscopic Salticidae—we aim to transform fear into fascination and provide a scientifically respectful resource for students, hobbyists, and nature lovers.
                </p>
              </div>
            </section>

            {/* Section 2: Phase 1: Spiders First */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 border-t border-ink/5">
              <div className="md:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-moss">Why Spiders?</span>
              </div>
              <div className="md:col-span-2 space-y-8">
                <h3 className="text-3xl font-serif text-ink">The "Spiders-Only" Starting Phase</h3>
                <p className="text-lg text-ink/60 leading-relaxed font-medium">
                  The initial identity of VitaMotus is intentionally focused. Rather than diluting our research across the entire animal kingdom, we have dedicated our first build exclusively to spiders. This allow us to build a robust, comprehensive taxonomy skeleton (Family → Genus → Species) that serves as the foundation for the entire archive.
                </p>
                <div className="p-10 bg-white/50 border border-ink/5 rounded-3xl space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Current Archive Status</h4>
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <span className="block text-2xl font-serif text-ink">138</span>
                      <span className="text-[9px] uppercase tracking-tighter text-ink/40">Families</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-serif text-ink">4,300+</span>
                      <span className="text-[9px] uppercase tracking-tighter text-ink/40">Genera</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-serif text-ink">52,000+</span>
                      <span className="text-[9px] uppercase tracking-tighter text-ink/40">Species</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Educational Growth */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 border-t border-ink/5">
              <div className="md:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-moss">Future Vision</span>
              </div>
              <div className="md:col-span-2 space-y-8">
                <h3 className="text-3xl font-serif text-ink">A Living Natural-History Archive</h3>
                <p className="text-lg text-ink/60 leading-relaxed font-medium">
                  VitaMotus is not a fixed brochure; it is a growing organism. As our database expands, we will continue to enrich species profiles with high-resolution imagery, range maps, identification notes, and conservation status data.
                </p>
                <div className="pt-8">
                  <Link href="/families" className="inline-flex items-center gap-10 px-12 py-6 bg-ink text-parchment rounded-2xl font-bold hover:bg-moss transition-all duration-500 group shadow-2xl">
                    <span className="uppercase tracking-[0.4em] text-[11px]">Explore the Archive</span>
                    <div className="w-12 h-[1px] bg-parchment/20 group-hover:w-20 group-hover:bg-parchment transition-all duration-500" />
                  </Link>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
