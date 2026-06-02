"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { blogApi } from "@/lib/api";
import MainLayout from "@/components/layout/MainLayout";
import BlogDetails from "./BlogDetails";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    blogApi
      .getPost(slug)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <MainLayout>
      <section className="relative min-h-screen bg-parchment">
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
            backgroundSize: "3px 3px",
          }}
        />

        <div className="relative z-10 max-w-[1800px] mx-auto px-8 md:px-16 pt-48 pb-32">
          {loading ? (
            <div className="max-w-3xl mx-auto animate-pulse space-y-8">
              <div className="h-4 w-48 bg-ink/5 rounded" />
              <div className="h-16 w-full bg-ink/5 rounded" />
              <div className="h-6 w-3/4 bg-ink/5 rounded" />
              <div className="h-96 w-full bg-ink/5 rounded-[2rem]" />
            </div>
          ) : error ? (
            <div className="max-w-3xl mx-auto text-center py-24">
              <p className="text-lg font-serif italic text-ink/40">{error}</p>
            </div>
          ) : post ? (
            <BlogDetails post={post} />
          ) : null}
        </div>
      </section>
    </MainLayout>
  );
}
