"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is AI Search Optimization (AEO)?",
    a: "AEO is the practice of optimizing your brand's content, authority signals, and entity presence so it appears in AI-generated recommendations from ChatGPT, Gemini, Perplexity, and Google AI.",
  },
  {
    q: "Why doesn't ranking #1 on Google mean I'm recommended by AI?",
    a: "AI platforms synthesize information and recommend brands based on entity authority, content comprehensiveness, trusted citations, and credibility signals — not just rankings.",
  },
  {
    q: "How do you measure AI search visibility?",
    a: "We run category-aware prompts across enabled AI engines and measure brand mentions, recommendations, citations, sentiment, and entity accuracy.",
  },
  {
    q: "What is an AI Visibility Audit?",
    a: "A diagnostic assessment of how your brand appears across AI platforms, identifying gaps in entity signals, content, authority citations, and structured data.",
  },
  {
    q: "What is the difference between AEO and traditional SEO?",
    a: "Traditional SEO optimizes for ranked links. AEO optimizes for being cited and recommended in AI-generated answers.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="sec bg-off">
      <div className="wrap max-w-3xl">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          FAQ
        </div>
        <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          Answers to the questions that matter.
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-border bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-navy"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  {faq.q}
                  <span className="text-red">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen ? (
                  <div className="border-t border-border px-5 py-4 text-sm text-text-mid">
                    {faq.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
