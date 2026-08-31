"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Story" },
  { href: "/gallery", label: "Moments" },
  { href: "/notes", label: "Notes" },
  { href: "/finale", label: "Epilogue" },
];

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    audioRef.current = new Audio('/audio/bgm.mp3');
    audioRef.current.loop = true;
    return () => { audioRef.current?.pause(); };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 200) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-120%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl rounded-full border border-white/[0.04] bg-[var(--color-warm-black)]/60 backdrop-blur-[40px] px-5 sm:px-8 py-3.5 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      <Link href="/">
        <span className="font-display text-xs tracking-[0.35em] uppercase text-white/80 font-light hover:text-[var(--color-champagne-gold)] transition-colors cursor-pointer">
          Aurora
        </span>
      </Link>
      
      <div className="hidden sm:flex items-center gap-1.5">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <span className={`px-4 py-2 rounded-full font-body text-[9px] tracking-[0.25em] uppercase transition-all duration-500 cursor-pointer ${
              pathname === link.href 
                ? "bg-white/[0.05] text-white/90" 
                : "text-white/40 hover:text-white/70 hover:bg-white/[0.02]"
            }`}>
              {link.label}
            </span>
          </Link>
        ))}
      </div>
      
      <button 
        onClick={toggleMusic}
        className="h-8 pl-3 pr-4 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center gap-2 hover:bg-white/[0.08] hover:border-[var(--color-champagne-gold)]/20 transition-all duration-500 cursor-pointer"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-3 h-3 text-[var(--color-champagne-gold)]" />
        ) : (
          <Play className="w-3 h-3 text-white/50 ml-0.5" />
        )}
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-white/50 hidden md:inline">
          {isPlaying ? "Playing" : "Audio"}
        </span>
      </button>
    </motion.nav>
  );
}
