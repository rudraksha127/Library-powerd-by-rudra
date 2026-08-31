"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const thoughts = [
  {
    id: 1,
    hint: "On your vibe",
    content: "Aapki vibe bohot calm, genuine aur sorted hai — which is honestly very rare.",
  },
  {
    id: 2,
    hint: "A genuine observation",
    content: "Your energy and smile genuinely bring a lot of effortless positivity around.",
  },
  {
    id: 3,
    hint: "The way you carry yourself",
    content: "Aapke baat karne ke tarike mein ek bohot natural grace aur respect hai.",
  },
  {
    id: 4,
    hint: "A light thought",
    content: "It's always refreshing when someone is just authentically themselves.",
  },
  {
    id: 5,
    hint: "Pure appreciation",
    content: "Some people just make everyday conversations feel easy, warm and interesting.",
  },
  {
    id: 6,
    hint: "A simple note",
    content: "A good cup of chai and a nice, thoughtful conversation — always a great idea.",
  }
];

export function SecretVault() {
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

  const reveal = (id: number) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <section className="relative w-full py-32 px-6 sm:px-8 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="font-body text-[10px] tracking-[0.4em] text-[var(--color-champagne-gold)]/50 uppercase mb-4 block">
          Observations
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white/85 font-normal leading-tight mb-4">
          Little Thoughts
        </h2>
        <p className="font-body text-[13px] text-white/30 max-w-sm mx-auto leading-relaxed font-light">
          A few genuine, friendly notes. Tap a card to read.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {thoughts.map((thought, i) => {
          const isRevealed = revealedIds.has(thought.id);
          return (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => !isRevealed && reveal(thought.id)}
              className={`relative rounded-xl p-7 cursor-pointer transition-all duration-600 min-h-[160px] flex flex-col justify-between ${
                isRevealed
                  ? "bg-white/[0.03] border border-[var(--color-champagne-gold)]/15"
                  : "bg-white/[0.015] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]"
              }`}
            >
              {!isRevealed ? (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </div>
                    <span className="font-body text-[9px] tracking-[0.2em] uppercase text-white/20 font-light">
                      Tap
                    </span>
                  </div>
                  <p className="font-body text-sm text-white/40 font-light leading-relaxed">
                    {thought.hint}
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col justify-between h-full"
                >
                  <div className="w-5 h-5 rounded-full border border-[var(--color-champagne-gold)]/30 flex items-center justify-center mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-champagne-gold)]/60" />
                  </div>
                  <p className="font-body text-[13px] text-white/70 leading-[1.8] font-light">
                    {thought.content}
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-14"
      >
        <p className="font-body text-[10px] text-white/20 tracking-[0.3em] uppercase">
          {revealedIds.size === thoughts.length
            ? "All notes read"
            : `${revealedIds.size} / ${thoughts.length}`
          }
        </p>
      </motion.div>
    </section>
  );
}
