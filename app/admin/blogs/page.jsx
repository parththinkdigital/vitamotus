"use client";

import { useState, useEffect } from "react";
import { adminBlogApi } from "@/lib/api";
import AdminLayout from "@/components/layout/AdminLayout";
import ChapterHeading from "@/components/ui/ChapterHeading";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminBlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const params = { page };
      if (search) params.search = search;
      const data = await adminBlogApi.getPosts(params);
      setPosts(data.data);
      setMeta(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await adminBlogApi.deletePost(id);
      toast.success("Post deleted successfully.");
      loadPosts();
    } catch (err) {
      toast.error("Failed to delete post: " + (err.message || "Unknown error"));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <ChapterHeading
            title="Blog Management"
            subtitle="Create, edit, and publish journal entries for the archive."
          />
          <Link
            href="/admin/blogs/new"
            className="px-8 py-4 bg-ink text-parchment rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-moss transition-all"
          >
            + New Post
          </Link>
        </div>

        <div className="flex gap-4 bg-white/50 p-4 rounded-2xl border border-ink/5">
          <input
            type="text"
            placeholder="Search by title..."
            className="flex-1 bg-white border border-ink/10 rounded-xl px-6 py-3 text-ink focus:outline-none focus:border-moss/40"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadPosts()}
          />
          <button
            onClick={loadPosts}
            className="px-8 py-3 bg-ink/5 text-ink rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-ink hover:text-parchment transition-all"
          >
            Search
          </button>
        </div>

        <div className="bg-white border border-ink/5 rounded-[2.5rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-ink/5">
              <tr>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-ink/40">Image</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-ink/40">Title</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-ink/40">Author</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-ink/40">Status</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-ink/40">Date</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-ink/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-ink/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    {post.featured_image_url ? (
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-ink/5 border border-ink/5">
                        <img src={post.featured_image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-10 rounded-lg bg-ink/5 border border-ink/5 flex items-center justify-center">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-ink/20">None</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-serif text-lg text-ink">{post.title}</p>
                    <p className="text-[10px] text-ink/30 uppercase tracking-widest font-mono">
                      /blogs/{post.slug}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[11px] text-ink/50">{post.author || "—"}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] px-3 py-1 rounded-full uppercase tracking-tighter font-bold ${
                      post.status === "published"
                        ? "bg-green-50 text-green-600"
                        : "bg-ink/5 text-ink/40"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[11px] text-ink/40 font-mono">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })
                        : "—"}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right space-x-4">
                    <Link
                      href={`/admin/blogs/${post.id}/edit`}
                      className="text-[10px] font-bold text-moss uppercase tracking-widest hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
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

        {meta && meta.last_page > 1 && (
          <div className="flex justify-center items-center gap-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-4 rounded-xl border border-ink/10 disabled:opacity-20 hover:bg-ink hover:text-parchment transition-all"
            >
              ←
            </button>
            <span className="text-sm font-mono text-ink/40">Page {page} of {meta.last_page}</span>
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
    </AdminLayout>
  );
}
