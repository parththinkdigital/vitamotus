'use client';

import MainLayout from '@/components/layout/MainLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const springConfig = { type: "spring", stiffness: 100, damping: 25, bounce: 0 };
const softSpring = { type: "spring", stiffness: 80, damping: 20, bounce: 0 };

const accentBarColors = {
  moss: 'rgba(73, 107, 74, 0.3)',
  amber: 'rgba(217, 164, 65, 0.3)',
  clay: 'rgba(138, 90, 60, 0.3)',
  ink: 'rgba(16, 35, 27, 0.3)',
};

export default function LearnSpidersPage() {
  const prefersReducedMotion = useReducedMotion();
  const anim = !!prefersReducedMotion;

  const fadeUp = (delay = 0) => (anim ? {
    initial: { opacity: 1 },
    whileInView: {},
    viewport: { once: true },
    transition: { duration: 0 }
  } : {
    initial: { opacity: 0, y: 30, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-80px" },
    transition: { ...springConfig, delay }
  });

  const item = (i) => (anim ? {
    initial: { opacity: 1 },
    whileInView: {},
    viewport: { once: true },
    transition: { duration: 0 }
  } : {
    initial: { opacity: 0, y: 24, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true },
    transition: { ...springConfig, delay: i * 0.12 }
  });

  const fadeSlide = (dir = 1) => (delay = 0) => (anim ? {
    initial: { opacity: 1 },
    whileInView: {},
    viewport: { once: true },
    transition: { duration: 0 }
  } : {
    initial: { opacity: 0, x: -20 * dir, filter: "blur(2px)" },
    whileInView: { opacity: 1, x: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-80px" },
    transition: { ...softSpring, delay }
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-parchment pt-32 pb-20 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          
          {/* ── CHAPTER OPENER ── */}
          <div className="relative mb-32">
            <motion.span
              initial={anim ? {} : { opacity: 0, y: 80 }}
              animate={anim ? {} : { opacity: 0.03, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="absolute -top-8 left-0 text-[200px] md:text-[300px] font-display font-bold text-ink/[0.03] leading-none select-none pointer-events-none"
            >
              01
            </motion.span>
            <ChapterHeading 
              title="Start with Spiders" 
              subtitle="Understanding the fundamental nature of arachnids." 
            />
          </div>

          <div className="space-y-40">

            {/* ═══════════════════════════════════════════
               SECTION 1 — The Definition
            ════════════════════════════════════════════ */}
            <motion.section {...fadeUp()} className="relative">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-[1px] bg-moss" />
                <span className="text-[10px] font-bold font-sans uppercase tracking-[0.4em] text-moss">
                  Chapter I
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-5">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-ink leading-[0.95] tracking-tight">
                    What exactly<br />
                    <span className="italic font-serif text-moss">is a spider?</span>
                  </h2>
                </div>

                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-6">
                    <p className="text-lg md:text-xl text-ink/60 leading-relaxed font-medium">
                      <span className="float-left text-7xl md:text-8xl font-serif text-moss leading-[0.7] mr-4 mt-1">S</span>
                      piders are eight-legged predatory invertebrates that belong to the class <strong className="text-ink">Arachnida</strong> and the order <strong className="text-ink">Araneae</strong>. While often confused with insects, they are part of a distinct evolutionary lineage that dates back over 300 million years — long before the first insects took to the air.
                    </p>
                    <p className="text-lg md:text-xl text-ink/60 leading-relaxed font-medium">
                      With fossil records stretching into the Devonian period, spiders represent one of the most successful predator designs ever to evolve. Their blueprint has remained fundamentally unchanged for hundreds of millions of years — a testament to its efficiency.
                    </p>
                  </div>

                  {/* Editorial Stat Block */}
                  <motion.div
                    initial={anim ? {} : { opacity: 0, y: 20, filter: "blur(2px)" }}
                    whileInView={anim ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ ...springConfig, delay: 0.3 }}
                    className="flex items-stretch gap-6 pt-4"
                  >
                    <div className="flex-1 border-l-2 border-moss/30 pl-6">
                      <span className="text-3xl md:text-4xl font-display font-bold text-moss leading-none">~50,000</span>
                      <p className="text-[11px] font-sans text-ink/30 uppercase tracking-[0.2em] mt-2 font-semibold">Described Species</p>
                    </div>
                    <div className="flex-1 border-l-2 border-amber/30 pl-6">
                      <span className="text-3xl md:text-4xl font-display font-bold text-amber leading-none">300M+</span>
                      <p className="text-[11px] font-sans text-ink/30 uppercase tracking-[0.2em] mt-2 font-semibold">Years of Evolution</p>
                    </div>
                    <div className="flex-1 border-l-2 border-clay/30 pl-6">
                      <span className="text-3xl md:text-4xl font-display font-bold text-clay leading-none">7</span>
                      <p className="text-[11px] font-sans text-ink/30 uppercase tracking-[0.2em] mt-2 font-semibold">Continents</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* ═══════════════════════════════════════════
               SECTION 2 — Spiders vs Insects
            ════════════════════════════════════════════ */}
            <motion.section {...fadeUp(0.1)} className="relative">
              {/* Background decorative VS */}
              <div className="absolute -top-20 right-0 select-none pointer-events-none">
                <span className="text-[280px] md:text-[400px] font-display font-bold text-ink/[0.02] leading-none">Vs</span>
              </div>

              <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-[1px] bg-moss" />
                <span className="text-[10px] font-bold font-sans uppercase tracking-[0.4em] text-moss">
                  Chapter II
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                <div className="space-y-2">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-moss">Arachnid</span>
                  <h3 className="text-4xl md:text-5xl font-display text-ink leading-tight tracking-tight">
                    Spiders
                  </h3>
                  <p className="text-base text-ink/40 font-serif italic max-w-sm">
                    A separate class from insects, with a body plan built for predation.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-ink/30">Insect</span>
                  <h3 className="text-4xl md:text-5xl font-display text-ink/40 leading-tight tracking-tight">
                    Insects
                  </h3>
                  <p className="text-base text-ink/40 font-serif italic max-w-sm">
                    The most diverse group of animals, distinct in structure and evolution.
                  </p>
                </div>
              </div>

              {/* Comparison Table — Editorial Style */}
              <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20">
                <motion.div {...item(0)} className="space-y-6">
                  <div className="h-[2px] w-12 bg-moss" />
                  <ul className="space-y-6">
                    {[
                      { num: '01', text: 'Two body segments — cephalothorax and abdomen.' },
                      { num: '02', text: 'Eight walking legs with seven joints each.' },
                      { num: '03', text: 'No antennae or wings — purely terrestrial.' },
                      { num: '04', text: 'Simple eyes, usually 8, specialised for different tasks.' },
                    ].map((trait, i) => (
                      <li key={i} className="flex gap-5 items-start group">
                        <span className="text-xs font-mono font-bold text-moss/40 group-hover:text-moss transition-colors duration-300 pt-0.5 shrink-0">
                          {trait.num}
                        </span>
                        <span className="text-base md:text-lg text-ink/70 font-medium leading-relaxed">
                          {trait.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div {...item(1)} className="space-y-6 mt-12 lg:mt-0">
                  <div className="h-[2px] w-12 bg-ink/10" />
                  <ul className="space-y-6">
                    {[
                      { num: '01', text: 'Three body segments — head, thorax, abdomen.' },
                      { num: '02', text: 'Six walking legs, attached to the thorax.' },
                      { num: '03', text: 'Usually possess antennae and often wings.' },
                      { num: '04', text: 'Compound eyes with multiple lenses.' },
                    ].map((trait, i) => (
                      <li key={i} className="flex gap-5 items-start group">
                        <span className="text-xs font-mono font-bold text-ink/20 group-hover:text-ink/40 transition-colors duration-300 pt-0.5 shrink-0">
                          {trait.num}
                        </span>
                        <span className="text-base md:text-lg text-ink/40 font-medium leading-relaxed">
                          {trait.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Editorial footnote */}
              <motion.div {...fadeUp(0.3)} className="mt-16 p-6 bg-fern/40 rounded-2xl border border-fern">
                <p className="text-sm text-ink/50 font-serif italic">
                  While both groups are arthropods, the evolutionary split between arachnids and insects occurred over 400 million years ago. Spiders are more closely related to scorpions and ticks than to any insect.
                </p>
              </motion.div>
            </motion.section>

            {/* ═══════════════════════════════════════════
               SECTION 3 — The Silk Masters
            ════════════════════════════════════════════ */}
            <motion.section {...fadeUp()} className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                {/* Decorative visual block */}
                <div className="lg:col-span-5">
                  <motion.div
                    initial={anim ? {} : { scale: 0.92, filter: "blur(8px)" }}
                    whileInView={anim ? {} : { scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ ...springConfig, delay: 0.15 }}
                    className="aspect-[4/5] rounded-[3rem] overflow-hidden relative"
                  >
                    <Image
                      src="/hero-img/hero-06.jpg"
                      alt="Macro photograph of a spider"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 space-y-10">
                  <motion.div
                    initial={anim ? {} : { opacity: 0, x: -20, filter: "blur(2px)" }}
                    whileInView={anim ? {} : { opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ ...softSpring, delay: 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-16 h-[1px] bg-moss" />
                    <span className="text-[10px] font-bold font-sans uppercase tracking-[0.4em] text-moss">
                      Chapter III
                    </span>
                  </motion.div>

                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-ink leading-[0.95] tracking-tight">
                    The Silk<br />
                    <span className="italic font-serif text-moss">Masters</span>
                  </h2>

                  <div className="space-y-6 max-w-xl">
                    <p className="text-lg md:text-xl text-ink/60 leading-relaxed font-medium">
                      The most defining characteristic of spiders is their ability to produce silk. Using specialised organs called <strong className="text-ink">spinnerets</strong>, they create protein fibres that are stronger than steel by weight and more elastic than nylon.
                    </p>
                    <p className="text-lg md:text-xl text-ink/60 leading-relaxed font-medium">
                      While not all spiders build webs, almost all use silk for draglines, egg sacs, or sensory tripwires. A single orb web can contain over 30 metres of silk, constructed in less than an hour.
                    </p>
                  </div>

                  {/* Pull Quote */}
                  <motion.div
                    initial={anim ? {} : { opacity: 0, x: -24, filter: "blur(2px)" }}
                    whileInView={anim ? {} : { opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ ...softSpring, delay: 0.35 }}
                    className="relative pl-10 border-l-[3px] border-amber/40 my-8"
                  >
                    <p className="text-2xl md:text-3xl font-serif italic text-ink/70 leading-snug">
                      &ldquo;Stronger than steel by weight, more elastic than nylon — and produced from the spider&rsquo;s own body.&rdquo;
                    </p>
                    <span className="text-xs font-sans text-ink/30 uppercase tracking-[0.2em] mt-3 block font-semibold">
                      — The Biology of Silk
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* ═══════════════════════════════════════════
               SECTION 4 — Hunting Strategies
            ════════════════════════════════════════════ */}
            <motion.section {...fadeUp(0.1)}>
              <div className="flex items-center gap-4 mb-16">
                <div className="w-16 h-[1px] bg-moss" />
                <span className="text-[10px] font-bold font-sans uppercase tracking-[0.4em] text-moss">
                  Chapter IV
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-ink leading-[0.95] tracking-tight">
                  Masters of<br />
                  <span className="italic font-serif text-moss">predation</span>
                </h2>
                <p className="text-lg md:text-xl text-ink/60 leading-relaxed font-medium self-end max-w-lg">
                  Spiders have evolved an extraordinary range of hunting techniques, each finely tuned to a specific ecological niche.
                </p>
              </div>

              {/* Strategy Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '🕸️', title: 'Web Builders', accent: 'moss',
                    desc: 'Orb weavers and cobweb spiders construct intricate silk snares, then wait for prey to become entangled. Their webs are both trap and sensory extension — every vibration tells a story.'
                  },
                  {
                    icon: '🕷️', title: 'Active Hunters', accent: 'amber',
                    desc: 'Jumping spiders use exceptional binocular vision and explosive leaps — up to 50 times their body length — to stalk and pounce. They plan routes, learn from experience, and even display courtship dances.'
                  },
                  {
                    icon: '🌺', title: 'Ambush Predators', accent: 'clay',
                    desc: 'Crab spiders camouflage themselves on flowers, matching the colour of their perch. They remain motionless for days, striking only when an unsuspecting pollinator lands within reach.'
                  },
                  {
                    icon: '🏃', title: 'Runners & Chasers', accent: 'ink',
                    desc: 'Wolf spiders combine speed and stealth, chasing down prey across the ground. Their large posterior median eyes give them exceptional night vision for hunting after dark.'
                  },
                ].map((strategy, i) => (
                  <motion.div
                    key={strategy.title}
                    {...item(i)}
                    whileHover={anim ? {} : { y: -6, boxShadow: "0 24px 48px -16px rgba(16,35,27,0.12)" }}
                    className="group relative p-8 md:p-10 bg-white rounded-3xl border border-ink/5 hover:border-moss/20 transition-all duration-500 cursor-default"
                  >
                    <div className="flex items-start gap-6">
                      <span className="text-3xl shrink-0 mt-1">{strategy.icon}</span>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono font-bold text-ink/20">{String(i + 1).padStart(2, '0')}</span>
                          <div className="h-[1px] w-6" style={{ backgroundColor: accentBarColors[strategy.accent] }} />
                        </div>
                        <h3 className="text-2xl font-display text-ink font-semibold">{strategy.title}</h3>
                        <p className="text-sm md:text-base text-ink/50 leading-relaxed font-medium">
                          {strategy.desc}
                        </p>
                      </div>
                    </div>
                    {/* Hover accent bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: accentBarColors[strategy.accent] }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ═══════════════════════════════════════════
               SECTION 5 — Venom & Feeding
            ════════════════════════════════════════════ */}
            <motion.section {...fadeUp()} className="relative overflow-hidden rounded-[3rem] bg-ink text-parchment">
              {/* Decorative background */}
              <div className="absolute -top-20 -right-20 select-none pointer-events-none">
                <span className="text-[300px] md:text-[500px] font-serif italic text-white/[0.02] leading-none">☠</span>
              </div>
              {/* Dot pattern overlay */}
              <motion.div
                initial={anim ? {} : { opacity: 0 }}
                whileInView={anim ? {} : { opacity: 0.02 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #F4EAD7 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative z-10 p-12 md:p-20">
                <motion.div
                  initial={anim ? {} : { opacity: 0, x: -20, filter: "blur(2px)" }}
                  whileInView={anim ? {} : { opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ ...softSpring, delay: 0.1 }}
                  className="flex items-center gap-4 mb-16"
                >
                  <div className="w-16 h-[1px] bg-moss/50" />
                  <span className="text-[10px] font-bold font-sans uppercase tracking-[0.4em] text-moss">
                    Chapter V
                  </span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                  <div className="space-y-10">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-parchment leading-[0.95] tracking-tight">
                      Venom &amp;<br />
                      <span className="italic font-serif text-moss">feeding</span>
                    </h2>
                    <p className="text-lg text-parchment/40 font-serif italic max-w-md leading-relaxed">
                      A highly efficient system for subduing prey and extracting every nutrient.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {[
                      {
                        title: 'Chelicerae & Fangs',
                        body: 'Almost all spiders are venomous. They use specialised chelicerae — jaw-like mouthparts — to inject venom through hollow fangs. This venom immobilises prey and begins the digestive process from within.'
                      },
                      {
                        title: 'Extra-Oral Digestion',
                        body: 'Spiders cannot eat solid food. Once prey is subdued, they pump digestive enzymes into the body and suck out the liquefied remains — a process called extra-oral digestion. Only a hollow husk remains.'
                      },
                      {
                        title: 'Human Risk',
                        body: 'Despite their fearsome reputation, only a handful of species — such as the Black Widow and Sydney Funnel-web — possess venom potent enough to pose a genuine threat to humans. Most spider bites are harmless.'
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.title}
                        {...fadeUp(0.1 * i)}
                        className="space-y-3 pb-8 border-b border-parchment/5 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-moss/60 font-bold">{String(i + 1).padStart(2, '0')}</span>
                          <div className="h-[1px] w-6 bg-moss/30" />
                        </div>
                        <h3 className="text-xl font-display text-parchment">{item.title}</h3>
                        <p className="text-base text-parchment/50 leading-relaxed font-medium">{item.body}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ═══════════════════════════════════════════
               SECTION 6 — Ecological Importance
            ════════════════════════════════════════════ */}
            <motion.section {...fadeUp()}>
              <div className="flex items-center gap-4 mb-16">
                <div className="w-16 h-[1px] bg-moss" />
                <span className="text-[10px] font-bold font-sans uppercase tracking-[0.4em] text-moss">
                  Chapter VI
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-5 space-y-8">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-ink leading-[0.95] tracking-tight">
                    Nature&rsquo;s<br />
                    <span className="italic font-serif text-moss">pest control</span>
                  </h2>
                  <div className="h-[2px] w-16 bg-moss/30" />
                </div>

                <div className="lg:col-span-7 space-y-10">
                  <div className="space-y-6">
                    <p className="text-lg md:text-xl text-ink/60 leading-relaxed font-medium">
                      Spiders are among the most important terrestrial predators. It is estimated that the global spider population consumes <strong className="text-ink">400–800 million tons</strong> of insects and other arthropods annually — more than the total weight of all adult humans on Earth.
                    </p>
                    <p className="text-lg md:text-xl text-ink/60 leading-relaxed font-medium">
                      By keeping insect populations in check, spiders play a vital role in agriculture and ecosystem health. They are also a crucial food source for birds, lizards, and small mammals — an indispensable link in the food web.
                    </p>
                  </div>

                  {/* Editorial Stat Strip */}
                  <motion.div
                    initial={anim ? {} : { opacity: 0, y: 16, filter: "blur(2px)" }}
                    whileInView={anim ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ ...springConfig, delay: 0.3 }}
                    className="grid grid-cols-3 gap-8 pt-4"
                  >
                    {[
                      { value: '~50K', label: 'Species', sub: 'and counting' },
                      { value: '300M+', label: 'Years', sub: 'of evolution' },
                      { value: '7', label: 'Continents', sub: 'all but Antarctica' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center md:text-left">
                        <span className="text-4xl md:text-5xl font-display font-bold text-moss leading-none block">
                          {stat.value}
                        </span>
                        <span className="text-xs font-sans font-bold text-ink/30 uppercase tracking-[0.15em] mt-2 block">
                          {stat.label}
                        </span>
                        <span className="text-[10px] font-serif italic text-ink/20 block mt-0.5">
                          {stat.sub}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.section>

          </div>

          {/* ═══════════════════════════════════════════
             CTA — Explore Anatomy
          ════════════════════════════════════════════ */}
          <motion.div
            {...fadeUp(0.2)}
            className="mt-40 relative"
          >
            {/* Decorative divider */}
            <div className="flex items-center gap-6 mb-16">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-moss/30 to-transparent" />
              <span className="text-[8px] font-sans font-bold uppercase tracking-[0.5em] text-moss/40">Continue</span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-moss/30 to-transparent" />
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-lg font-serif italic text-ink/40 mb-3 max-w-lg">
                Now that you understand the spider&rsquo;s world, explore how its body is engineered for survival.
              </p>
              <span className="text-xs font-sans text-ink/20 uppercase tracking-[0.3em] mb-8 font-semibold">
                Next Chapter
              </span>
              
              <Link
                href="/anatomy"
                className="group relative inline-flex items-center gap-8 bg-ink text-parchment px-12 py-6 rounded-full font-sans font-bold uppercase tracking-[0.35em] text-[11px] hover:bg-[#0f1f18] transition-all duration-500 overflow-hidden active:scale-[0.97]"
              >
                <span className="relative z-10">Explore Spider Anatomy</span>
                <span className="relative z-10 w-10 h-[1px] bg-parchment/30 group-hover:w-16 group-hover:bg-parchment/60 transition-all duration-500" />
                <span className="absolute inset-0 bg-white/[0.03] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </MainLayout>
  );
}
