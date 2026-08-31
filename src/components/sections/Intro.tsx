"use client";

import { motion } from "framer-motion";

export function Intro() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-deep-night)]">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[var(--color-champagne-gold)] rounded-full blur-[150px] opacity-10 mix-blend-screen pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 flex flex-col items-center justify-center max-w-3xl text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-[var(--color-champagne-gold)] blur-[40px] opacity-20 rounded-full animate-pulse" />
          <img 
            src="/images/radhakrishna.jpg" 
            alt="Radha Krishna" 
            className="relative w-56 h-56 md:w-72 md:h-72 object-cover rounded-full border border-white/10 shadow-2xl"
          />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="font-display text-2xl md:text-4xl text-[var(--color-champagne-gold)] mb-8 leading-relaxed font-light"
        >
          "Jahan shuddhata hai, wahi samarpan hai.<br />Jahan samarpan hai, wahi sacha prem hai."
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="font-body text-sm text-white/50 tracking-widest uppercase"
        >
          An offering of pure admiration
        </motion.p>
      </motion.div>
    </section>
  );
}
