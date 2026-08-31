"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import galleryData from "@/data/gallery.json";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const selectedItem = selectedImage !== null ? galleryData.find((img) => img.id === selectedImage) : null;

  return (
    <section className="section-shell py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="section-header mb-20"
      >
        <span className="section-eyebrow">
          Gallery
        </span>
        <h2 className="section-title mb-4">
          Captured Moments
        </h2>
        <p className="section-subtext max-w-md mx-auto">
          Fragments of light and things worth remembering.
        </p>
      </motion.div>

      {/* Grid — clean, uniform, no tilts */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {galleryData.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="focus-ring group text-left"
            onClick={() => setSelectedImage(item.id)}
            aria-label={`Open image: ${item.caption}`}
          >
            <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
                style={{ filter: "brightness(0.75) contrast(1.05) saturate(0.85)" }}
              />
              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                <p className="font-body text-[12px] text-white/80 tracking-wide font-light">{item.caption}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem?.url}
                alt={selectedItem?.caption ?? "Selected gallery image"}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />

              <button
                onClick={() => setSelectedImage(null)}
                className="focus-ring absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white/60 text-xs"
                aria-label="Close image preview"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
