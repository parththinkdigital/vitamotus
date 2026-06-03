"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { adminBlogApi } from "@/lib/api";
import AdminLayout from "@/components/layout/AdminLayout";
import ChapterHeading from "@/components/ui/ChapterHeading";
import { toast } from "sonner";

const SummernoteEditor = dynamic(() => import("@/components/ui/SummernoteEditor"), { ssr: false });

export default function NewBlogPost() {
  const router = useRouter();
  const fileRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    status: "draft",
  });

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const post = await adminBlogApi.createPost(form);
      if (file) {
        const fd = new FormData();
        fd.append("image", file);
        await adminBlogApi.uploadImage(post.id, fd);
      }
      toast.success("Post created successfully.");
      router.push("/admin/blogs");
    } catch (err) {
      toast.error("Failed to create post: " + (err.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <ChapterHeading title="New Post" subtitle="Write a new journal entry for the archive." />

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
                placeholder="Post title"
              />
            </div>
            <div className="space-y-2 col-span-2 md:col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Slug (leave blank to auto-generate)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                className="w-full bg-parchment border border-ink/10 rounded-xl px-6 py-4 text-ink focus:outline-none focus:border-moss/40 font-mono text-sm"
                placeholder="my-post-slug"
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
              placeholder="A short summary of the post..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Featured Image</label>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="w-full bg-parchment border border-ink/10 rounded-xl px-6 py-4 text-ink text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-ink file:text-parchment file:cursor-pointer hover:file:bg-moss focus:outline-none focus:border-moss/40"
                />
                {preview && (
                  <button type="button" onClick={removeFile} className="mt-2 text-[9px] font-bold uppercase tracking-widest text-red-400 hover:text-red-500">
                    Remove image
                  </button>
                )}
              </div>
              {preview && (
                <div className="w-28 h-20 rounded-xl overflow-hidden bg-ink/5 shrink-0 border border-ink/5">
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Content</label>
            <SummernoteEditor
              value={form.content}
              onChange={(html) => update("content", html)}
              height={600}
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
                placeholder="Author name"
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
            {saving ? "Saving..." : "Create Post"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
