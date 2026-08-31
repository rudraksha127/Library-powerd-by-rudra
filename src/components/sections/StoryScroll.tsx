"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import chapters from "@/data/chapters.json";

export function StoryScroll() {
  const chaptersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    chaptersRef.current.forEach((chapter) => {
      if (!chapter) return;

      const text = chapter.querySelector(".chapter-text");
      const image = chapter.querySelector(".chapter-image");

      if (image) {
        gsap.fromTo(image,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            scrollTrigger: {
              trigger: chapter,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      if (text) {
        gsap.fromTo(text,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            scrollTrigger: {
              trigger: chapter,
              start: "top 70%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );
      }
    });
  }, []);

  return (
    <section className="relative w-full pt-32 pb-40 flex flex-col gap-48 md:gap-64 px-6 sm:px-8 overflow-hidden">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="font-body text-[10px] tracking-[0.4em] text-[var(--color-champagne-gold)]/50 uppercase mb-4 block">
          Chapters
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white/85 font-normal leading-tight">
          Stories Worth Telling
        </h2>
      </motion.div>

      {chapters.map((chapter, i) => (
        <div
          key={chapter.id}
          ref={(el) => { if (el) chaptersRef.current[i] = el; }}
          className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full max-w-5xl mx-auto ${
            chapter.alignment === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image — clean, no tilt, elegant frame */}
          <div className="chapter-image w-full md:w-[48%] aspect-[3/4] relative overflow-hidden rounded-xl">
            <img
              src={chapter.image}
              alt={chapter.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
              style={{ filter: "brightness(0.8) contrast(1.05) saturate(0.85)" }}
            />
            {/* Soft bottom gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-night)]/50 via-transparent to-transparent" />
          </div>

          {/* Text */}
          <div className={`chapter-text w-full md:w-[48%] flex flex-col justify-center ${
            chapter.alignment === "right" ? "md:text-right md:items-end" : "md:text-left md:items-start"
          } text-center items-center`}>
            <span className="font-body text-[10px] tracking-[0.35em] text-[var(--color-champagne-gold)]/50 uppercase mb-5 block">
              {chapter.title}
            </span>
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-white/75 leading-[1.5] font-light italic mb-5 max-w-md">
              &ldquo;{chapter.quote}&rdquo;
            </p>
            <span className="font-body text-[11px] text-white/25 tracking-widest font-light">
              {chapter.caption}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
