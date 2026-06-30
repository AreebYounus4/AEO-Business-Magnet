"use client";

import { ScoreCheckProvider } from "@/components/forms/ScoreCheckContext";
import { SiteNav } from "@/components/landing/SiteNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FrameworkSection } from "@/components/landing/FrameworkSection";
import { PlatformsSection } from "@/components/landing/PlatformsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";
import { SiteFooter } from "@/components/landing/SiteFooter";

export function HomePage() {
  return (
    <ScoreCheckProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-red focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      <SiteNav />
      <main id="main">
        <HeroSection />
        <ProblemSection />
        <FrameworkSection />
        <PlatformsSection />
        <FAQSection />
        <CTASection />
      </main>
      <SiteFooter />
    </ScoreCheckProvider>
  );
}
