"use client";

import { useState } from "react";
import { LoadingExperience } from "@/components/sections/LoadingExperience";
import { Hero } from "@/components/sections/Hero";
import { StoryScroll } from "@/components/sections/StoryScroll";
import { Gallery } from "@/components/sections/Gallery";
import { Finale } from "@/components/sections/Finale";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { MouseGlow } from "@/components/effects/MouseGlow";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative flex flex-col items-center justify-between">
      {isLoading && <LoadingExperience onComplete={() => setIsLoading(false)} />}
      
      {/* 
        We use opacity to fade in the main content once loading is complete,
        but keep it mounted so images/fonts can load in the background.
      */}
      <div 
        className={`w-full transition-opacity duration-1000 ease-in-out ${
          isLoading ? "opacity-0 h-screen overflow-hidden" : "opacity-100"
        }`}
      >
        <MouseGlow />
        <FloatingNav />
        <Hero />
        <StoryScroll />
        <Gallery />
        <Finale />
      </div>
    </main>
  );
}
