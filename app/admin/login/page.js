'use client';

import { useState } from 'react';
import { authApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem('vm_token', data.token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Access Denied. Invalid credentials or insufficient clearance.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-parchment p-12 rounded-[2rem] shadow-2xl space-y-10 border border-parchment/10"
      >
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-ink rounded-2xl mx-auto flex items-center justify-center shadow-lg">
             <div className="w-6 h-6 border-2 border-parchment rounded-full border-t-transparent animate-pulse" />
          </div>
          <h1 className="text-3xl font-serif text-ink italic">Admin Login</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40">Secure Entrance</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-800 text-[11px] font-bold uppercase tracking-wider rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-4">Credential: Email</label>
            <input 
              type="email"
              required
              className="w-full bg-white border border-ink/5 px-6 py-4 rounded-xl text-ink placeholder:text-ink/20 focus:outline-none focus:border-moss/40 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vitamotus.earth"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase tracking-widest text-ink/30 ml-4">Credential: Passcode</label>
            <input 
              type="password"
              required
              className="w-full bg-white border border-ink/5 px-6 py-4 rounded-xl text-ink placeholder:text-ink/20 focus:outline-none focus:border-moss/40 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-ink text-parchment rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-moss transition-all duration-500 shadow-xl disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="pt-6 border-t border-ink/5 text-center">
           <p className="text-[9px] font-bold text-ink/20 uppercase tracking-widest leading-relaxed">
             Unauthorized access to the VitaMotus Archive is strictly monitored. <br/> Encryption: AES-256-GCM.
           </p>
        </div>
      </motion.div>
    </div>
  );
}
