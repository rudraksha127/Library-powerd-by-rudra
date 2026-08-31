"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import chapters from "@/data/chapters.json";

export function StoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate each chapter individually
    chaptersRef.current.forEach((chapter, index) => {
      if (!chapter) return;
      
      const text = chapter.querySelector(".chapter-text");
      const image = chapter.querySelector(".chapter-image");
      
      // Image Parallax
      gsap.fromTo(
        image,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: -50,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: chapter,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text Fade up
      gsap.fromTo(
        text,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: chapter,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section id="story" ref={containerRef} className="relative w-full py-32 flex flex-col gap-32 md:gap-64 px-4 overflow-hidden">
      
      {/* Glowing Vertical Timeline */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/5 md:block hidden">
        <div className="w-full h-[20vh] bg-gradient-to-b from-transparent via-[var(--color-champagne-gold)] to-transparent opacity-50 blur-[2px]" />
      </div>

      {chapters.map((chapter, i) => (
        <div 
          key={chapter.id} 
          ref={(el) => {
            if (el) chaptersRef.current[i] = el;
          }}
          className={`flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl mx-auto ${
            chapter.alignment === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image Container */}
          <div className="chapter-image w-full md:w-1/2 aspect-[4/5] relative glass-card overflow-hidden">
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
            <img 
              src={chapter.image} 
              alt={chapter.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-lighten"
            />
          </div>

          {/* Text Container */}
          <div className="chapter-text w-full md:w-1/2 flex flex-col justify-center px-4 md:px-12 text-center md:text-left">
            <h2 className="font-display text-3xl md:text-5xl text-[var(--color-champagne-gold)] mb-6">
              {chapter.title}
            </h2>
            <p className="font-body text-lg md:text-xl text-white/80 leading-relaxed mb-4">
              "{chapter.quote}"
            </p>
            <span className="font-handwritten text-2xl text-[var(--color-blush-pink)] opacity-80">
              — {chapter.caption}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
