'use client';

import { useState, useEffect } from 'react';
import { taxonomyApi, adminApi, getImageUrl } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { toast } from 'sonner';

export default function EditSpeciesPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    scientific_name: '',
    authority: '',
    year: '',
    family_id: '',
    genus_id: '',
    distribution: '',
    taxon_status: '',
    wsc_species_id: '',
    vitamotus_notes: '',
    description: '',
    sources: '',
    profile: {
      habitat: '',
      diet: '',
      size_min: '',
      size_max: '',
      web_type: '',
      similar_species: '',
      behaviour_notes: '',
      venom_medical_relevance: '',
      conservation_status: '',
      references_list: '',
      hobbyist_summary: '',
    }
  });

  const [families, setFamilies] = useState([]);
  const [genera, setGenera] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [specimen, setSpecimen] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const familiesData = await taxonomyApi.getFamilies();
        setFamilies(familiesData);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/species/${params.id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('vm_token')}` }
        });
        const data = await res.json();
        
        setSpecimen(data);
        setFormData({
          scientific_name: data.scientific_name,
          authority: data.authority,
          year: data.year,
          family_id: data.family_id,
          genus_id: data.genus_id,
          distribution: data.distribution,
          taxon_status: data.taxon_status,
          wsc_species_id: data.wsc_species_id,
          vitamotus_notes: data.vitamotus_notes || '',
          description: data.description || '',
          sources: data.sources || '',
          profile: data.profile || {
            habitat: '',
            diet: '',
            size_min: '',
            size_max: '',
            web_type: '',
            similar_species: '',
            behaviour_notes: '',
            venom_medical_relevance: '',
            conservation_status: '',
            references_list: '',
            hobbyist_summary: '',
          }
        });

        if (data.family_id) {
            const generaData = await taxonomyApi.getGenera({ family_id: data.family_id });
            setGenera(generaData.data || generaData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  const handleFamilyChange = async (e) => {
    const id = e.target.value;
    setFormData({ ...formData, family_id: id, genus_id: '' });
    if (id) {
      const data = await taxonomyApi.getGenera({ family_id: id });
      setGenera(data.data || data);
    } else {
      setGenera([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.updateSpecies(params.id, formData);
      toast.success('Species updated successfully.');
    } catch (err) {
      toast.error('Failed to update species: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);

    try {
      await adminApi.uploadSpeciesImage(params.id, fd);
      toast.success('Photo uploaded successfully.');
      // Update local state to reflect new image if necessary
    } catch (err) {
      toast.error('Photo upload failed: ' + (err.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const updateProfile = (field, value) => {
    setFormData({
      ...formData,
      profile: { ...formData.profile, [field]: value }
    });
  };

  if (loading) return <div className="p-20 text-center font-serif italic">Loading...</div>;

  return (
    <AdminLayout>
      <div className="space-y-12 max-w-6xl mx-auto">
          
          <div className="flex justify-between items-center">
            <ChapterHeading title="Edit Species" subtitle={`Species: ${formData.scientific_name}`} />
            <div className="relative group w-40 h-40 rounded-[2rem] overflow-hidden bg-ink border border-ink/10 shadow-xl">
               <img 
                 src={getImageUrl(specimen)} 
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                 alt=""
               />
               <label className="absolute inset-0 flex items-center justify-center bg-ink/60 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <span className="text-[9px] font-bold text-parchment uppercase tracking-widest text-center px-2">
                    {uploading ? 'Uploading...' : 'Update Photo'}
                  </span>
                  <input type="file" className="hidden" onChange={handleImageUpload} disabled={uploading} />
               </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
             
             {/* Section 1: Taxonomy */}
             <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-ink/5 space-y-10">
                <h3 className="text-xl font-serif italic text-ink/60 border-b border-ink/5 pb-4">Taxonomic Identity</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ink/30 ml-4">Scientific Name</label>
                        <input 
                        className="w-full bg-parchment/30 border border-ink/5 px-6 py-4 rounded-xl font-serif italic text-lg"
                        value={formData.scientific_name}
                        onChange={(e) => setFormData({...formData, scientific_name: e.target.value})}
                        required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ink/30 ml-4">Authority & Year</label>
                        <div className="flex gap-4">
                            <input 
                                className="flex-1 bg-parchment/30 border border-ink/5 px-6 py-4 rounded-xl"
                                placeholder="Authority"
                                value={formData.authority}
                                onChange={(e) => setFormData({...formData, authority: e.target.value})}
                            />
                            <input 
                                className="w-24 bg-parchment/30 border border-ink/5 px-6 py-4 rounded-xl"
                                placeholder="Year"
                                value={formData.year}
                                onChange={(e) => setFormData({...formData, year: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ink/30 ml-4">Family</label>
                        <select 
                        className="w-full bg-parchment/30 border border-ink/5 px-6 py-4 rounded-xl appearance-none"
                        value={formData.family_id}
                        onChange={handleFamilyChange}
                        required
                        >
                        <option value="">Select Family</option>
                        {families.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ink/30 ml-4">Genus</label>
                        <select 
                        className="w-full bg-parchment/30 border border-ink/5 px-6 py-4 rounded-xl appearance-none"
                        value={formData.genus_id}
                        onChange={(e) => setFormData({...formData, genus_id: e.target.value})}
                        required
                        >
                        <option value="">Select Genus</option>
                        {genera.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                        </select>
                    </div>
                </div>
             </div>

             {/* Section 2: Extended Profile */}
             <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-ink/5 space-y-12">
                <div>
                    <h3 className="text-xl font-serif italic text-ink/60 border-b border-ink/5 pb-4">Extended Profile</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink/20 mt-2">Encyclopedia Entry Data</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* Living Conditions */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-moss border-l-2 border-moss pl-4">Living Conditions</h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Habitat</label>
                                <textarea 
                                    className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                    value={formData.profile.habitat}
                                    onChange={(e) => updateProfile('habitat', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Geographic Distribution</label>
                                <input 
                                    className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                    value={formData.distribution}
                                    onChange={(e) => setFormData({...formData, distribution: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Diet</label>
                                <input 
                                    className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                    value={formData.profile.diet}
                                    onChange={(e) => updateProfile('diet', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Physical Traits */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-moss border-l-2 border-moss pl-4">Physical Traits</h4>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Min Size (mm)</label>
                                    <input 
                                        className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                        value={formData.profile.size_min}
                                        onChange={(e) => updateProfile('size_min', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Max Size (mm)</label>
                                    <input 
                                        className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                        value={formData.profile.size_max}
                                        onChange={(e) => updateProfile('size_max', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Web Type</label>
                                <input 
                                    className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                    value={formData.profile.web_type}
                                    onChange={(e) => updateProfile('web_type', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Similar Species</label>
                                <textarea 
                                    className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                    value={formData.profile.similar_species}
                                    onChange={(e) => updateProfile('similar_species', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Behavioral & Medical */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-moss border-l-2 border-moss pl-4">Behavior & Venom</h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Behavioural Notes</label>
                                <textarea 
                                    className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                    value={formData.profile.behaviour_notes}
                                    onChange={(e) => updateProfile('behaviour_notes', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Medical Relevance</label>
                                <textarea 
                                    className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                    value={formData.profile.venom_medical_relevance}
                                    onChange={(e) => updateProfile('venom_medical_relevance', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status & Summary */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-moss border-l-2 border-moss pl-4">Status & Meta</h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Conservation Status (IUCN)</label>
                                <select 
                                    className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                    value={formData.profile.conservation_status}
                                    onChange={(e) => updateProfile('conservation_status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="NE">Not Evaluated</option>
                                    <option value="DD">Data Deficient</option>
                                    <option value="LC">Least Concern</option>
                                    <option value="NT">Near Threatened</option>
                                    <option value="VU">Vulnerable</option>
                                    <option value="EN">Endangered</option>
                                    <option value="CR">Critically Endangered</option>
                                    <option value="EW">Extinct in the Wild</option>
                                    <option value="EX">Extinct</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">Hobbyist Summary</label>
                                <textarea 
                                    className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                    value={formData.profile.hobbyist_summary}
                                    onChange={(e) => updateProfile('hobbyist_summary', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-2">References List</label>
                                <textarea 
                                    className="w-full bg-parchment/20 border border-ink/5 px-4 py-3 rounded-xl text-sm"
                                    value={formData.profile.references_list}
                                    onChange={(e) => updateProfile('references_list', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                </div>
             </div>

             <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-ink/5 space-y-6">
                <h3 className="text-xl font-serif italic text-ink/60 border-b border-ink/5 pb-4">Internal Notes & Description</h3>
                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ink/30 ml-4">Scientific Description</label>
                        <textarea 
                        rows={6}
                        className="w-full bg-parchment/30 border border-ink/5 px-6 py-4 rounded-xl font-serif italic"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ink/30 ml-4">Admin Notes</label>
                        <textarea 
                        rows={4}
                        className="w-full bg-parchment/30 border border-ink/5 px-6 py-4 rounded-xl font-serif italic"
                        value={formData.vitamotus_notes}
                        onChange={(e) => setFormData({...formData, vitamotus_notes: e.target.value})}
                        />
                    </div>
                </div>
             </div>

             <div className="pt-6">
                <button 
                  type="submit"
                  disabled={saving}
                  className="w-full py-6 bg-ink text-parchment rounded-[2rem] font-bold uppercase tracking-[0.4em] text-[12px] hover:bg-moss transition-all shadow-xl disabled:opacity-50"
                >
                  {saving ? 'Updating...' : 'Update Species Record'}
                </button>
             </div>
          </form>
        </div>
    </AdminLayout>
  );
}
