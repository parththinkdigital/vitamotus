'use client';

import { useState, useEffect } from 'react';
import { taxonomyApi, adminApi } from '@/lib/api';
import AdminLayout from '@/components/layout/AdminLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminSpeciesList() {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);

  const loadSpecies = async () => {
    setLoading(true);
    try {
      const data = await taxonomyApi.getSpecies({ search, page });
      setSpecies(data.data);
      setMeta(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecies();
  }, [page]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this species?')) return;
    try {
      await adminApi.deleteSpecies(id);
      toast.success('Species deleted successfully.');
      loadSpecies();
    } catch (err) {
      toast.error('Failed to delete species: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <ChapterHeading 
              title="Species Management" 
              subtitle="Edit or remove specimen records from the global taxonomy archive." 
            />
            <Link 
              href="/admin/species/new"
              className="px-8 py-4 bg-ink text-parchment rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-moss transition-all"
            >
              + Add New Species
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 bg-white/50 p-4 rounded-2xl border border-ink/5">
             <input 
               type="text"
               placeholder="Search by scientific name..."
               className="flex-1 bg-white border border-ink/10 rounded-xl px-6 py-3 text-ink focus:outline-none focus:border-moss/40"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && loadSpecies()}
             />
             <button 
               onClick={loadSpecies}
               className="px-8 py-3 bg-ink/5 text-ink rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-ink hover:text-parchment transition-all"
             >
               Search
             </button>
          </div>

          <div className="bg-white border border-ink/5 rounded-[2.5rem] overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-ink/5">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-ink/40">Species</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-ink/40">Family</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-ink/40">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-ink/40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {species.map((item) => (
                  <tr key={item.id} className="hover:bg-ink/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-serif italic text-lg text-ink">{item.scientific_name}</p>
                      <p className="text-[10px] text-ink/30 uppercase tracking-widest">{item.authority} {item.year}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[11px] font-bold text-moss uppercase tracking-widest">{item.family.name}</span>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-[9px] px-3 py-1 rounded-full bg-ink/5 text-ink/40 uppercase tracking-tighter">
                         {item.taxon_status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right space-x-4">
                      <Link 
                        href={`/admin/species/${item.id}/edit`}
                        className="text-[10px] font-bold text-moss uppercase tracking-widest hover:underline"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta && meta.last_page > 1 && (
            <div className="flex justify-center items-center gap-6">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-4 rounded-xl border border-ink/10 disabled:opacity-20 hover:bg-ink hover:text-parchment transition-all"
              >←</button>
              <span className="text-sm font-mono">Page {page} of {meta.last_page}</span>
              <button 
                disabled={page === meta.last_page}
                onClick={() => setPage(p => p + 1)}
                className="p-4 rounded-xl border border-ink/10 disabled:opacity-20 hover:bg-ink hover:text-parchment transition-all"
              >→</button>
            </div>
          )}

        </div>
    </AdminLayout>
  );
}
