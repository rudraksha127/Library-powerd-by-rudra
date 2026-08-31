"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}

export function PageNav({ prev, next }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-16 mb-8 flex items-center justify-between">
      {prev ? (
        <Link href={prev.href} className="focus-ring rounded-full">
          <motion.div
            whileHover={{ x: -4 }}
            className="interactive-pill flex items-center gap-2 px-5 py-2.5 hover:border-[var(--color-champagne-gold)]/30 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--color-champagne-gold)] transition-colors" />
            <span className="font-body text-[11px] tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">
              {prev.label}
            </span>
          </motion.div>
        </Link>
      ) : <div />}

      {next ? (
        <Link href={next.href} className="focus-ring rounded-full">
          <motion.div
            whileHover={{ x: 4 }}
            className="interactive-pill flex items-center gap-2 px-5 py-2.5 hover:border-[var(--color-champagne-gold)]/30 group"
          >
            <span className="font-body text-[11px] tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">
              {next.label}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--color-champagne-gold)] transition-colors" />
          </motion.div>
        </Link>
      ) : <div />}
    </div>
  );
}
