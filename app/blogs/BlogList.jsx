"use client";

import Link from "next/link";

export default function BlogList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-lg font-serif italic text-ink/40">No posts published yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blogs/${post.slug}`}
          className="group block bg-white border border-ink/5 rounded-[2rem] overflow-hidden hover:shadow-xl hover:border-moss/20 transition-all duration-500"
        >
          <div className="aspect-[16/10] bg-moss/5 overflow-hidden">
            {post.featured_image ? (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-6xl text-moss/10">V</span>
              </div>
            )}
          </div>
          <div className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-moss">
                {post.author || "VitaMotus Archive"}
              </span>
              {post.published_at && (
                <>
                  <span className="w-1 h-1 rounded-full bg-ink/10" />
                  <span className="text-[8px] font-mono text-ink/30">
                    {new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
            <h2 className="font-serif text-2xl text-ink leading-tight group-hover:text-moss transition-colors duration-500">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-sm text-ink/50 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-moss group-hover:gap-4 transition-all duration-500">
              <span>Read</span>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
