'use client';

import { useState, useEffect } from 'react';
import { taxonomyApi } from '@/lib/api';
import MainLayout from '@/components/layout/MainLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FamiliesPage() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFamilies() {
      try {
        const data = await taxonomyApi.getFamilies();
        setFamilies(data);
      } catch (err) {
        setError('Failed to load taxonomy data. Please ensure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFamilies();
  }, []);

  return (
    <MainLayout>
      <div className="min-h-screen bg-parchment pt-32 pb-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <ChapterHeading 
            title="Spider Families" 
            subtitle="The fundamental branches of arachnid evolution." 
          />

          {loading ? (
            <div className="mt-20 flex justify-center">
              <div className="w-10 h-10 border-4 border-moss border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="mt-20 p-8 border border-red-200 bg-red-50 text-red-800 rounded-2xl text-center">
              {error}
            </div>
          ) : (
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {families.map((family, index) => (
                <motion.div
                  key={family.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Link 
                    href={`/family/${family.name}`}
                    className="group block p-8 bg-white border border-ink/5 rounded-2xl hover:border-moss/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-moss">Family</span>
                        <span className="text-[10px] font-mono text-ink/30">#{family.id}</span>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-serif text-ink group-hover:text-moss transition-colors">
                          {family.name}
                        </h3>
                        <p className="text-[10px] text-ink/40 uppercase tracking-widest mt-1">
                          {family.authority} {family.year}
                        </p>
                      </div>

                      <div className="pt-4 grid grid-cols-2 gap-4 border-t border-ink/5">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-tighter text-ink/40">Genera</span>
                          <p className="font-bold text-ink">{family.genus_count}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-tighter text-ink/40">Species</span>
                          <p className="font-bold text-ink">{family.species_count}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
