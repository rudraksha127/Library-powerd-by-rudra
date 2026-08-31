"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingExperience({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"intro" | "reveal" | "orbit" | "dissolve" | "done">("intro");

  useEffect(() => {
    // 0s: Intro (Thought text fades in)
    const t1 = setTimeout(() => setPhase("reveal"), 1500); // 1.5s: Photo enters from bottom right
    const t2 = setTimeout(() => setPhase("orbit"), 3000);  // 3.0s: Orbit starts
    const t3 = setTimeout(() => setPhase("dissolve"), 5500); // 5.5s: Dissolve transition
    const t4 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 6500); // 6.5s: Finish

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[var(--color-deep-night)]"
        exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      >
        {/* Subtle Ambient Background */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-50"
          animate={{
            scale: phase === "dissolve" ? 1.1 : 1,
            opacity: phase === "dissolve" ? 0 : 0.5
          }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full mix-blend-screen bg-radial-gradient from-[rgba(196,164,122,0.08)] to-transparent blur-[80px]" />
        </motion.div>

        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          
          {/* Central Anchor / Mark */}
          <motion.div
            className="absolute w-1.5 h-1.5 bg-[var(--color-champagne-gold)] rounded-full shadow-[0_0_15px_rgba(196,164,122,0.6)]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: phase === "dissolve" ? 0 : (phase === "orbit" ? 1 : 0),
              scale: phase === "dissolve" ? 3 : 1,
              rotate: phase === "orbit" ? 360 : 0
            }}
            transition={{ 
              opacity: { duration: 1 },
              scale: { duration: phase === "dissolve" ? 1 : 0.8 },
              rotate: { duration: 5, ease: "linear", repeat: Infinity }
            }}
          />

          {/* Thought Text */}
          <motion.div
            className="absolute z-20 text-center px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: phase === "dissolve" ? 0 : 1,
              y: phase === "orbit" ? -120 : 0,
              x: phase === "orbit" ? [0, 15, 0, -15, 0] : 0, // Gentle orbit sway
            }}
            transition={{ 
              opacity: { duration: 1, ease: "easeOut" },
              y: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
              x: { duration: 8, ease: "linear", repeat: Infinity }
            }}
          >
            <p className="font-display italic text-xl sm:text-2xl md:text-3xl text-white/80 tracking-wide font-light">
              Some moments deserve
            </p>
            <p className="font-display italic text-xl sm:text-2xl md:text-3xl text-white/50 tracking-wide font-light mt-1">
              to be remembered.
            </p>
          </motion.div>

          {/* Portrait from Bottom Right */}
          <motion.div
            className="absolute z-10"
            initial={{ opacity: 0, x: 100, y: 150, scale: 0.85, rotateX: 20, rotateY: -15 }}
            animate={{
              opacity: phase === "intro" ? 0 : (phase === "dissolve" ? 0 : 1),
              x: phase === "intro" ? 100 : (phase === "orbit" ? 0 : 0),
              y: phase === "intro" ? 150 : (phase === "orbit" ? 30 : 50),
              scale: phase === "dissolve" ? 1.1 : 1,
              rotateX: phase === "orbit" ? [0, 6, 0, -6, 0] : 0,
              rotateY: phase === "orbit" ? [0, 6, 0, -6, 0] : 0,
            }}
            transition={{
              opacity: { duration: 1.2, ease: "easeOut" },
              x: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
              y: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
              scale: { duration: 1.5 },
              rotateX: { duration: 7, ease: "easeInOut", repeat: Infinity },
              rotateY: { duration: 6, ease: "easeInOut", repeat: Infinity }
            }}
            style={{ perspective: "1000px" }}
          >
            <div className="relative">
              {/* Soft glow ring behind portrait */}
              <motion.div
                className="absolute inset-[-30px] rounded-full mix-blend-screen"
                style={{ background: "radial-gradient(circle, rgba(196,164,122,0.15) 0%, transparent 60%)" }}
                animate={{
                  scale: phase === "orbit" ? [1, 1.15, 1] : 1,
                  opacity: phase === "orbit" ? [0.4, 0.7, 0.4] : 0.4
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div 
                className="w-44 h-56 sm:w-52 sm:h-68 md:w-60 md:h-80 rounded-2xl border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative z-10 overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)"
                }}
              >
                {/* Inner vignette for seamless photo blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-night)] via-transparent to-transparent opacity-90 z-20 pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] z-20 pointer-events-none rounded-2xl" />
                
                <img 
                  src="/images/aurora-muse.jpg" 
                  alt="Portrait" 
                  className="w-full h-full object-cover object-center relative z-10"
                  style={{ filter: "brightness(0.85) contrast(1.05) saturate(0.9)" }}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
