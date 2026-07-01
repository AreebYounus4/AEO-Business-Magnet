"use client";

import { useEffect, useId, useRef } from "react";
import { LeadCaptureForm } from "./LeadCaptureForm";

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function LeadCaptureModal({ open, onClose }: LeadCaptureModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      : [];
    focusables[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="score-modal-overlay fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy/72 backdrop-blur-[6px]"
        onClick={onClose}
        aria-label="Close score checker"
      />
      <div
        ref={panelRef}
        className="score-modal-panel relative z-10 flex max-h-[min(90dvh,900px)] w-full max-w-[860px] flex-col overflow-hidden rounded-[20px] shadow-[0_32px_80px_rgba(7,25,50,0.28)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[14px] top-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-off text-lg text-text-muted transition hover:bg-border hover:text-navy sm:right-[18px] sm:top-4"
          aria-label="Close"
        >
          ×
        </button>
        <LeadCaptureForm variant="modal" onClose={onClose} titleId={titleId} />
      </div>
    </div>
  );
}
