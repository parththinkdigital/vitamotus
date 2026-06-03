"use client";

import Link from "next/link";
import { getBlogImageUrl } from "@/lib/api";

function readingTime(html) {
  const text = html.replace(/<[^>]*>/g, "");
  const wpm = 200;
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wpm));
}

export default function BlogDetails({ post }) {
  const mins = readingTime(post.content);

  return (
    <article className="max-w-4xl mx-auto px-6 md:px-0">
      {/* Breadcrumb + Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-10 border-b border-ink/8">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-moss hover:text-moss/70 transition-colors"
        >
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Journal
        </Link>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/30">
          <span>{post.author || "VitaMotus Archive"}</span>
          {post.published_at && (
            <>
              <span className="w-1 h-1 rounded-full bg-ink/10" />
              <span className="font-mono tracking-normal">
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "long", day: "numeric", year: "numeric",
                })}
              </span>
            </>
          )}
          <span className="w-1 h-1 rounded-full bg-ink/10" />
          <span className="font-mono tracking-normal">{mins} min read</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-serif text-5xl md:text-7xl text-ink leading-[1.05] tracking-tighter max-w-4xl mt-14 mb-6">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-xl md:text-2xl font-serif italic text-ink/40 leading-relaxed max-w-3xl mb-12">
          {post.excerpt}
        </p>
      )}

      {/* Featured Image */}
      {post.featured_image && (
        <div className="rounded-[2rem] overflow-hidden mb-14">
          <img
            src={getBlogImageUrl(post.featured_image)}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer */}
      <div className="mt-20 pt-10 border-t border-ink/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-moss group"
        >
          <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Back to Journal
        </Link>

        <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.2em] text-ink/20">
          <span>VitaMotus Archive</span>
          <span className="w-4 h-[1px] bg-ink/10" />
          <span>Cat. Ref. VM.{String(post.id).padStart(3, "0")}</span>
        </div>
      </div>
    </article>
  );
}
