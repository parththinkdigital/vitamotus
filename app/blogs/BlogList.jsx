"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1];

const container = {
  animate: {
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export default function BlogList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-lg font-serif italic text-ink/40">No posts published yet.</p>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="initial" animate="animate">
      {posts.map((post) => (
        <motion.div key={post.id} variants={item}>
          <Link
            href={`/blogs/${post.slug}`}
            className="group relative flex items-stretch gap-0 py-8 md:py-14 border-b border-ink/5 last:border-b-0 active:scale-[0.99] transition-transform duration-150"
          >
            <div className="relative w-0.5 shrink-0 bg-ink/5 overflow-hidden">
              <div className="absolute inset-0 bg-moss/50 scale-y-0 origin-top transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
            </div>

            <div className="flex-1 pl-5 md:pl-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-12">
                {post.featured_image && (
                  <div className="md:col-span-5 lg:col-span-4 overflow-hidden rounded-xl bg-ink/[0.03] ring-1 ring-ink/5 group-hover:ring-moss/20 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:h-full">
                    <div className="aspect-[16/9] md:h-full">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}

                <div
                  className={
                    post.featured_image
                      ? "md:col-span-7 lg:col-span-8 flex flex-col justify-center"
                      : "md:col-span-10 md:col-start-3"
                  }
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-moss">
                      {post.author || "VitaMotus Archive"}
                    </span>
                    {post.published_at && (
                      <>
                        <span className="w-0.5 h-0.5 rounded-full bg-ink/20" />
                        <span className="text-[9px] font-mono text-ink/30">
                          {new Date(post.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl md:text-4xl text-ink leading-[1.08] tracking-tight group-hover:text-moss transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="mt-4 text-sm md:text-[15px] text-ink/45 leading-relaxed line-clamp-2 max-w-xl">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-6 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-moss/80 group-hover:text-moss transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <span>Read entry</span>
                    <span className="relative overflow-hidden w-4 h-4">
                      <svg
                        className="w-4 h-4 absolute inset-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
