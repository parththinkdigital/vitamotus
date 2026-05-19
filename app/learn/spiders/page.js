'use client';

import MainLayout from '@/components/layout/MainLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { motion } from 'framer-motion';

export default function LearnSpidersPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-parchment pt-32 pb-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <ChapterHeading 
            title="Start with Spiders" 
            subtitle="Understanding the fundamental nature of arachnids." 
          />

          <div className="mt-24 space-y-32">
            
            {/* Section 1: Definition */}
            <section className="space-y-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-moss" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-moss">The Definition</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <h3 className="text-4xl font-serif text-ink leading-tight">
                  What exactly is a spider?
                </h3>
                <p className="text-lg text-ink/60 leading-relaxed font-medium">
                  Spiders are eight-legged predatory invertebrates that belong to the class <strong>Arachnida</strong> and the order <strong>Araneae</strong>. While often confused with insects, they are part of a distinct evolutionary lineage that dates back over 300 million years.
                </p>
              </div>
            </section>

            {/* Section 2: Spider vs Insect */}
            <section className="p-12 md:p-20 bg-ink text-parchment rounded-[3rem] space-y-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 opacity-5">
                 <span className="text-[200px] font-serif italic">Vs</span>
              </div>

              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-serif mb-12">Spiders vs. Insects</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Spiders */}
                  <div className="space-y-8 p-10 border border-parchment/10 rounded-3xl bg-white/5">
                    <h4 className="text-2xl font-serif text-moss italic">Spiders (Arachnids)</h4>
                    <ul className="space-y-4 text-parchment/60 font-medium">
                      <li className="flex gap-4">
                        <span className="text-moss">01.</span>
                        <span>Two body segments (Cephalothorax and Abdomen).</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="text-moss">02.</span>
                        <span>Eight walking legs.</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="text-moss">03.</span>
                        <span>No antennae or wings.</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="text-moss">04.</span>
                        <span>Simple eyes (usually 8).</span>
                      </li>
                    </ul>
                  </div>

                  {/* Insects */}
                  <div className="space-y-8 p-10 border border-parchment/10 rounded-3xl opacity-50">
                    <h4 className="text-2xl font-serif text-parchment italic">Insects</h4>
                    <ul className="space-y-4 text-parchment/60 font-medium">
                      <li className="flex gap-4">
                        <span>01.</span>
                        <span>Three body segments (Head, Thorax, Abdomen).</span>
                      </li>
                      <li className="flex gap-4">
                        <span>02.</span>
                        <span>Six walking legs.</span>
                      </li>
                      <li className="flex gap-4">
                        <span>03.</span>
                        <span>Usually possess antennae and wings.</span>
                      </li>
                      <li className="flex gap-4">
                        <span>04.</span>
                        <span>Compound eyes.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: The Silk Master */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
               <div className="md:col-span-1 aspect-square bg-moss/10 rounded-3xl border border-moss/20 flex items-center justify-center">
                  <span className="text-[120px] opacity-10">🕸️</span>
               </div>
               <div className="md:col-span-2 space-y-8">
                 <h3 className="text-4xl font-serif text-ink italic">The Silk Masters</h3>
                 <p className="text-lg text-ink/60 leading-relaxed font-medium">
                   The most defining characteristic of spiders is their ability to produce silk. Using specialized organs called <strong>spinnerets</strong>, they create proteins that are stronger than steel by weight. While not all spiders build webs, almost all use silk for draglines, egg sacs, or sensory tripwires.
                 </p>
               </div>
            </section>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
