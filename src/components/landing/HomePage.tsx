"use client";

import { ScoreCheckProvider } from "@/components/forms/ScoreCheckContext";
import { SiteNav } from "@/components/landing/SiteNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { BigQuestionSection } from "@/components/landing/BigQuestionSection";
import { HowBrandsWinSection } from "@/components/landing/HowBrandsWinSection";
import { FrameworkSection } from "@/components/landing/FrameworkSection";
import { OutcomesSection } from "@/components/landing/OutcomesSection";
import { TrustSignalsSection } from "@/components/landing/TrustSignalsSection";
import { WhyCalibrateSection } from "@/components/landing/WhyCalibrateSection";
import { ClientsSection } from "@/components/landing/ClientsSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { AuditSection } from "@/components/landing/AuditSection";
import { SiteFooter } from "@/components/landing/SiteFooter";

export function HomePage() {
  return (
    <ScoreCheckProvider>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <HeroSection />
        <LogoStrip />
        <ProblemSection />
        <BigQuestionSection />
        <HowBrandsWinSection />
        <FrameworkSection />
        <OutcomesSection />
        <TrustSignalsSection />
        <WhyCalibrateSection />
        <ClientsSection />
        <DemoSection />
        <FAQSection />
        <AuditSection />
      </main>
      <SiteFooter />
    </ScoreCheckProvider>
  );
}
