"use client";

import React, { Children, useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Optimized Specimen Card (Framer Motion)
 * Fixed: Removed conflicting top/left and percentage transforms
 */
export const Card = ({ children, className, ...props }) => (
  <motion.div
    {...props}
    className={`absolute rounded-[2.5rem] border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden group ${className ?? ''}`.trim()}
    style={{ 
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      ...props.style 
    }}
  >
    {/* Inner Rim Light */}
    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-50" />
    <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none" />
    
    {children}
  </motion.div>
);

/**
 * Stable & High-Performance CardSwap
 */
const CardSwap = ({
  width = 400,
  height = 500,
  cardDistance = 40,
  verticalDistance = 50,
  delay = 5000,
  activeIndex = 0,
  onSwap,
  children
}) => {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  
  // Initialize order so that activeIndex is at index 0
  const [order, setOrder] = useState(() => {
    const initialIndices = childArr.map((_, i) => i);
    const targetIdx = initialIndices.indexOf(activeIndex);
    if (targetIdx <= 0) return initialIndices;
    return [...initialIndices.slice(targetIdx), ...initialIndices.slice(0, targetIdx)];
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Sync internal order with external activeIndex prop
  useEffect(() => {
    setOrder((prev) => {
      const targetIdx = prev.indexOf(activeIndex);
      if (targetIdx === 0) return prev; // Already at front
      
      // Rotate the array so that activeIndex is at the front
      const newOrder = [...prev.slice(targetIdx), ...prev.slice(0, targetIdx)];
      return newOrder;
    });
  }, [activeIndex]);

  // handleSwap now just tells the parent to change index
  const handleSwap = () => {
    if (childArr.length < 2 || isAnimating) return;

    setIsAnimating(true);
    
    // Find what the next index should be (the one currently at order[1])
    const nextIndex = order[1];
    
    if (onSwap) {
      onSwap(nextIndex);
    }

    // Reset animating flag after transition duration
    setTimeout(() => setIsAnimating(false), 1200);
  };

  // Fix: Stable interval logic
  useEffect(() => {
    if (isAnimating) return;

    const interval = setInterval(() => {
      handleSwap();
    }, delay);

    return () => clearInterval(interval);
  }, [delay, isAnimating, order]);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center" 
      style={{ perspective: "2000px" }}
    >
      <AnimatePresence initial={false}>
        {order.map((childIdx, displayIdx) => {
          const child = childArr[childIdx];
          
          // Fix: Use numeric values for transforms
          const x = displayIdx * cardDistance;
          const y = -displayIdx * verticalDistance;
          const z = -displayIdx * 100; // Framer Motion handles z as translateZ
          const scale = 1 - (displayIdx * 0.05);
          const opacity = Math.max(0, 1 - (displayIdx * 0.2));

          return (
            <Card
              key={child.key || childIdx} // Use stable keys from children
              animate={{
                x,
                y,
                z,
                scale,
                opacity,
                filter: displayIdx === 0 ? "blur(0px)" : `blur(${displayIdx * 2}px)`,
                zIndex: childArr.length - displayIdx,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                zIndex: { delay: displayIdx === childArr.length - 1 ? 0.5 : 0 }
              }}
              style={{ width, height }}
              className={child.props.className}
            >
              {child.props.children}
            </Card>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CardSwap;
