"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (heroRef.current && textRef.current) {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 150,
        opacity: 0,
      });
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background with subtle glow */}
      <div className="absolute inset-0 bg-[var(--color-deep-night)] overflow-hidden">
        {/* Animated Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[var(--color-lavender-mist)] opacity-10 blur-[120px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[var(--color-blush-pink)] opacity-[0.08] blur-[150px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -30, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-champagne-gold)] blur-[100px] mix-blend-screen" 
        />
      </div>

      {/* Main Content */}
      <div ref={textRef} className="relative z-10 flex flex-col items-center text-center px-4 mt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="font-body text-xs md:text-sm tracking-[0.3em] text-[var(--color-champagne-gold)] uppercase mb-6"
        >
          For Radhika Ji
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-8"
        >
          <span className="block text-glow text-white/90">A creative project</span>
          <span className="block italic text-white/60">inspired by elegance</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <button className="glass-card px-8 py-3 font-body text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300">
            Begin Journey
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
