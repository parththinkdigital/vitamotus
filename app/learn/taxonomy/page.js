'use client';

import MainLayout from '@/components/layout/MainLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { motion } from 'framer-motion';

export default function LearnTaxonomyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-parchment pt-32 pb-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <ChapterHeading 
            title="Taxonomy & Naming" 
            subtitle="The language of biological classification." 
          />

          <div className="mt-24 space-y-32">
            
            {/* The Tree of Life */}
            <section className="space-y-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-moss" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-moss">The Hierarchy</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <h3 className="text-4xl font-serif text-ink italic leading-tight">
                  How are spiders classified?
                </h3>
                <p className="text-lg text-ink/60 leading-relaxed font-medium">
                  Biological taxonomy is the system used to group and name organisms. Spiders are classified within a descending hierarchy that moves from broad categories to individual species.
                </p>
              </div>

              {/* Visual Tree */}
              <div className="mt-16 space-y-4">
                 {[
                   { rank: 'Order', name: 'Araneae', desc: 'All spiders' },
                   { rank: 'Family', name: 'Salticidae', desc: 'Jumping Spiders' },
                   { rank: 'Genus', name: 'Phidippus', desc: 'A group of related species' },
                   { rank: 'Species', name: 'Phidippus audax', desc: 'The Bold Jumper' },
                 ].map((item, i) => (
                   <div key={item.rank} className="flex items-center gap-8" style={{ marginLeft: `${i * 32}px` }}>
                      <div className="w-2 h-2 rounded-full bg-moss" />
                      <div className="p-6 bg-white border border-ink/5 rounded-2xl flex-1 flex justify-between items-center group hover:border-moss/30 transition-all">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30 block mb-1">{item.rank}</span>
                          <span className="text-xl font-serif text-ink italic">{item.name}</span>
                        </div>
                        <span className="text-sm text-ink/40 italic">{item.desc}</span>
                      </div>
                   </div>
                 ))}
              </div>
            </section>

            {/* Scientific Naming */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-20 border-t border-ink/5">
               <div className="md:col-span-1">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-moss">The Binomial System</span>
               </div>
               <div className="md:col-span-2 space-y-10">
                 <h3 className="text-4xl font-serif text-ink">Reading a Scientific Name</h3>
                 <p className="text-lg text-ink/60 leading-relaxed font-medium">
                   Every species has a two-part name (Binomial). The first part is the <strong>Genus</strong> (capitalized) and the second is the <strong>Specific Epithet</strong> (lowercase). Both are traditionally written in italics.
                 </p>
                 
                 {/* Annotation Card */}
                 <div className="p-12 bg-ink text-parchment rounded-[3rem] text-center relative">
                    <div className="space-y-4">
                      <span className="text-5xl md:text-7xl font-serif italic">
                        <span className="text-moss">Poecilotheria</span> <span className="text-parchment">metallica</span>
                      </span>
                      <p className="text-parchment/40 font-serif italic text-xl mt-4">Pocock, 1899</p>
                    </div>
                    
                    <div className="mt-12 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-widest font-bold">
                       <div className="space-y-2">
                         <div className="h-[1px] bg-moss w-full" />
                         <span className="text-moss">Genus</span>
                       </div>
                       <div className="space-y-2">
                         <div className="h-[1px] bg-parchment/30 w-full" />
                         <span>Epithet</span>
                       </div>
                       <div className="space-y-2">
                         <div className="h-[1px] bg-parchment/30 w-full" />
                         <span className="text-parchment/40">Authority</span>
                       </div>
                    </div>
                 </div>
               </div>
            </section>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
