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
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close score checker"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-navy shadow hover:bg-white"
          aria-label="Close"
        >
          ×
        </button>
        <LeadCaptureForm variant="modal" />
      </div>
    </div>
  );
}
