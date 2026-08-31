"use client";

import { StoryScroll } from "@/components/sections/StoryScroll";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { LikeComment } from "@/components/ui/LikeComment";
import { PageNav } from "@/components/ui/PageNav";

export default function StoryPage() {
  return (
    <main className="relative min-h-screen">
      <MouseGlow />
      <FloatingNav />
      <StoryScroll />
      <LikeComment pageId="story" />
      <PageNav 
        prev={{ href: "/", label: "Home" }} 
        next={{ href: "/gallery", label: "Moments" }} 
      />
    </main>
  );
}
