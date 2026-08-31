"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart } from "lucide-react";

export function Finale() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen py-32 flex flex-col items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[var(--color-champagne-gold)] rounded-full blur-[150px] opacity-10 mix-blend-screen pointer-events-none" />

      {/* Scrapbook Intro */}
      <div className="mb-32 text-center px-4">
        <h2 className="font-display text-4xl text-[var(--color-champagne-gold)] mb-6">A final note</h2>
        <p className="font-body text-white/50 max-w-md mx-auto leading-relaxed">
          Some aesthetics just inspire creativity. Thank you for being the kind of person who makes the world more beautiful just by being in it.
        </p>
      </div>

      {/* Envelope Interactive */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4">
        {!envelopeOpen ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEnvelopeOpen(true)}
            className="group relative w-64 h-48 glass-card flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden transition-shadow hover:shadow-[0_0_40px_rgba(212,165,116,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <Mail className="w-10 h-10 text-[var(--color-champagne-gold)] opacity-80 group-hover:scale-110 transition-transform duration-500" />
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[var(--color-champagne-gold)] opacity-80">
              Tap to open
            </span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full glass-card p-8 md:p-16 text-center"
          >
            {/* Letter Content */}
            <div className="font-handwritten text-3xl md:text-5xl text-[var(--color-blush-pink)] leading-relaxed mb-12">
              <p className="mb-6">I built this because your presence — even from afar — inspires something creative in me.</p>
              <p>I hope this makes you smile.</p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <span className="font-display text-xl text-white/80">— Rudraksh</span>
              <Heart className="w-4 h-4 text-[var(--color-champagne-gold)] opacity-50" />
            </div>

            {/* Replay Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-16 px-6 py-2 rounded-full border border-white/10 text-white/50 font-body text-xs uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all duration-300"
            >
              Replay Journey
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
