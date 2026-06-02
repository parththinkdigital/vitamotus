'use client';

import { useState, useEffect, useCallback } from 'react';
import { taxonomyApi, getImageUrl } from '@/lib/api';
import MainLayout from '@/components/layout/MainLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Native debounce implementation
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function SpeciesPage() {
  const [species, setSpecies] = useState([]);
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [page, setPage] = useState(1);

  // Load Families for filter
  useEffect(() => {
    async function loadFamilies() {
      try {
        const data = await taxonomyApi.getFamilies();
        setFamilies(data);
      } catch (err) {
        console.error('Failed to load families:', err);
      }
    }
    loadFamilies();
  }, []);

  const loadSpecies = async (params) => {
    setLoading(true);
    try {
      const data = await taxonomyApi.getSpecies(params);
      setSpecies(data.data);
      setMeta(data);
      setError(null);
    } catch (err) {
      setError('The archive is currently undergoing maintenance. Please try again shortly.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoad = useCallback(
    debounce((params) => loadSpecies(params), 500),
    []
  );

  useEffect(() => {
    const params = { page };
    if (search) params.search = search;
    if (familyId) params.family_id = familyId;
    
    if (search) {
      debouncedLoad(params);
    } else {
      loadSpecies(params);
    }
  }, [search, familyId, page, debouncedLoad]);

  return (
    <MainLayout>
      <div className="relative min-h-screen bg-parchment pt-32 pb-32 overflow-hidden selection:bg-moss/20">
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
          <div className="absolute top-1/4 right-0 flex flex-col items-end opacity-10 rotate-90 origin-right">
             <span className="text-[140px] font-serif tracking-tighter uppercase pointer-events-none">Taxonomy_Archive</span>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
          <header className="space-y-10 mb-20">
            <ChapterHeading 
              title="Species Archive" 
              subtitle="The definitive digital catalog of global arachnid taxonomy." 
            />
            
            {/* Elegant Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between p-2 bg-parchment/80 backdrop-blur-xl rounded-[2rem] border border-ink/5 shadow-sm">
                <div className="relative flex-1 w-full group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </span>
                    <input 
                        type="text"
                        placeholder="Search scientific records..."
                        className="w-full bg-transparent border-none px-14 py-5 text-ink placeholder:text-ink/20 focus:outline-none font-serif italic text-lg"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
                
                <div className="h-10 w-[1px] bg-ink/5 hidden lg:block" />

                <div className="lg:w-80 w-full px-4">
                    <select 
                        className="w-full bg-transparent border-none py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/60 focus:outline-none appearance-none cursor-pointer"
                        value={familyId}
                        onChange={(e) => {
                            setFamilyId(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="">All Families</option>
                        {families.map(f => (
                            <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                    </select>
                </div>
            </div>
          </header>

          {/* Directory Content */}
          {error ? (
            <div className="py-32 text-center space-y-8">
               <div className="w-20 h-20 bg-moss/10 rounded-full flex items-center justify-center mx-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#496B4A" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
               </div>
               <p className="text-xl font-serif text-ink italic opacity-40 max-w-md mx-auto">{error}</p>
            </div>
          ) : (
            <div className="space-y-12">
               <div className="flex justify-between items-center border-b border-ink/5 pb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-moss">
                     Archive Index <span className="text-ink/20 ml-2">[{meta?.total || 0} Specimens Cataloged]</span>
                  </p>
                  <div className="flex gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-moss" />
                     <div className="w-1.5 h-1.5 rounded-full bg-ink/10" />
                     <div className="w-1.5 h-1.5 rounded-full bg-ink/10" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {loading ? (
                    [...Array(6)].map((_, i) => (
                      <div key={`shimmer-${i}`} className="aspect-[4/5] bg-moss/60 rounded-[3rem] motion-safe:animate-pulse" />
                    ))
                  ) : (
                    species.map((item, index) => {
                      const hasImage = item.profile?.photo_gallery_urls?.length > 0;
                      return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: index * 0.04 }}
                      >
                        <Link 
                          href={`/species/${item.scientific_name.replace(/ /g, '-')}`}
                          className="group block aspect-[4/5] bg-moss rounded-[3rem] p-10 relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_0_1px_rgba(244,234,215,0.15),0_20px_40px_-8px_rgba(0,0,0,0.2)] active:scale-[0.98]"
                        >
                          {/* Card Background Hint - only when real images exist */}
                          {hasImage && (
                            <div className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.12] transition-all duration-700 group-hover:scale-105">
                               <img 
                                 src={getImageUrl(item)} 
                                 alt="" 
                                 className="w-full h-full object-cover"
                               />
                            </div>
                          )}

                          <div className="relative h-full flex flex-col justify-between z-10">
                             <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                   <span className="text-[9px] font-bold uppercase tracking-widest text-parchment/40 block">
                                      {item.family.name}
                                   </span>
                                   <span className="text-[8px] font-bold uppercase tracking-widest text-parchment/20 block">
                                      Genus: {item.genus.name}
                                   </span>
                                </div>
                                <div className="w-10 h-10 rounded-2xl bg-parchment/10 flex items-center justify-center border border-parchment/10 group-hover:bg-parchment group-hover:text-moss transition-all duration-300">
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                                </div>
                             </div>

                             <div className="space-y-6">
                                <div className="space-y-2">
                                   <h3 className="text-3xl font-serif text-parchment italic leading-tight">
                                      {item.scientific_name}
                                   </h3>
                                   <p className="text-[10px] font-bold text-parchment/30 uppercase tracking-[0.3em]">
                                      {item.authority} {item.year}
                                   </p>
                                </div>

                                <div className="pt-6 border-t border-parchment/10 space-y-3">
                                   <div className="flex items-center gap-2">
                                      <div className="w-1 h-1 rounded-full bg-parchment/30" />
                                      <span className="text-[10px] text-parchment/30 font-medium truncate italic">{item.distribution || 'Global Archive'}</span>
                                   </div>
                                   <div className="flex gap-2">
                                      {item.profile_status === 'complete' && (
                                         <span className="px-3 py-1 bg-parchment/10 text-parchment/60 text-[8px] font-bold uppercase tracking-widest rounded-full">Detailed Profile</span>
                                      )}
                                      <span className="px-3 py-1 bg-parchment/5 text-parchment/30 text-[8px] font-bold uppercase tracking-widest rounded-full">{item.taxon_status}</span>
                                   </div>
                                </div>
                             </div>
                          </div>
                        </Link>
                      </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
               </div>

               {/* Pagination */}
               {meta && meta.last_page > 1 && (
                <div className="mt-20 flex justify-center items-center gap-8 border-t border-ink/5 pt-12">
                  <button 
                    onClick={() => {
                        setPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={page === 1}
                    className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] disabled:opacity-10 transition-all"
                  >
                    <span className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-ink group-hover:text-parchment transition-all">←</span>
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-4 px-8 border-x border-ink/5">
                     <span className="font-serif italic text-lg text-ink/20">{page}</span>
                     <div className="w-8 h-[1px] bg-ink/10" />
                     <span className="font-serif italic text-lg text-ink/60">{meta.last_page}</span>
                  </div>

                  <button 
                    onClick={() => {
                        setPage(p => Math.min(meta.last_page, p + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={page === meta.last_page}
                    className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] disabled:opacity-10 transition-all"
                  >
                    Next
                    <span className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-ink group-hover:text-parchment transition-all">→</span>
                  </button>
                </div>
               )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
