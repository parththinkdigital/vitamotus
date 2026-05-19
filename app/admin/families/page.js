'use client';

import { useState, useEffect } from 'react';
import { taxonomyApi, adminApi } from '@/lib/api';
import AdminLayout from '@/components/layout/AdminLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { toast } from 'sonner';

export default function AdminFamiliesPage() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', authority: '', year: '', description: '' });

  const loadFamilies = async () => {
    setLoading(true);
    const data = await taxonomyApi.getFamilies();
    setFamilies(data);
    setLoading(false);
  };

  useEffect(() => { loadFamilies(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await adminApi.updateFamily(editing.id, formData);
        toast.success('Family updated successfully.');
      } else {
        await adminApi.createFamily(formData);
        toast.success('Family added successfully.');
      }
      setEditing(null);
      setFormData({ name: '', authority: '', year: '', description: '' });
      loadFamilies();
    } catch (err) { 
      toast.error('Operation failed: ' + (err.message || 'Unknown error')); 
    }
  };

  const handleEdit = (family) => {
    setEditing(family);
    setFormData({ 
      name: family.name, 
      authority: family.authority || '', 
      year: family.year || '',
      description: family.description || ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this family?')) return;
    await adminApi.deleteFamily(id);
    toast.success('Family deleted successfully.');
    loadFamilies();
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <ChapterHeading title={editing ? "Edit Family" : "New Family"} subtitle="Manage the foundational branches of the archive." />
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-ink/5 space-y-6">
              <input 
                className="w-full bg-parchment/20 px-6 py-4 rounded-xl text-ink font-serif italic text-lg border border-ink/5 focus:outline-none focus:border-moss/40"
                placeholder="Family Name (e.g. Salticidae)"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
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
              <textarea 
                className="w-full bg-parchment/20 px-6 py-4 rounded-xl text-sm border border-ink/5 focus:outline-none focus:border-moss/40 min-h-[100px]"
                placeholder="Family Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <button type="submit" className="w-full py-4 bg-ink text-parchment rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-moss transition-all">
                {editing ? 'Update Family' : 'Add Family'}
              </button>
              {editing && <button onClick={() => {setEditing(null); setFormData({name:'', authority:'', year:'', description:''})}} className="w-full text-[9px] font-bold uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">Cancel</button>}
            </form>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-ink/5 rounded-[2.5rem] overflow-hidden">
               <table className="w-full">
                  <thead className="bg-ink/5">
                    <tr>
                      <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-ink/30 text-left">Family</th>
                      <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-ink/30 text-left">Genera</th>
                      <th className="px-8 py-4 text-[9px] font-bold uppercase tracking-widest text-ink/30 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {families.map(f => (
                      <tr key={f.id} className="hover:bg-ink/[0.01]">
                        <td className="px-8 py-4">
                          <p className="font-serif italic text-lg text-ink">{f.name}</p>
                          <p className="text-[10px] text-ink/30 uppercase tracking-widest">{f.authority} {f.year}</p>
                        </td>
                        <td className="px-8 py-4 text-sm font-mono text-moss">{f.genus_count}</td>
                        <td className="px-8 py-4 text-right space-x-4">
                          <button onClick={() => handleEdit(f)} className="text-[9px] font-bold uppercase text-moss hover:underline">Edit</button>
                          <button onClick={() => handleDelete(f.id)} className="text-[9px] font-bold uppercase text-red-400 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>

        </div>
    </AdminLayout>
  );
}
