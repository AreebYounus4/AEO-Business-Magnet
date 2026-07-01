"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

interface ReportFollowUpModalProps {
  scanId: string;
  brandName: string;
}

const STORAGE_KEY = "cc-report-followup-dismissed";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ReportFollowUpModal({
  scanId,
  brandName,
}: ReportFollowUpModalProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    sessionStorage.setItem(`${STORAGE_KEY}:${scanId}`, "1");
    setOpen(false);
  }, [scanId]);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(`${STORAGE_KEY}:${scanId}`);
    if (!dismissed) {
      const timer = window.setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [scanId]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }

      if (e.key !== "Tab" || !modalRef.current) return;

      const focusables = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusables.length === 0) return;

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
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="pop-overlay active no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="pop-modal report-followup-modal" ref={modalRef}>
        <button
          ref={closeButtonRef}
          type="button"
          className="pop-close"
          onClick={close}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="report-followup-body">
          <div className="report-followup-icon">✅</div>
          <h2 id={titleId} className="report-followup-title">
            Your report is ready{brandName ? `, ${brandName}` : ""}.
          </h2>
          <p className="report-followup-lead">
            Our team will contact you shortly to walk you through your results.
          </p>

          <div className="report-followup-card report-followup-card-accent">
            <div className="report-followup-card-head">
              <span aria-hidden="true">📬</span>
              <span>Our team will be in touch shortly</span>
            </div>
            <p>
              A senior Calibrate strategist is reviewing your AI visibility
              report and will reach out within one business day.
            </p>
          </div>

          <div className="report-followup-card">
            <div className="report-followup-card-head">
              <span aria-hidden="true">📞</span>
              <span>Free 30-Minute Discovery Call</span>
              <span className="report-followup-badge">Included</span>
            </div>
            <p>
              We will walk you through your report in a focused 30-minute
              session, explain exactly what each score means for your brand,
              and give you a clear roadmap on how to improve your AI visibility
              across every platform.
            </p>
            <ul className="report-followup-list">
              <li>Platform-by-platform score breakdown</li>
              <li>Competitor citation analysis for your category</li>
              <li>Clear improvement roadmap you can act on immediately</li>
            </ul>
          </div>

          <div className="ps3-steps">
            <div className="ps3-step">
              <div className="ps3-step-num">1</div>
              <div className="ps3-step-text">
                We prepare your full diagnostic across all 5 AI platforms
              </div>
            </div>
            <div className="ps3-step">
              <div className="ps3-step-num">2</div>
              <div className="ps3-step-text">
                Our team contacts you within one business day to book your
                discovery call
              </div>
            </div>
            <div className="ps3-step">
              <div className="ps3-step-num">3</div>
              <div className="ps3-step-text">
                We walk you through your report and hand you a clear action plan
              </div>
            </div>
          </div>

          <button type="button" className="ps3-close-btn" onClick={close}>
            Close and Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
}
