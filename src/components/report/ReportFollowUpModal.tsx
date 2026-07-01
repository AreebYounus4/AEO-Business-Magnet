"use client";

import { useEffect, useState } from "react";

interface ReportFollowUpModalProps {
  scanId: string;
  brandName: string;
}

const STORAGE_KEY = "cc-report-followup-dismissed";

export function ReportFollowUpModal({
  scanId,
  brandName,
}: ReportFollowUpModalProps) {
  const [open, setOpen] = useState(false);

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function close() {
    sessionStorage.setItem(`${STORAGE_KEY}:${scanId}`, "1");
    setOpen(false);
  }

  return (
    <div
      className="pop-overlay active"
      role="dialog"
      aria-modal="true"
      aria-label="Discovery call follow-up"
    >
      <div className="pop-modal report-followup-modal">
        <button
          type="button"
          className="pop-close"
          onClick={close}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="report-followup-body">
          <div className="report-followup-icon">✅</div>
          <h2 className="report-followup-title">
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
