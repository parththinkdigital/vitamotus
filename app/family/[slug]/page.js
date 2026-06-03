'use client';

import { useState, useEffect } from 'react';
import { taxonomyApi } from '@/lib/api';
import MainLayout from '@/components/layout/MainLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function FamilyDetailPage() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFamily() {
      try {
        const result = await taxonomyApi.getFamily(params.slug);
        setData(result);
      } catch (err) {
        setError('Family record not found.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFamily();
  }, [params.slug]);

  if (loading) return (
    <MainLayout>
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-moss border-t-transparent rounded-full animate-spin" />
      </div>
    </MainLayout>
  );

  if (error || !data) return (
    <MainLayout>
      <div className="min-h-screen bg-parchment flex items-center justify-center p-8">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-serif text-ink">{error || 'Data Unavailable'}</h2>
          <Link href="/families" className="inline-block px-8 py-3 bg-moss text-parchment rounded-xl font-bold uppercase tracking-widest text-[10px]">
            Return to Directory
          </Link>
        </div>
      </div>
    </MainLayout>
  );

  const { family, genera } = data;

  return (
    <MainLayout>
      <div className="relative min-h-screen bg-parchment overflow-hidden selection:bg-moss/20">
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
          
          {/* Scientific Watermarks */}
          <div className="absolute top-40 right-20 flex flex-col items-end opacity-20 rotate-90 origin-right">
             <span className="text-[10px] font-mono tracking-[0.5em] uppercase">Archive_Ref // {family.id}</span>
          </div>
        </div>

        <div className="relative z-10 pt-32 pb-20 px-6 md:px-16 max-w-[1800px] mx-auto">
          
          {/* ─── HERO SECTION: KINETIC TAXONOMY ─── */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-32 border-b border-ink/10 pb-20">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="h-[1px] w-12 bg-moss" />
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-moss">Taxonomic Family Detail</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-7xl md:text-9xl font-serif text-ink italic leading-none tracking-tighter mb-10"
              >
                {family.name}<span className="text-moss">.</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-x-12 gap-y-6"
              >
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-ink/30 block">Authority Record</span>
                  <p className="text-xl font-serif italic text-ink/60">
                    Described by {family.authority || 'Unknown'}
                  </p>
                </div>
                <div className="w-[1px] h-10 bg-ink/10 hidden md:block" />
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-ink/30 block">First Cataloged</span>
                  <p className="text-xl font-serif italic text-ink/60">Circa {family.year || 'N/A'}</p>
                </div>
              </motion.div>

              {family.description && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-xl text-ink/70 leading-relaxed max-w-2xl mt-12 font-medium"
                >
                  {family.description}
                </motion.p>
              )}
            </div>
            
            {/* Scientific HUD Stats */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/40 backdrop-blur-2xl border border-ink/5 p-10 rounded-[2.5rem] flex gap-16 shadow-2xl"
            >
               <div className="flex flex-col items-center gap-1">
                 <span className="text-4xl font-serif text-ink">{family.genus_count}</span>
                 <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink/30">Total Genera</span>
               </div>
               <div className="flex flex-col items-center gap-1">
                 <span className="text-4xl font-serif text-ink">{family.species_count}</span>
                 <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink/30">Total Species</span>
               </div>
            </motion.div>
          </div>

          {/* ─── CONTENT GRID ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Sidebar: Archivist Notes */}
            <div className="lg:col-span-3 space-y-12">
              <div className="p-10 bg-ink text-parchment rounded-[2rem] space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-[1px] bg-parchment/30" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-parchment/60">Archivist's Note</h4>
                  </div>
                  <p className="text-sm font-serif italic leading-relaxed text-parchment/80">
                    "The family {family.name} represents a major evolutionary branch. All records listed here are cross-referenced with the World Spider Catalog for taxonomic precision."
                  </p>
                </div>

                <Link 
                  href="/families"
                  className="relative z-10 flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-[0.3em]"
                >
                  Return to Archive
                  <span>→</span>
                </Link>
              </div>

              <div className="p-10 border border-ink/10 rounded-[2rem] space-y-6">
                 <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-ink/20">Protocol Log</span>
                 <div className="space-y-4">
                    {[
                      { l: "Status", v: "Verified" },
                      { l: "Diversity", v: "High" },
                      { l: "Region", v: "Global" }
                    ].map(item => (
                      <div key={item.l} className="flex justify-between items-center py-2 border-b border-ink/5">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-ink/40">{item.l}</span>
                        <span className="text-[10px] font-mono text-moss">{item.v}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Main Content: Genera Catalog */}
            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-ink/40">Accepted Genera Catalog</h3>
                <div className="flex items-center gap-4">
                   <span className="text-[9px] font-mono text-ink/20 italic">Sorted: Alpha_Asc</span>
                   <div className="h-[1px] w-20 bg-ink/10" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {genera.map((genus, index) => (
                    <motion.div
                      key={genus.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.8 }}
                    >
                      <Link 
                        href={`/genus/${genus.name}`}
                        className="group relative flex flex-col p-8 bg-white/40 backdrop-blur-xl border border-ink/5 rounded-[2rem] hover:border-moss/30 hover:shadow-2xl hover:shadow-moss/5 transition-all duration-500 overflow-hidden"
                      >
                        {/* Interactive Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-moss/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative z-10 flex justify-between items-start mb-8">
                          <span className="text-[9px] font-mono text-ink/20">GEN_{genus.id.toString().padStart(4, '0')}</span>
                          <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-ink/20 group-hover:bg-moss group-hover:text-parchment transition-all duration-500">
                             <span className="text-[10px] font-bold">→</span>
                          </div>
                        </div>

                        <div className="relative z-10 space-y-2">
                          <h4 className="font-serif text-2xl text-ink italic group-hover:text-moss transition-colors duration-500">{genus.name}</h4>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Diversity Count</span>
                            <div className="h-[1px] flex-grow bg-ink/5" />
                            <span className="text-xs font-mono text-moss">{genus.species_count}</span>
                          </div>
                        </div>

                        {/* Technical Motif */}
                        <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                           <svg width="40" height="40" viewBox="0 0 40 40">
                              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                           </svg>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
