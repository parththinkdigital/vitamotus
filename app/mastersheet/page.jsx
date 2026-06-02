'use client';

import { useState, useEffect, useCallback } from 'react';
import { taxonomyApi } from '@/lib/api';
import MainLayout from '@/components/layout/MainLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react';

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

const COLUMNS = [
  { key: 'family_name', label: 'Family', sortable: true },
  { key: 'genus_name', label: 'Genus', sortable: true },
  { key: 'scientific_name', label: 'Species', sortable: true },
  { key: 'authority', label: 'Authority', sortable: true },
  { key: 'year', label: 'Year', sortable: true },
  { key: 'distribution', label: 'Distribution', sortable: true },
];

function StatusBadge({ status, type }) {
  const base = 'px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-full';
  if (type === 'taxon') {
    switch (status) {
      case 'VALID': return <span className={`${base} bg-moss/10 text-moss`}>{status}</span>;
      case 'INVALID': return <span className={`${base} bg-red-50 text-red-400`}>{status}</span>;
      case 'SYNONYM': return <span className={`${base} bg-amber/10 text-amber`}>{status}</span>;
      default: return <span className={`${base} bg-ink/5 text-ink/30`}>{status}</span>;
    }
  }
  switch (status) {
    case 'complete': return <span className={`${base} bg-moss/10 text-moss`}>{status}</span>;
    case 'taxonomy_only': return <span className={`${base} bg-clay/10 text-clay`}>{status}</span>;
    case 'draft': return <span className={`${base} bg-ink/5 text-ink/30`}>{status}</span>;
    default: return <span className={`${base} bg-ink/5 text-ink/30`}>{status}</span>;
  }
}

