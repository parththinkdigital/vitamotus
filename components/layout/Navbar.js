"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { taxonomyApi } from "@/lib/api";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  {
    name: "Archive",
    href: "",
    dropdown: [
      { name: "By Family", href: "/families" },
      { name: "By Genera", href: "/genera" },
      { name: "By Species", href: "/species" },
      { name: "Mastersheet Spider ", href: "/mastersheet" },
    ]
  },
  {
    name: "Learn",
    href: "",
    dropdown: [
      { name: "Spiders", href: "/learn/spiders" },
      { name: "Taxonomy Guide", href: "/learn/taxonomy" },
    ]
  },
  { name: "Anatomy", href: "/anatomy" },
  { name: "Blog", href: "/blogs" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();
  const isHomeHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const data = await taxonomyApi.search(searchQuery);
          setSearchResults(data.results || []);
        } catch (err) {
          console.error("Search failed:", err);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 left-4 right-4 z-[100] flex justify-center pointer-events-none transition-colors duration-700 ${
        isHomeHero ? "text-parchment" : "text-ink"
      }`}
    >
      <div className={`pointer-events-auto flex items-center gap-5 px-4 py-2 rounded-full border transition-all duration-700 ${
        scrolled
          ? "bg-parchment/90 backdrop-blur-xl border-ink/15 shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
          : isHomeHero
            ? "bg-white/[0.15] backdrop-blur-xl border-white/[0.2] shadow-[0_0_40px_rgba(0,0,0,0.25)]"
            : "bg-parchment/75 backdrop-blur-xl border-ink/12 shadow-[0_8px_28px_rgba(0,0,0,0.07)]"
      }`}>
        <Link href="/" className="flex items-center gap-3 group shrink-0">

          <div className="flex flex-col">
            <span className={`text-lg font-serif tracking-tight leading-tight transition-colors duration-500 ${
              isHomeHero
                ? "text-parchment group-hover:text-parchment/70"
                : "text-ink group-hover:text-moss"
            }`}>
              Vita Motus
            </span>
          </div>
        </Link>

        <div className={`h-5 w-[1px] transition-colors duration-500 ${
          isHomeHero ? "bg-white/20" : "bg-ink/15"
        }`} />

        <div className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.dropdown && link.dropdown.some(sub => pathname === sub.href));
            const hasDropdown = !!link.dropdown;

            return (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => hasDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`text-[10px] font-bold transition-all duration-300 uppercase tracking-[0.25em] flex items-center gap-1.5 relative py-1 ${
                    isActive
                      ? isHomeHero ? "text-parchment" : "text-moss"
                      : isHomeHero
                        ? "text-parchment/55 hover:text-parchment/85"
                        : "text-ink/55 hover:text-moss"
                  }`}
                >
                  {link.name}
                  {hasDropdown && (
                    <motion.svg
                      animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="w-2 h-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </motion.svg>
                  )}
                  <motion.span
                    initial={false}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className={`absolute -bottom-1 left-0 h-[1px] ${
                      isHomeHero ? "bg-parchment/50" : "bg-moss/50"
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {hasDropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-5"
                    >
                      <div className={`shadow-xl rounded-xl overflow-hidden min-w-[200px] p-1 backdrop-blur-2xl border transition-colors duration-500 ${
                        isHomeHero
                          ? "bg-ink/85 border-white/8"
                          : "bg-parchment/95 border-ink/8"
                      }`}>
                        {link.dropdown.map((sub, idx) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={`block px-4 py-[10px] rounded-lg transition-all duration-200 ${
                              isHomeHero
                                ? "text-parchment/60 hover:text-parchment hover:bg-white/[0.04]"
                                : "text-ink/60 hover:text-moss hover:bg-moss/[0.04]"
                            }`}
                          >
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                              {sub.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className={`h-5 w-[1px] transition-colors duration-500 ${
          isHomeHero ? "bg-white/20" : "bg-ink/15"
        }`} />

        <div className="flex items-center relative">
          <AnimatePresence mode="wait">
            {isSearchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search archive..."
                  className={`bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-[0.2em] w-full pr-3 transition-colors duration-500 ${
                    isHomeHero
                      ? "text-parchment placeholder:text-parchment/30"
                      : "text-ink placeholder:text-ink/30"
                  }`}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isSearchOpen) {
                setSearchQuery("");
                setSearchResults([]);
              }
            }}
            className={`cursor-pointer p-1.5 transition duration-300 ease-out active:scale-[0.93] active:duration-150 ${
              isHomeHero
                ? "text-parchment/50 hover:text-parchment"
                : "text-ink/50 hover:text-moss"
            }`}
          >
            <motion.div
              animate={{ rotate: isSearchOpen ? 90 : 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              {isSearchOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              )}
            </motion.div>
          </button>

          <AnimatePresence>
            {isSearchOpen && (searchQuery.length > 1) && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className={`absolute top-full right-0 mt-5 w-[380px] backdrop-blur-2xl rounded-xl overflow-hidden transition-colors duration-500 ${
                  isHomeHero
                    ? "bg-ink/85 border border-white/8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
                    : "bg-parchment/97 border border-ink/8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]"
                }`}
              >
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-1.5">
                  {isSearching ? (
                    <div className="py-10 flex flex-col items-center justify-center gap-3">
                       <div className={`w-4 h-4 rounded-full border-2 border-t-transparent animate-spin ${
                         isHomeHero ? "border-parchment/20" : "border-ink/20"
                       }`} />
                       <span className={`text-[9px] font-bold uppercase tracking-[0.4em] ${
                         isHomeHero ? "text-parchment/20" : "text-ink/20"
                       }`}>Searching</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="flex flex-col gap-0.5">
                      {searchResults.map((result, i) => (
                        <Link
                          key={`${result.type}-${result.name}-${i}`}
                          href={result.href}
                          className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                            isHomeHero
                              ? "hover:bg-white/[0.04]"
                              : "hover:bg-ink/[0.04]"
                          }`}
                        >
                          <div className="flex flex-col gap-0.5 min-w-0">
                            <span className={`text-[11px] font-serif italic truncate transition-colors ${
                              isHomeHero
                                ? "text-parchment"
                                : "text-ink"
                            }`}>
                              {result.name}
                            </span>
                            <span className={`text-[8px] font-bold uppercase tracking-[0.15em] ${
                              isHomeHero ? "text-parchment/25" : "text-ink/25"
                            }`}>
                              {result.subtitle}
                            </span>
                          </div>
                          <span className={`shrink-0 ml-3 text-[8px] font-bold uppercase tracking-[0.15em] ${
                            isHomeHero ? "text-parchment/20" : "text-ink/20"
                          }`}>
                            {result.type}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className={`text-[9px] font-bold uppercase tracking-[0.3em] ${
                        isHomeHero ? "text-parchment/15" : "text-ink/15"
                      }`}>No results found</p>
                    </div>
                  )}
                </div>

                <div className={`px-4 py-3 border-t flex items-center justify-between transition-colors duration-500 ${
                  isHomeHero ? "border-white/5" : "border-ink/5"
                }`}>
                  <span className={`text-[7px] font-bold uppercase tracking-[0.15em] ${
                    isHomeHero ? "text-parchment/15" : "text-ink/15"
                  }`}>Taxonomic Index</span>
                  <span className={`text-[7px] font-mono ${
                    isHomeHero ? "text-parchment/15" : "text-ink/15"
                  }`}>{searchResults.length}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1 relative"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
            className={`w-5 h-[1.5px] transition-colors duration-700 ${
              isHomeHero ? "bg-parchment" : "bg-ink"
            }`}
          />
          <motion.div
            animate={{ opacity: isOpen ? 0 : 1 }}
            className={`w-5 h-[1.5px] transition-colors duration-700 ${
              isHomeHero ? "bg-parchment" : "bg-ink"
            }`}
          />
          <motion.div
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
            className={`w-5 h-[1.5px] transition-colors duration-700 ${
              isHomeHero ? "bg-parchment" : "bg-ink"
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] bg-parchment flex flex-col justify-center px-12 pointer-events-auto"
          >
            <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-moss/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-ink/5 rounded-lg flex items-center justify-center">
                  <span className="font-serif text-lg font-bold text-ink">V</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-serif tracking-tight text-ink">Vita Motus</span>
                  <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-ink/30">Scientific Archive</span>
                </div>
              </div>

              <span className="text-[10px] uppercase tracking-[0.6em] text-moss font-bold mb-4">Navigation</span>
              {NAV_LINKS.map((link, i) => (
                <div key={link.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className="text-4xl md:text-5xl font-serif italic text-ink hover:text-moss transition-colors duration-500"
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                        className="p-4"
                      >
                        <motion.svg
                          animate={{ rotate: mobileExpanded === link.name ? 180 : 0 }}
                          className="w-6 h-6 text-ink/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                        >
                          <path d="m6 9 6 6 6-6"/>
                        </motion.svg>
                      </button>
                    )}
                  </div>

                  {link.dropdown && (
                    <motion.div
                      initial={false}
                      animate={{ height: mobileExpanded === link.name ? "auto" : 0, opacity: mobileExpanded === link.name ? 1 : 0 }}
                      className="overflow-hidden flex flex-col gap-4 pl-4"
                    >
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="text-xl font-serif italic text-ink/40 hover:text-moss transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              <div className="mt-12 pt-10 border-t border-ink/5">
                <p className="text-xs text-ink/40 font-serif italic mb-6">Scientific arachnid archive & research project.</p>
                <div className="flex gap-8">
                  {["Instagram", "Twitter", "Email"].map(social => (
                    <span key={social} className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink/30 hover:text-moss transition-colors cursor-pointer">{social}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
