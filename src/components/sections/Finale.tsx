"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";

export function Finale() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <section id="finale" className="relative w-full min-h-screen py-36 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Aura */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-[var(--color-champagne-gold)] rounded-full blur-[160px] mix-blend-screen pointer-events-none"
        animate={{ opacity: envelopeOpen ? 0.12 : 0.04 }}
        transition={{ duration: 1.8 }}
      />

      {/* Epilogue Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="section-header mb-20 px-6"
      >
        <span className="section-eyebrow mb-3 text-[var(--color-champagne-gold)]/70">
          Epilogue
        </span>
        <h2 className="section-title mb-4">
          A Quiet Note
        </h2>
        <p className="section-subtext max-w-sm mx-auto">
          For the grace that leaves a lasting impression.
        </p>
      </motion.div>

      {/* Envelope Component */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {!envelopeOpen ? (
            <motion.button
              key="closed"
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setEnvelopeOpen(true)}
              className="focus-ring group relative w-72 h-48 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl flex flex-col items-center justify-center gap-4 hover:border-[var(--color-champagne-gold)]/40 hover:shadow-[0_0_45px_rgba(212,165,116,0.12)] transition-all duration-700"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Mail className="w-9 h-9 text-[var(--color-champagne-gold)] opacity-70 group-hover:opacity-95 transition-opacity duration-500" />
              </motion.div>
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40 group-hover:text-white/70 transition-colors">
                Open Letter
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-14 text-center shadow-2xl"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="font-display text-2xl sm:text-3xl text-[var(--color-blush-pink)]/90 leading-relaxed mb-6 font-normal italic"
              >
                "Kuch log bina kuch kahe bhi<br />ek gehra asar chhod jaate hain."
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="font-body text-xs sm:text-sm text-white/45 max-w-md mx-auto leading-relaxed mb-10 font-light"
              >
                May your days always carry the same warmth and elegance that you bring into the world.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="flex items-center justify-center gap-3"
              >
                <div className="h-[1px] w-10 bg-white/15" />
                <span className="font-display text-base tracking-widest text-white/70 font-light">— R</span>
                <div className="h-[1px] w-10 bg-white/15" />
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="focus-ring absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                title="Back to top"
              >
                <ArrowUp className="w-3.5 h-3.5 text-white/50" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
