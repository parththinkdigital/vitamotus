'use client';

import { useState, useEffect } from 'react';
import { authApi, taxonomyApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';
import ChapterHeading from '@/components/ui/ChapterHeading';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ families: 0, genera: 0, species: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const userData = await authApi.getUser();
        setUser(userData);
        
        // Fetch basic stats
        const families = await taxonomyApi.getFamilies();
        setStats({
          families: families.length,
          genera: '4.3k+', // Placeholder or fetch actual
          species: '53.8k+'
        });
      } catch (err) {
        console.error('Unauthorized:', err);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem('vm_token');
      router.push('/admin/login');
    } catch (err) {
      console.error(err);
      localStorage.removeItem('vm_token');
      router.push('/admin/login');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-parchment flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-ink border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-16">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <ChapterHeading 
            title={`Welcome, ${user?.name}`} 
            subtitle="Admin System Access Level: Administrator" 
          />
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Families Added", value: stats.families, color: "text-moss" },
              { label: "Genera Added", value: stats.genera, color: "text-ink" },
              { label: "Species Added", value: stats.species, color: "text-ink" },
            ].map((stat) => (
              <div key={stat.label} className="p-10 bg-white border border-ink/5 rounded-[2.5rem] shadow-sm space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20">{stat.label}</span>
                <p className={`text-5xl font-serif ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="p-10 bg-ink text-parchment rounded-[3rem] space-y-8">
                <h3 className="text-2xl font-serif italic">Management Modules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {[
                     { name: "Species", href: "/admin/species", icon: "🔬" },
                     { name: "Genera", href: "/admin/genera", icon: "📂" },
                     { name: "Families", href: "/admin/families", icon: "🌳" },
                     { name: "Media", href: "/admin/media", icon: "🖼️" },
                   ].map((module) => (
                     <Link 
                       key={module.name} 
                       href={module.href}
                       className="p-6 bg-parchment/10 border border-parchment/10 rounded-2xl hover:bg-moss/40 transition-all group"
                     >
                        <div className="flex justify-between items-center">
                           <span className="text-xl">{module.icon}</span>
                           <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                        <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-parchment/60">{module.name}</p>
                     </Link>
                   ))}
                </div>
             </div>

             <div className="p-10 bg-white border border-ink/5 rounded-[3rem] space-y-8">
                <h3 className="text-2xl font-serif italic text-ink">Recent Contributions</h3>
                <div className="space-y-6">
                   {[
                     { user: "System", action: "Imported 53k species", time: "2h ago" },
                     { user: "Admin", action: "Updated Missulena notes", time: "4h ago" },
                   ].map((log, i) => (
                     <div key={i} className="flex justify-between items-center border-b border-ink/5 pb-4 last:border-0">
                        <div className="space-y-1">
                           <p className="text-sm font-bold text-ink">{log.action}</p>
                           <p className="text-[10px] text-ink/30 uppercase tracking-widest">User: {log.user}</p>
                        </div>
                        <span className="text-[10px] font-mono text-ink/20">{log.time}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>

        </div>
    </AdminLayout>
  );
}
