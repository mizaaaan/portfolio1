"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { EXPO_OUT_BEZIER } from "@/lib/motion";

/**
 * Page transition for client-side navigations (useful once you add routes).
 * The very first render skips the animation so server-rendered content is
 * never hidden before hydration (important for LCP).
 */
let isFirstRender = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const initial = isFirstRender || reduce ? false : { opacity: 0, y: 16 };

  useEffect(() => {
    isFirstRender = false;
  }, []);

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EXPO_OUT_BEZIER }}
    >
      {children}
    </motion.div>
  );
}
