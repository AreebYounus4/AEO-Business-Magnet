"use client";

import { LeadCaptureForm } from "./LeadCaptureForm";

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
}

export function LeadCaptureModal({ open, onClose }: LeadCaptureModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="AI Website Score Checker"
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy/72 backdrop-blur-[6px]"
        onClick={onClose}
        aria-label="Close score checker"
      />
      <div className="relative z-10 flex max-h-[90vh] w-[min(82vw,860px)] flex-col overflow-hidden rounded-[20px] shadow-[0_32px_80px_rgba(7,25,50,0.28)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[18px] top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-off text-lg text-text-muted transition hover:bg-border hover:text-navy"
          aria-label="Close"
        >
          ×
        </button>
        <LeadCaptureForm variant="modal" onClose={onClose} />
      </div>
    </div>
  );
}
