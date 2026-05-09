"use client";

import { motion } from "framer-motion";

const FAMILIES = [
  "Araneidae", "Salticidae", "Lycosidae", "Theraphosidae", "Theridiidae", "Thomisidae", "Sparassidae"
];

export default function TaxonomyChips() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-sm font-sans uppercase tracking-[0.2em] text-ink/40 font-bold">
        Explore Major Families
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {FAMILIES.map((family, index) => (
          <motion.button
            key={family}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, backgroundColor: "#10231B", color: "#F4EAD7" }}
            className="px-6 py-2 rounded-full border border-ink/10 text-ink/60 text-sm font-medium transition-colors"
          >
            {family}
          </motion.button>
        ))}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: FAMILIES.length * 0.1 }}
          viewport={{ once: true }}
          className="px-6 py-2 rounded-full bg-fern text-ink text-sm font-bold hover:bg-moss hover:text-parchment transition-colors"
        >
          View All 138 Families →
        </motion.button>
      </div>
    </div>
  );
}
