"use client";

import { Gallery } from "@/components/sections/Gallery";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { LikeComment } from "@/components/ui/LikeComment";
import { PageNav } from "@/components/ui/PageNav";

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen">
      <MouseGlow />
      <FloatingNav />
      <div className="pt-24" />
      <Gallery />
      <LikeComment pageId="gallery" />
      <PageNav 
        prev={{ href: "/story", label: "Story" }} 
        next={{ href: "/notes", label: "Notes" }} 
      />
    </main>
  );
}
