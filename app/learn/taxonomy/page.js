'use client';

import MainLayout from '@/components/layout/MainLayout';
import ChapterHeading from '@/components/ui/ChapterHeading';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ease = [0.22, 1, 0.36, 1];
const slugify = (name) => name?.replace(/ /g, '-').toLowerCase();

const taxonomyTree = {
  rank: 'Order',
  name: 'Araneae',
  desc: 'All spiders — 50,000+ described species',
  children: [
    {
      rank: 'Family',
      name: 'Salticidae',
      desc: 'Jumping Spiders',
      children: [
        {
          rank: 'Genus',
          name: 'Phidippus',
          desc: '8 species documented',
          children: [
            { rank: 'Species', name: 'Phidippus audax', desc: 'Bold Jumper' },
            { rank: 'Species', name: 'Phidippus regius', desc: 'Regal Jumper' },
          ],
        },
        {
          rank: 'Genus',
          name: 'Habronattus',
          desc: '3 species documented',
          children: [
            { rank: 'Species', name: 'Habronattus coecatus', desc: 'Red-backed Jumper' },
          ],
        },
      ],
    },
    {
      rank: 'Family',
      name: 'Theridiidae',
      desc: 'Cobweb Spiders',
      children: [
        {
          rank: 'Genus',
          name: 'Latrodectus',
          desc: '2 species documented',
          children: [
            { rank: 'Species', name: 'Latrodectus mactans', desc: 'Black Widow' },
          ],
        },
      ],
    },
    {
      rank: 'Family',
      name: 'Araneidae',
      desc: 'Orb Weavers',
      children: [
        {
          rank: 'Genus',
          name: 'Argiope',
          desc: '4 species documented',
          children: [
            { rank: 'Species', name: 'Argiope aurantia', desc: 'Yellow Garden Spider' },
          ],
        },
      ],
    },
  ],
};

function assignSpans(node) {
  if (!node.children?.length) {
    node.span = 1;
  } else {
    node.span = node.children.reduce((s, c) => s + assignSpans(c), 0);
  }
  return node.span;
}