export default function MasterSheetPage() {
  const [data, setData] = useState([]);
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  const [search, setSearch] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [taxonStatus, setTaxonStatus] = useState('');
  const [profileStatus, setProfileStatus] = useState('');
  const [sortBy, setSortBy] = useState('family_name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

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

  const loadData = async (params) => {
    setLoading(true);
    try {
      const res = await taxonomyApi.getMasterSheet(params);
      setData(res.data);
      setMeta(res);
      setError(null);
    } catch (err) {
      setError('The archive is currently undergoing maintenance. Please try again shortly.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoad = useCallback(
    debounce((params) => loadData(params), 500),
    []
  );

  useEffect(() => {
    const params = { page, sort_by: sortBy, sort_dir: sortDir };
    if (search) params.search = search;
    if (familyId) params.family_id = familyId;
    if (taxonStatus) params.taxon_status = taxonStatus;
    if (profileStatus) params.profile_status = profileStatus;

    if (search) {
      debouncedLoad(params);
    } else {
      loadData(params);
    }
  }, [search, familyId, taxonStatus, profileStatus, sortBy, sortDir, page]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
    setPage(1);
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) {
      return <ArrowUpDown className="w-3 h-3 inline-block ml-1.5 opacity-25 group-hover:opacity-60 transition-opacity" />;
    }
    return sortDir === 'asc'
      ? <ArrowUp className="w-3 h-3 inline-block ml-1.5 text-moss" />
      : <ArrowDown className="w-3 h-3 inline-block ml-1.5 text-moss" />;
  };

  const slugify = (name) => name?.replace(/ /g, '-').toLowerCase();

  return (
    <MainLayout>
      <div className="relative min-h-screen bg-parchment pt-32 pb-32 overflow-hidden selection:bg-moss/20">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-1/4 right-0 flex flex-col items-end opacity-10 rotate-90 origin-right">
            <span className="text-[140px] font-serif tracking-tighter uppercase pointer-events-none">Master_Catalog</span>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-5">
          <header className="space-y-10 mb-16">
            <ChapterHeading
              title="Master Sheet"
              subtitle="A comprehensive, sortable inventory of every cataloged spider species in the archive."
            />

            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between p-2 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-ink/5 shadow-sm">
              <div className="relative flex-1 w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-ink/40 transition-colors pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by name, family, or genus..."
                  className="w-full bg-transparent border-none px-14 py-5 text-ink placeholder:text-ink/20 focus:outline-none font-serif italic text-lg"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-3 px-4 lg:pl-0">
                <select
                  className="bg-transparent border border-ink/10 rounded-xl px-4 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-ink/60 focus:outline-none appearance-none cursor-pointer transition-colors hover:border-moss/30"
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

                <select
                  className="bg-transparent border border-ink/10 rounded-xl px-4 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-ink/60 focus:outline-none appearance-none cursor-pointer transition-colors hover:border-moss/30"
                  value={taxonStatus}
                  onChange={(e) => {
                    setTaxonStatus(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All Status</option>
                  <option value="VALID">Valid</option>
                  <option value="SYNONYM">Synonym</option>
                  <option value="INVALID">Invalid</option>
                </select>

                <select
                  className="bg-transparent border border-ink/10 rounded-xl px-4 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-ink/60 focus:outline-none appearance-none cursor-pointer transition-colors hover:border-moss/30"
                  value={profileStatus}
                  onChange={(e) => {
                    setProfileStatus(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All Profiles</option>
                  <option value="complete">Complete</option>
                  <option value="taxonomy_only">Taxonomy Only</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-ink/5 pb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-moss">
                Master Catalog{' '}
                <span className="text-ink/20 ml-2">
                  [{meta?.total?.toLocaleString() || 0} Specimens Cataloged]
                </span>
              </p>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-moss" />
                <div className="w-1.5 h-1.5 rounded-full bg-ink/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-ink/10" />
              </div>
            </div>
          </header>

          {error ? (
            <div className="py-32 text-center space-y-8">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl text-red-300 font-serif italic">!</span>
              </div>
              <p className="text-xl font-serif text-ink italic opacity-40 max-w-md mx-auto">{error}</p>
            </div>
          ) : (
            <>
              <div className="w-full rounded-[2rem] border border-ink/5 bg-white/40 backdrop-blur-xl shadow-sm">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="border-b border-ink/5">
                      {COLUMNS.map(col => (
                        <th
                          key={col.key}
                          className={`
                            group px-4 py-4 text-left
                            ${col.sortable ? 'cursor-pointer select-none hover:bg-white/40 transition-colors' : ''}
                          `}
                          onClick={() => col.sortable && handleSort(col.key)}
                          scope="col"
                        >
                          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-ink/40 flex items-center gap-1">
                            {col.label}
                            {col.sortable && <SortIcon column={col.key} />}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    <AnimatePresence mode="wait">
                      {loading ? (
                        Array.from({ length: 10 }).map((_, i) => (
                          <tr key={`sk-${i}`} className="animate-pulse">
                            {COLUMNS.map(col => (
                              <td key={col.key} className="px-4 py-3">
                                <div className={`h-4 bg-ink/5 rounded-full ${i % 2 === 0 ? 'w-3/4' : 'w-1/2'}`} />
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : data.length === 0 ? (
                        <tr>
                          <td colSpan={COLUMNS.length} className="px-6 py-24 text-center">
                            <div className="space-y-4">
                              <p className="text-lg font-serif italic text-ink/30">No records match your query</p>
                              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20">
                                Try adjusting your search or filters
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        data.map((row, index) => (
                          <motion.tr
                            key={row.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.02 }}
                            className="group transition-colors hover:bg-white/40"
                          >
                            <td className="px-4 py-3 w-1/5">
                              {row.family_name ? (
                                <Link
                                  href={`/family/${slugify(row.family_name)}`}
                                  className="text-sm text-ink/80 hover:text-moss transition-colors font-medium"
                                >
                                  {row.family_name}
                                </Link>
                              ) : (
                                <span className="text-sm text-ink/20 italic">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 w-1/6">
                              {row.genus_name ? (
                                <Link
                                  href={`/genus/${slugify(row.genus_name)}`}
                                  className="text-sm text-ink/70 hover:text-moss transition-colors"
                                >
                                  <span className="italic">{row.genus_name}</span>
                                </Link>
                              ) : (
                                <span className="text-sm text-ink/20 italic">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 w-1/4">
                              <Link
                                href={`/species/${row.scientific_name.replace(/ /g, '-')}`}
                                className="text-sm text-ink hover:text-moss transition-colors"
                              >
                                <span className="italic">{row.scientific_name.split(' ')[0]}</span>{' '}
                                <span>{row.scientific_name.split(' ').slice(1).join(' ')}</span>
                              </Link>
                              {row.subspecies && (
                                <span className="ml-1 text-ink/30 text-xs">subsp. {row.subspecies}</span>
                              )}
                            </td>
                            <td className="px-4 py-3 w-1/5">
                              <span className="text-sm text-ink/50">{row.authority || <span className="text-ink/20 italic">—</span>}</span>
                            </td>
                            <td className="px-4 py-3 w-[5rem]">
                              <span className="text-sm font-mono text-ink/40">{row.year || '—'}</span>
                            </td>
                            <td className="px-4 py-3 w-1/5">
                              <span className="text-sm text-ink/50 truncate block max-w-[180px]" title={row.distribution}>
                                {row.distribution || <span className="text-ink/20 italic">Unknown</span>}
                              </span>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {meta && meta.last_page > 1 && (
                <div className="mt-16 flex justify-center items-center gap-8 border-t border-ink/5 pt-12">
                  <button
                    onClick={() => {
                      setPage(p => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={page === 1}
                    className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] disabled:opacity-10 transition-all cursor-pointer"
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
                    className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] disabled:opacity-10 transition-all cursor-pointer"
                  >
                    Next
                    <span className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-ink group-hover:text-parchment transition-all">→</span>
                  </button>
                </div>
              )}

              <div className="mt-8 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-ink/20">
                  Showing {meta?.from || 0}–{meta?.to || 0} of {meta?.total?.toLocaleString() || 0} species
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
