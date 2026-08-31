"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import galleryData from "@/data/gallery.json";

export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(galleryData.map(item => item.category)))];
  
  const filteredData = filter === "All" 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  return (
    <section className="relative w-full py-20 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-display text-4xl text-[var(--color-champagne-gold)] mb-4">Captured Moments</h2>
        <p className="font-body text-white/50 max-w-lg">
          A collection of fragments, light, and elegance.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-body text-xs tracking-widest uppercase transition-all duration-300 ${
              filter === cat 
                ? "bg-[var(--color-blush-pink)] text-[var(--color-deep-night)]" 
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence>
          {filteredData.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="relative break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedImage(item.id)}
            >
              <div 
                className="glass-card overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_rgba(232,160,191,0.2)]"
                style={{ transform: `rotate(${item.tilt}deg)` }}
              >
                <div className="aspect-[3/4] bg-white/5 relative flex items-center justify-center overflow-hidden">
                  <img 
                    src={item.url} 
                    alt={item.caption}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110 mix-blend-lighten"
                  />
                </div>
                <div className="p-4 bg-[var(--color-warm-black)]/80 backdrop-blur-sm">
                  <p className="font-body text-sm text-white/70">{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-deep-night)]/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              layoutId={`image-${selectedImage}`}
              className="relative w-full max-w-4xl aspect-[3/4] md:aspect-auto md:h-[80vh] glass-card flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={galleryData.find(img => img.id === selectedImage)?.url} 
                alt="Fullscreen view"
                className="w-full h-full object-contain"
              />
              
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-white">✕</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
