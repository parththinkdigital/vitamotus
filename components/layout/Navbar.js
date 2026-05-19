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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }, [pathname]);

  // Debounced Search Effect
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
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 md:px-12 pointer-events-none"
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between pointer-events-auto">
        {/* LOGO */}
        <Link href="/" className="flex flex-col group drop-shadow-[0_0_15px_rgba(253,250,240,0.5)]">
          <span className="font-serif text-3xl md:text-4xl text-ink tracking-tight group-hover:text-moss transition-colors duration-500">
            Vita Motus
          </span>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-ink/20 group-hover:w-10 transition-all duration-500" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-ink/30 font-bold italic">Scientific Archive</span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className={`hidden md:flex items-center px-10 py-4 rounded-full border transition-all duration-700 ${
          scrolled 
            ? "bg-parchment/80 backdrop-blur-2xl border-ink/10 shadow-[0_10px_40px_rgba(0,0,0,0.08)]" 
            : "bg-parchment/40 backdrop-blur-md border-ink/5 shadow-none"
        }`}>
          {/* LINKS CONTAINER */}
          <div className="flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.dropdown && link.dropdown.some(sub => pathname === sub.href));
              const hasDropdown = !!link.dropdown;

              return (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <Link 
                    href={link.href}
                    className={`text-[10px] font-bold transition-all duration-500 uppercase tracking-[0.25em] flex items-center gap-2 relative ${
                      isActive ? "text-moss" : "text-ink/40 hover:text-moss"
                    }`}
                  >
                    {link.name}
                    {hasDropdown && (
                      <motion.svg 
                        animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                        className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </motion.svg>
                    )}
                    <motion.span 
                      initial={false}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      className="absolute -bottom-1.5 left-0 h-[1px] bg-moss" 
                    />
                  </Link>

                  {/* DESKTOP DROPDOWN */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-6 pointer-events-auto"
                      >
                        <div className="bg-parchment border border-ink/10 shadow-2xl rounded-2xl overflow-hidden min-w-[240px] p-2 backdrop-blur-xl">
                          {link.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="flex flex-col px-5 py-4 rounded-xl hover:bg-moss/5 transition-colors group/item"
                            >
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/80 group-hover/item:text-moss transition-colors">
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
          
          <div className="h-4 w-[1px] bg-ink/10 mx-6" />
          
          {/* SEARCH INTERACTIVE AREA */}
          <div className="flex items-center relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <input 
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Archive..."
                    className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-[0.2em] text-ink w-full pr-4 placeholder:text-ink/20"
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
              className="text-ink/30 hover:text-moss transition-colors duration-300 cursor-pointer p-2"
            >
              <motion.div
                animate={{ rotate: isSearchOpen ? 90 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {isSearchOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                )}
              </motion.div>
            </button>

            {/* SEARCH RESULTS DROPDOWN */}
            <AnimatePresence>
              {isSearchOpen && (searchQuery.length > 1) && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="absolute top-full right-0 mt-6 w-[400px] bg-parchment/95 backdrop-blur-2xl border border-ink/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden pointer-events-auto"
                >
                  <div className="max-h-[450px] overflow-y-auto custom-scrollbar p-3">
                    {isSearching ? (
                      <div className="p-10 flex flex-col items-center justify-center gap-4 text-ink/20">
                         <div className="w-5 h-5 rounded-full border-2 border-moss/20 border-t-moss animate-spin" />
                         <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Querying Archive</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {searchResults.map((result, i) => (
                          <Link
                            key={`${result.type}-${result.name}-${i}`}
                            href={result.href}
                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-moss/5 transition-all duration-300 group/res"
                          >
                            <div className="flex flex-col gap-1">
                              <span className="text-[11px] font-serif italic text-ink group-hover/res:text-moss transition-colors">
                                {result.name}
                              </span>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-ink/30">
                                {result.subtitle}
                              </span>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-ink/5 group-hover/res:bg-moss/10 transition-colors">
                               <span className="text-[8px] font-bold uppercase tracking-widest text-ink/40 group-hover/res:text-moss">
                                 {result.type}
                               </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center flex flex-col items-center gap-4">
                        <span className="text-2xl opacity-20">🔬</span>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20">No matching specimens found</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-ink/[0.02] p-4 border-t border-ink/5 flex justify-between items-center">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-ink/20 italic">Global Taxonomy Lookup</span>
                    <span className="text-[8px] font-mono text-moss/40">{searchResults.length} results</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-4 z-[110] relative"
        >
          <motion.div 
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
            className="w-6 h-[1.5px] bg-ink" 
          />
          <motion.div 
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="w-6 h-[1.5px] bg-ink" 
          />
          <motion.div 
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
            className="w-6 h-[1.5px] bg-ink" 
          />
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
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
                    <span key={social} className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink/30 hover:text-moss transition-colors cursor-pointer">{social}social</span>
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
