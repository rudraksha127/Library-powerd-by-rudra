"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Play, Pause } from "lucide-react";

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Audio logic will be added here later
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-lg glass-card px-6 py-4 flex items-center justify-between"
    >
      <div className="font-display tracking-[0.2em] text-sm uppercase text-white/90">
        Aurora
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          className="font-body text-[10px] tracking-widest uppercase text-white/60 hover:text-white transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Top
        </button>
        <button 
          onClick={toggleMusic}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="w-3 h-3 text-white/80" /> : <Play className="w-3 h-3 ml-0.5 text-white/80" />}
        </button>
      </div>
    </motion.nav>
  );
}
