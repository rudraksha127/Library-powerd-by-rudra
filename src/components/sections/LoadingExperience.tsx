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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-deep-night)] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        >
          {/* Enhanced Aurora Background for Preloader */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[var(--color-blush-pink)] rounded-full blur-[100px] opacity-20 mix-blend-screen pointer-events-none" 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/3 left-1/3 w-[60vw] h-[60vw] bg-[var(--color-lavender-mist)] rounded-full blur-[120px] opacity-10 mix-blend-screen pointer-events-none" 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.div
            className="z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="font-display text-3xl md:text-5xl tracking-[0.25em] text-[var(--color-champagne-gold)] font-light uppercase text-glow"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Project Aurora
            </motion.h2>
            
            <div className="flex flex-col items-center gap-4">
              <div className="h-[2px] w-64 bg-white/10 overflow-hidden relative rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--color-champagne-gold)] to-[var(--color-blush-pink)] shadow-[0_0_10px_rgba(212,165,116,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "linear", duration: 0.2 }}
                />
              </div>
              <p className="font-body text-xs tracking-[0.2em] text-white/50 uppercase">
                {progress === 100 ? "Ready" : `Loading ${Math.min(progress, 100)}%`}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
