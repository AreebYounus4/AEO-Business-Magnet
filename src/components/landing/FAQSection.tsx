"use client";

import { useState } from "react";
import {
  FAQ_ITEMS,
  type FaqCategory,
} from "@/components/landing/content";

const CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: "all", label: "All Questions" },
  { id: "aeo", label: "AEO & AI Search" },
  { id: "process", label: "Process & Results" },
  { id: "markets", label: "Markets & Fit" },
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="faq-sec sec" id="faq" aria-labelledby="faq-h">
      <div className="wrap">
        <div style={{ maxWidth: "520px", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
          <div className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Frequently Asked Questions
          </div>
          <h2 className="d-md" id="faq-h">
            Answers to the Questions That Matter.
          </h2>
        </div>

        <div className="faq-layout">
          <div className="faq-sidebar">
            <div
              className="faq-cats"
              role="tablist"
              aria-label="FAQ categories"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`faq-cat${activeCategory === cat.id ? " active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="faq-items" role="tabpanel">
            {filtered.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;
              return (
                <div key={faq.question} className="faq-item" data-cat={faq.category}>
                  <button
                    id={buttonId}
                    type="button"
                    className={`faq-q${isOpen ? " open" : ""}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    {faq.question}
                    <span className="faq-icon" aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div
                    id={panelId}
                    className={`faq-a${isOpen ? " open" : ""}`}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
