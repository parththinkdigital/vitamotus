"use client";

import { useState, useEffect } from "react";
import { blogApi } from "@/lib/api";
import MainLayout from "@/components/layout/MainLayout";
import ChapterHeading from "@/components/ui/ChapterHeading";
import BlogList from "./BlogList";

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    try {
      const params = { page };
      if (search) params.search = search;
      const data = await blogApi.getPosts(params);
      setPosts(data.data);
      setMeta(data);
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  return (
    <MainLayout>
      <section className="relative min-h-screen bg-parchment">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
            backgroundSize: "3px 3px",
          }}
        />

        <div className="relative z-10 max-w-[1800px] mx-auto px-8 md:px-16 pt-48 pb-32"><div className="flex flex-col md:flex-row md:items-start md:justify-between mb-20 gap-8"><div className="max-w-3xl"><ChapterHeading title="Journal" subtitle="Field notes, research updates, and explorations from the VitaMotus archive." /></div><div className="md:pt-14 shrink-0"><div className="flex gap-4"><input type="text" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && loadPosts()} className="w-64 bg-white border border-ink/10 rounded-xl px-6 py-3 text-ink text-sm focus:outline-none focus:border-moss/40" /><button onClick={loadPosts} className="px-6 py-3 bg-ink/5 text-ink rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-ink hover:text-parchment transition-all">Search</button></div></div></div>{loading ? (<div className="animate-pulse space-y-0 divide-y divide-ink/5">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className="flex gap-0 py-8 md:py-14"><div className="w-0.5 shrink-0 bg-ink/5" /><div className="flex-1 pl-5 md:pl-10 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-12"><div className="md:col-span-5 lg:col-span-4"><div className="aspect-[16/9] md:aspect-[4/3] rounded-xl bg-ink/5" /></div><div className="md:col-span-7 lg:col-span-8"><div className="flex gap-3 mb-3"><div className="h-2 w-20 bg-ink/5 rounded" /><div className="h-2 w-16 bg-ink/5 rounded" /></div><div className="h-8 md:h-10 w-3/4 bg-ink/5 rounded" /><div className="mt-4 space-y-2"><div className="h-4 w-full bg-ink/5 rounded" /><div className="h-4 w-1/2 bg-ink/5 rounded" /></div></div></div></div>))}</div>) : (<BlogList posts={posts} />)}{meta && meta.last_page > 1 && (<div className="flex justify-center items-center gap-6 mt-16"><button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="p-4 rounded-xl border border-ink/10 disabled:opacity-20 hover:bg-ink hover:text-parchment transition-all">←</button><span className="text-sm font-mono text-ink/40">Page {page} of {meta.last_page}</span><button disabled={page === meta.last_page} onClick={() => setPage((p) => p + 1)} className="p-4 rounded-xl border border-ink/10 disabled:opacity-20 hover:bg-ink hover:text-parchment transition-all">→</button></div>)}</div>
      </section>
    </MainLayout>
  );
}
