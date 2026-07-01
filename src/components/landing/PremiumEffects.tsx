"use client";

import { useEffect, type ReactNode } from "react";

const REVEAL_SELECTOR =
  ".win-card,.fw-card,.oc-card,.why-card,.tg-card,.sig,.faq-item,.query-card,.lg-cell,.big-q-box,.framework-banner,.why-human-visual";

function parseStatText(text: string) {
  const match = text.trim().match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3],
  };
}

export function PremiumEffects({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    document.querySelectorAll(REVEAL_SELECTOR).forEach((el, index) => {
      if (reduced) {
        el.classList.add("reveal", "visible");
        return;
      }
      el.classList.add("reveal", `d${(index % 5) + 1}`);
      revealObs.observe(el);
    });

    if (!reduced) {
      const pulseTimer = window.setTimeout(() => {
        document.querySelectorAll(".btn-red").forEach((btn, index) => {
          if (index === 0) btn.classList.add("pulse-anim");
        });
      }, 2000);

      const animateCounters = () => {
        document.querySelectorAll(".tstat-n,.tg-num").forEach((el) => {
          if (!(el instanceof HTMLElement) || el.dataset.animated) return;
          const text = el.textContent ?? "";
          const parsed = parseStatText(text);
          if (!parsed || !parsed.num) return;

          el.dataset.animated = "1";
          const { prefix, num, suffix } = parsed;
          const duration = 900;
          let startTime: number | null = null;

          const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased =
              progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;
            const current = Math.round(eased * num * 10) / 10;
            const display = Number.isInteger(num)
              ? Math.round(current)
              : current;
            el.textContent = `${prefix}${display}${suffix}`;
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        });
      };

      const counterObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounters();
              counterObs.disconnect();
            }
          });
        },
        { threshold: 0.35 },
      );

      document
        .querySelectorAll(".trust-grid,.hero-trust")
        .forEach((el) => counterObs.observe(el));

      return () => {
        clearTimeout(pulseTimer);
        revealObs.disconnect();
        counterObs.disconnect();
      };
    }

    return () => revealObs.disconnect();
  }, []);

  return children;
}
