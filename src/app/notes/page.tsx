"use client";

import { SecretVault } from "@/components/sections/SecretVault";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { LikeComment } from "@/components/ui/LikeComment";
import { PageNav } from "@/components/ui/PageNav";

export default function NotesPage() {
  return (
    <main className="relative min-h-screen">
      <MouseGlow />
      <FloatingNav />
      <div className="pt-24" />
      <SecretVault />
      <LikeComment pageId="notes" />
      <PageNav 
        prev={{ href: "/gallery", label: "Moments" }} 
        next={{ href: "/finale", label: "Epilogue" }} 
      />
    </main>
  );
}
