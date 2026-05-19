'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

const ADMIN_NAV = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Species', href: '/admin/species', icon: '🔬' },
  { name: 'Families', href: '/admin/families', icon: '🌳' },
  { name: 'Genera', href: '/admin/genera', icon: '📂' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem('vm_token');
      router.push('/admin/login');
    } catch (err) {
      localStorage.removeItem('vm_token');
      router.push('/admin/login');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* Sidebar */}
      <aside className="w-72 bg-ink text-parchment fixed h-full flex flex-col shadow-2xl z-50">
        <div className="p-10 border-b border-parchment/10">
          <Link href="/" className="group">
            <h1 className="text-2xl font-serif italic text-parchment group-hover:text-moss transition-colors">VitaMotus</h1>
            <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-parchment/40 mt-2">Archivist Panel</p>
          </Link>
        </div>

        <nav className="flex-grow p-6 space-y-2 mt-6">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  isActive 
                    ? 'bg-moss text-parchment shadow-lg shadow-moss/20' 
                    : 'text-parchment/40 hover:bg-parchment/5 hover:text-parchment'
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-parchment/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-400/10 transition-all"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 min-h-screen p-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
