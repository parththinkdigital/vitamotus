"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { adminBlogApi } from "@/lib/api";
import AdminLayout from "@/components/layout/AdminLayout";
import ChapterHeading from "@/components/ui/ChapterHeading";
import { toast } from "sonner";

const SummernoteEditor = dynamic(() => import("@/components/ui/SummernoteEditor"), { ssr: false });

export default function EditBlogPost() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    status: "draft",
  });

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (!id) return;
    adminBlogApi
      .getPost(id)
      .then((post) => {
        setForm({
          title: post.title || "",
          slug: post.slug || "",
          excerpt: post.excerpt || "",
          content: post.content || "",
          author: post.author || "",
          status: post.status || "draft",
        });
      })
      .catch((err) => {
        toast.error("Failed to load post: " + (err.message || "Unknown error"));
        router.push("/admin/blogs");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminBlogApi.updatePost(id, form);
      toast.success("Post updated successfully.");
      router.push("/admin/blogs");
    } catch (err) {
      toast.error("Failed to update post: " + (err.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-12">
          <div className="h-12 w-48 bg-ink/5 rounded" />
          <div className="h-96 bg-ink/5 rounded-[3rem]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-12">
        <ChapterHeading title="Edit Post" subtitle="Update an existing journal entry." />

        <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[3rem] shadow-sm border border-ink/5 space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2 col-span-2 md:col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="w-full bg-parchment border border-ink/10 rounded-xl px-6 py-4 text-ink focus:outline-none focus:border-moss/40"
              />
            </div>
            <div className="space-y-2 col-span-2 md:col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                className="w-full bg-parchment border border-ink/10 rounded-xl px-6 py-4 text-ink focus:outline-none focus:border-moss/40 font-mono text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Excerpt</label>
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              className="w-full bg-parchment border border-ink/10 rounded-xl px-6 py-4 text-ink focus:outline-none focus:border-moss/40 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Content</label>
            <SummernoteEditor
              value={form.content}
              onChange={(html) => update("content", html)}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
                className="w-full bg-parchment border border-ink/10 rounded-xl px-6 py-4 text-ink focus:outline-none focus:border-moss/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Status</label>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="w-full bg-parchment border border-ink/10 rounded-xl px-6 py-4 text-ink focus:outline-none focus:border-moss/40"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-5 bg-ink text-parchment rounded-[2rem] text-[10px] font-bold uppercase tracking-widest hover:bg-moss transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Post"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
