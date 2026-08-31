"use client";

import { Finale } from "@/components/sections/Finale";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { LikeComment } from "@/components/ui/LikeComment";
import { PageNav } from "@/components/ui/PageNav";

export default function FinalePage() {
  return (
    <main className="relative min-h-screen">
      <MouseGlow />
      <FloatingNav />
      <div className="pt-24" />
      <Finale />
      <LikeComment pageId="finale" />
      <PageNav 
        prev={{ href: "/notes", label: "Notes" }} 
      />
    </main>
  );
}
