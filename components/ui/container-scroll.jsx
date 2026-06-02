"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const SPRING = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
  duration: 0.3,
};

function useAnimationVariants(animate) {
  return React.useMemo(() => {
    const from = {};
    switch (animate) {
      case "left":
        from.x = "-100%";
        break;
      case "right":
        from.x = "100%";
        break;
      case "top":
        from.y = "-100%";
        break;
      case "bottom":
        from.y = "100%";
        break;
      case "z":
        from.scale = 0;
        break;
      case "blur":
        from.filter = "blur(10px)";
        break;
    }
    from.opacity = 0;
    return {
      hidden: from,
      visible: {
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
      },
    };
  }, [animate]);
}

const ContainerScrollContext = React.createContext(undefined);

function useContainerScroll() {
  const ctx = React.useContext(ContainerScrollContext);
  if (!ctx) {
    throw new Error(
      "useContainerScroll must be used within <ContainerScroll>"
    );
  }
  return ctx;
}

export function ContainerScroll({ children, className, ...props }) {
  const scrollRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <section
        ref={scrollRef}
        className={cn("relative min-h-[120vh] w-full pb-[30%] pt-8", className)}
        {...props}
      >
        {children}
      </section>
    </ContainerScrollContext.Provider>
  );
}

export const ContainerStagger = React.forwardRef(function ContainerStagger(
  { children, className, viewport, transition, ...props },
  ref
) {
  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, ...viewport }}
      transition={{
        staggerChildren: transition?.staggerChildren || 0.2,
        ...transition,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export const ContainerAnimated = React.forwardRef(function ContainerAnimated(
  { animation, children, className, ...props },
  ref
) {
  const variants = useAnimationVariants(animation);
  return (
    <motion.div
      ref={ref}
      variants={variants}
      transition={SPRING}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export const ContainerInset = React.forwardRef(function ContainerInset(
  {
    translateYRange = ["-25%", "50%"],
    insetYRange = [35, 0],
    insetXRange = [42, 0],
    roundednessRange = [1000, 16],
    children,
    className,
    ...props
  },
  ref
) {
  const { scrollYProgress } = useContainerScroll();
  const y = useTransform(scrollYProgress, [0, 1], translateYRange);
  const insetY = useTransform(scrollYProgress, [0, 1], insetYRange);
  const insetX = useTransform(scrollYProgress, [0, 1], insetXRange);
  const roundedness = useTransform(
    scrollYProgress,
    [0, 1],
    roundednessRange
  );
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;

  return (
    <motion.div
      ref={ref}
      transition={SPRING}
      className={cn("origin-top overflow-hidden", className)}
      style={{ y, clipPath, ...props.style }}
      {...props}
    >
      {children}
    </motion.div>
  );
});
