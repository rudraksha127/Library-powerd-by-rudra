"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      animate={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)`,
      }}
    />
  );
}
