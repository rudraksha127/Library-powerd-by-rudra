"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (heroRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 80,
        opacity: 0,
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient background — very restrained, two soft orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[5%] w-[50vw] h-[50vw] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--color-lavender-mist), transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, -25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[-15%] left-[-5%] w-[55vw] h-[55vw] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, var(--color-champagne-gold), transparent 70%)" }}
        />
      </div>

      {/* Main content block */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="h-[1px] w-8 bg-[var(--color-champagne-gold)]/30" />
          <span className="font-body text-[10px] tracking-[0.4em] text-[var(--color-champagne-gold)]/60 uppercase font-light">
            An Ode to Grace
          </span>
          <span className="h-[1px] w-8 bg-[var(--color-champagne-gold)]/30" />
        </motion.div>

        {/* Headline — large, airy, luxurious */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="font-display text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.15] tracking-[-0.01em] mb-8"
        >
          <span className="block text-white/90 font-normal">Some moments</span>
          <span className="block text-white/90 font-normal">linger,</span>
          <span className="block italic font-light text-white/45 mt-2">long after they pass.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
          className="font-body text-[13px] sm:text-sm text-white/35 max-w-md leading-[1.9] mb-14 font-light tracking-wide"
        >
          A quiet celebration of warmth, subtle elegance,
          <br className="hidden sm:block" /> and the poetry found in unsaid thoughts.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <Link href="/story">
            <span className="inline-block px-8 py-3.5 rounded-full border border-white/[0.08] bg-white/[0.02] font-body text-[10px] tracking-[0.3em] uppercase text-white/60 hover:text-white/90 hover:border-[var(--color-champagne-gold)]/30 hover:bg-white/[0.04] transition-all duration-700 cursor-pointer">
              Begin
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint — barely visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
