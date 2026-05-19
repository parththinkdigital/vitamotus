'use client';

import { motion } from 'framer-motion';

export default function ChapterHeading({ title, subtitle, light = false }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          className={`h-[1px] ${light ? 'bg-parchment/30' : 'bg-moss/30'}`} 
        />
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`text-[10px] font-bold uppercase tracking-[0.4em] ${light ? 'text-parchment/60' : 'text-moss'}`}
        >
          Archive Section
        </motion.span>
      </div>
      
      <div className="space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-5xl md:text-7xl font-serif ${light ? 'text-parchment' : 'text-ink'} leading-tight tracking-tighter`}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-lg md:text-xl font-serif italic ${light ? 'text-parchment/40' : 'text-ink/40'} max-w-2xl`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
