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

        <div className="relative z-10 max-w-[1800px] mx-auto px-8 md:px-16 pt-48 pb-32">
          <div className="max-w-3xl mb-20">
            <ChapterHeading
              title="Journal"
              subtitle="Field notes, research updates, and explorations from the VitaMotus archive."
            />
          </div>

          <div className="mb-12">
            <div className="flex gap-4 max-w-md">
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadPosts()}
                className="flex-1 bg-white border border-ink/10 rounded-xl px-6 py-3 text-ink text-sm focus:outline-none focus:border-moss/40"
              />
              <button
                onClick={loadPosts}
                className="px-6 py-3 bg-ink/5 text-ink rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-ink hover:text-parchment transition-all"
              >
                Search
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border border-ink/5 rounded-[2rem] overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-ink/5" />
                  <div className="p-8 space-y-4">
                    <div className="h-3 w-24 bg-ink/5 rounded" />
                    <div className="h-6 w-full bg-ink/5 rounded" />
                    <div className="h-4 w-3/4 bg-ink/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <BlogList posts={posts} />
          )}

          {meta && meta.last_page > 1 && (
            <div className="flex justify-center items-center gap-6 mt-16">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-4 rounded-xl border border-ink/10 disabled:opacity-20 hover:bg-ink hover:text-parchment transition-all"
              >
                ←
              </button>
              <span className="text-sm font-mono text-ink/40">
                Page {page} of {meta.last_page}
              </span>
              <button
                disabled={page === meta.last_page}
                onClick={() => setPage((p) => p + 1)}
                className="p-4 rounded-xl border border-ink/10 disabled:opacity-20 hover:bg-ink hover:text-parchment transition-all"
              >
                →
              </button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
