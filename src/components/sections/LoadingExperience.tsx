"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingExperience({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        // Random progress jump between 1 and 15
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-deep-night)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
        >
          {/* Subtle Aurora Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[var(--color-blush-pink)] rounded-full blur-[120px] opacity-20 mix-blend-screen pointer-events-none" />

          <motion.div
            className="z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-2xl tracking-[0.2em] text-[var(--color-champagne-gold)] font-light uppercase">
              Project Aurora
            </h2>
            <div className="flex flex-col items-center gap-2">
              <div className="h-[1px] w-48 bg-white/10 overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[var(--color-champagne-gold)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <p className="font-body text-xs tracking-[0.1em] text-white/40 uppercase">
                {Math.min(progress, 100)}%
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
