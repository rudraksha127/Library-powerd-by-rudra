"use client";

import { useState } from "react";
import { LoadingExperience } from "@/components/sections/LoadingExperience";
import { Hero } from "@/components/sections/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { LikeComment } from "@/components/ui/LikeComment";
import { PageNav } from "@/components/ui/PageNav";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen">
      {isLoading && <LoadingExperience onComplete={() => setIsLoading(false)} />}
      
      <div className={`w-full transition-opacity duration-1000 ease-in-out ${
        isLoading ? "opacity-0 h-screen overflow-hidden" : "opacity-100"
      }`}>
        <MouseGlow />
        <FloatingNav />
        <Hero />
        <LikeComment pageId="home" />
        <PageNav next={{ href: "/story", label: "Story" }} />
      </div>
    </main>
  );
}