function RankCard({ rank, name, desc, compact }) {
  return (
    <div className="group relative flex items-stretch gap-0 p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-ink/5 hover:border-moss/20 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] w-full h-full">
      <div className="relative w-0.5 shrink-0 bg-ink/5 overflow-hidden">
        <div className="absolute inset-0 bg-moss/50 scale-y-0 origin-top transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
      </div>
      <div className="flex-1 pl-3 md:pl-4 min-w-0 flex flex-col justify-center">
        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] text-moss">
          {rank}
        </span>
        <h3 className={`font-serif text-ink italic leading-tight tracking-tight mt-0.5 ${compact ? 'text-sm md:text-lg' : 'text-base md:text-xl'}`}>
          {name}
        </h3>
        {desc && (
          <p className={`text-ink/45 leading-relaxed mt-0.5 ${compact ? 'text-[11px] md:text-xs' : 'text-xs md:text-sm'}`}>
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}

function ClassificationTree({ tree }) {
  assignSpans(tree);
  const totalSpan = tree.span;

  const getHref = (node) => {
    switch (node.rank) {
      case 'Family': return `/family/${slugify(node.name)}`;
      case 'Genus': return `/genus/${slugify(node.name)}`;
      case 'Species': return `/species/${slugify(node.name)}`;
      default: return null;
    }
  };

  const levels = [];
  function collect(node, depth) {
    if (!levels[depth]) levels[depth] = [];
    levels[depth].push(node);
    node.children?.forEach(c => collect(c, depth + 1));
  }
  collect(tree, 0);

  const positions = new Map();
  levels.forEach(nodes => {
    let offset = 0;
    nodes.forEach(node => {
      positions.set(node.name, {
        span: node.span,
        left: offset,
        center: offset + node.span / 2,
        right: offset + node.span,
      });
      offset += node.span;
    });
  });

  const pct = (v) => `${(v / totalSpan) * 100}%`;
  const GAP = 44;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      {levels.map((nodes, depth) => (
        <div key={depth}>
          {/* Level row */}
          <div className="flex items-stretch gap-2 md:gap-3">
            {nodes.map(node => {
              const pos = positions.get(node.name);
              return (
                <div
                  key={node.name}
                  className="flex-shrink-0 flex justify-center"
                  style={{ width: pct(pos.span) }}
                >
                  {(() => {
                    const href = getHref(node);
                    const wrapperClass = "w-full max-w-[220px] md:max-w-[260px]";
                    const card = (
                      <RankCard
                        rank={node.rank}
                        name={node.name}
                        desc={node.desc}
                        compact={depth >= 2}
                      />
                    );
                    return href ? (
                      <Link href={href} className={wrapperClass + " block cursor-pointer"}>
                        {card}
                      </Link>
                    ) : (
                      <div className={wrapperClass}>
                        {card}
                      </div>
                    );
                  })()}
                </div>
              );
            })}
          </div>

          {/* SVG branch connectors */}
          {depth < levels.length - 1 && (
            <svg
              className="w-full overflow-visible"
              style={{ height: GAP }}
              preserveAspectRatio="none"
            >
              {nodes.flatMap(parent => {
                if (!parent.children?.length) return [];
                const children = parent.children;
                const parPos = positions.get(parent.name);
                const childPositions = children.map(c => positions.get(c.name));
                const midY = GAP * 0.35;

                return [
                  // Vertical from parent down to branch point
                  <line
                    key={`pv-${parent.name}`}
                    x1={pct(parPos.center)} y1="0"
                    x2={pct(parPos.center)} y2={midY}
                    stroke="#C9C7BD" strokeWidth="1"
                  />,
                  // Horizontal branch spanning all children
                  ...(children.length > 1 ? [
                    <line
                      key={`ph-${parent.name}`}
                      x1={pct(childPositions[0].center)} y1={midY}
                      x2={pct(childPositions[childPositions.length - 1].center)} y2={midY}
                      stroke="#C9C7BD" strokeWidth="1"
                    />,
                  ] : []),
                  // Vertical from branch to each child
                  ...childPositions.map((cp, i) => (
                    <line
                      key={`cv-${parent.name}-${i}`}
                      x1={pct(cp.center)} y1={midY}
                      x2={pct(cp.center)} y2={GAP}
                      stroke="#C9C7BD" strokeWidth="1"
                    />
                  )),
                  // Dots at branch junctions
                  ...(children.length > 1 ? childPositions.map((cp, i) => (
                    <circle
                      key={`dot-${parent.name}-${i}`}
                      cx={pct(cp.center)} cy={midY}
                      r="1.5" fill="#C9C7BD"
                    />
                  )) : []),
                  // Dot at parent junction
                  <circle
                    key={`pdot-${parent.name}`}
                    cx={pct(parPos.center)} cy={midY}
                    r="2" fill="#C9C7BD"
                  />,
                ];
              })}
            </svg>
          )}
        </div>
      ))}
    </motion.div>
  );
}

export default function LearnTaxonomyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-parchment pt-32 pb-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <ChapterHeading
            title="Taxonomy & Naming"
            subtitle="The language of biological classification."
          />

          <div className="mt-24 space-y-32">

            {/* ── The Hierarchy ── */}
            <section className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-[1px] bg-moss" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-moss">
                    The Hierarchy
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <h3 className="text-4xl font-serif text-ink italic leading-tight">
                    How are spiders classified?
                  </h3>
                  <p className="text-lg text-ink/60 leading-relaxed font-medium">
                    Biological taxonomy groups organisms by evolutionary relationships. Spiders descend through a branching hierarchy from broad order to individual species, each rank revealing more about their biological identity.
                  </p>
                </div>
              </motion.div>

              {/* Classification Tree */}
              <div className="max-w-4xl mx-auto mt-20">
                <ClassificationTree tree={taxonomyTree} />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.8 }}
                className="text-center text-[11px] font-mono text-ink/25 tracking-wider mt-12"
              >
                Each rank branches into multiple groups below it
              </motion.p>
            </section>

            {/* ── The Binomial System ── */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pt-24 border-t border-ink/5">
              <motion.div
                className="md:col-span-1"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease }}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-moss">
                  The Binomial System
                </span>
              </motion.div>

              <motion.div
                className="md:col-span-2 space-y-10"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease }}
              >
                <h3 className="text-4xl font-serif text-ink">Reading a Scientific Name</h3>
                <p className="text-lg text-ink/60 leading-relaxed font-medium">
                  Every species has a two-part Latin name (Binomial Nomenclature). The <strong>Genus</strong> is capitalized, the <strong>specific epithet</strong> is lowercase &mdash; both are italicized. The <strong>authority</strong> and year denote who first described it.
                </p>

                {/* Annotation Card */}
                <div className="p-10 md:p-14 bg-ink text-parchment rounded-[3rem] relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                    <span className="text-4xl md:text-6xl lg:text-7xl font-serif italic leading-none">
                      <span className="text-moss">Poecilotheria</span>
                      <span className="text-parchment/90"> metallica</span>
                    </span>
                    <p className="text-parchment/40 font-serif italic text-lg md:text-xl">
                      Pocock, 1899
                    </p>
                  </div>

                  <div className="relative z-10 mt-10 md:mt-14 grid grid-cols-3 gap-4 md:gap-8">
                    <div className="space-y-2.5">
                      <div className="h-[1px] bg-moss w-full" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-moss block">
                        Genus
                      </span>
                      <span className="text-[11px] text-parchment/30 font-mono block leading-relaxed">
                        Capitalized, italic
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="h-[1px] bg-parchment/20 w-full" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-parchment/60 block">
                        Epithet
                      </span>
                      <span className="text-[11px] text-parchment/30 font-mono block leading-relaxed">
                        Lowercase, italic
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="h-[1px] bg-parchment/20 w-full" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-parchment/40 block">
                        Authority
                      </span>
                      <span className="text-[11px] text-parchment/30 font-mono block leading-relaxed">
                        Descriptor, year
                      </span>
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -right-8 text-parchment/[0.02] font-serif italic text-[12rem] leading-none select-none pointer-events-none">
                    Binom
                  </div>
                </div>

                {/* Flow summary */}
                <div className="flex flex-wrap items-center gap-3 md:gap-5 text-base md:text-lg font-mono pt-2">
                  <span className="text-moss font-bold text-xs md:text-sm uppercase tracking-[0.15em]">Genus</span>
                  <span className="text-ink/30">+</span>
                  <span className="text-moss font-bold text-xs md:text-sm uppercase tracking-[0.15em]">Epithet</span>
                  <span className="text-ink/30">=</span>
                  <span className="font-serif italic text-ink/70">Full Scientific Name</span>
                </div>
              </motion.div>
            </section>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
