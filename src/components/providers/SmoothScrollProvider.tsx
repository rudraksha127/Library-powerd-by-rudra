"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return (
    <ReactLenis
      root
      options={reduceMotion ? { lerp: 1, duration: 0, smoothWheel: false } : { lerp: 0.05, duration: 1.5, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
