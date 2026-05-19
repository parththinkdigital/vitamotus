'use client';

import { useState, useEffect, useCallback } from 'react';
import { taxonomyApi, adminApi } from '@/lib/api';
import AdminLayout from '@/components/layout/AdminLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { toast } from 'sonner';

export default function AdminGeneraPage() {
  const [genera, setGenera] = useState([]);
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', family_id: '', authority: '', year: '', description: '' });
  
  // Filtering & Pagination
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);

  const loadFamilies = async () => {
    const familiesRes = await taxonomyApi.getFamilies();
    setFamilies(familiesRes);
  };

  const loadGenera = async () => {
    setLoading(true);
    try {
      const data = await taxonomyApi.getGenera({ search, page });
      setGenera(data.data);
      setMeta(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFamilies();
  }, []);

  useEffect(() => {
    loadGenera();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadGenera();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await adminApi.updateGenus(editing.id, formData);
        toast.success('Genus updated successfully.');
      } else {
        await adminApi.createGenus(formData);
        toast.success('Genus added successfully.');
      }
      setEditing(null);
      setFormData({ name: '', family_id: '', authority: '', year: '', description: '' });
      loadGenera();
    } catch (err) { 
      toast.error('Operation failed: ' + (err.message || 'Unknown error')); 
    }
  };

  const handleEdit = (genus) => {
    setEditing(genus);
    setFormData({ 
        name: genus.name, 
        family_id: genus.family_id,
        authority: genus.authority || '', 
        year: genus.year || '',
        description: genus.description || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <ChapterHeading title={editing ? "Edit Genus" : "New Genus"} subtitle="Manage the secondary taxonomic level." />
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-ink/5 space-y-6 sticky top-8">
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-4">Parent Family</label>
                <select 
                  className="w-full bg-parchment/20 px-6 py-4 rounded-xl text-sm border border-ink/5 appearance-none focus:outline-none"
                  value={formData.family_id}
                  onChange={(e) => setFormData({...formData, family_id: e.target.value})}
                  required
                >
                  <option value="">Select Family</option>
                  {families.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-4">Genus Name</label>
                <input 
                  className="w-full bg-parchment/20 px-6 py-4 rounded-xl text-ink font-serif italic text-lg border border-ink/5 focus:outline-none focus:border-moss/40"
                  placeholder="e.g. Missulena"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="flex gap-4">
                <input 
                  className="flex-1 bg-parchment/20 px-6 py-3 rounded-xl text-sm border border-ink/5"
                  placeholder="Authority"
                  value={formData.authority}
                  onChange={(e) => setFormData({...formData, authority: e.target.value})}
                />
                <input 
                  className="w-20 bg-parchment/20 px-6 py-3 rounded-xl text-sm border border-ink/5"
                  placeholder="Year"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-4">Genus Description</label>
                <textarea 
                  className="w-full bg-parchment/20 px-6 py-4 rounded-xl text-sm border border-ink/5 focus:outline-none focus:border-moss/40 min-h-[100px]"
                  placeholder="Describe the genus characteristics..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full py-4 bg-ink text-parchment rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-moss transition-all">
                {editing ? 'Update Genus' : 'Add Genus'}
              </button>
              {editing && (
                <button 
                  type="button"
                  onClick={() => {setEditing(null); setFormData({name:'', family_id:'', authority:'', year:'', description:''})}}
                  className="w-full text-[9px] font-bold uppercase tracking-widest text-ink/20 hover:text-ink transition-colors"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSearch} className="flex gap-4 bg-white/50 p-4 rounded-2xl border border-ink/5">
                <input 
                  type="text"
                  placeholder="Search genera..."
                  className="flex-1 bg-white border border-ink/10 rounded-xl px-6 py-3 text-ink focus:outline-none focus:border-moss/40"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="px-8 py-3 bg-ink text-parchment rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-moss transition-all">
                  Search
                </button>
            </form>

            <div className="bg-white border border-ink/5 rounded-[2.5rem] overflow-hidden">
               <table className="w-full">
                  <thead className="bg-ink/5">
                    <tr>
                      <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-ink/30 text-left">Genus</th>
                      <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-ink/30 text-left">Family</th>
                      <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-ink/30 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {loading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={3} className="px-8 py-6 h-20 bg-ink/[0.01]" />
                        </tr>
                      ))
                    ) : genera.map(g => (
                      <tr key={g.id} className="hover:bg-ink/[0.01] transition-colors">
                        <td className="px-8 py-4">
                          <p className="font-serif italic text-lg text-ink">{g.name}</p>
                          <p className="text-[10px] text-ink/30 uppercase tracking-widest">{g.authority} {g.year}</p>
                        </td>
                        <td className="px-8 py-4">
                            <span className="text-[10px] font-bold text-moss uppercase tracking-widest">{g.family?.name}</span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <button onClick={() => handleEdit(g)} className="text-[9px] font-bold uppercase text-moss hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>

            {/* Pagination */}
            {meta && meta.last_page > 1 && (
              <div className="flex justify-center items-center gap-6 pt-4">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="p-4 rounded-xl border border-ink/10 disabled:opacity-20 hover:bg-ink hover:text-parchment transition-all"
                >←</button>
                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/30">Page {page} of {meta.last_page}</span>
                <button 
                  disabled={page === meta.last_page}
                  onClick={() => setPage(p => p + 1)}
                  className="p-4 rounded-xl border border-ink/10 disabled:opacity-20 hover:bg-ink hover:text-parchment transition-all"
                >→</button>
              </div>
            )}
          </div>

      </div>
    </AdminLayout>
  );
}
