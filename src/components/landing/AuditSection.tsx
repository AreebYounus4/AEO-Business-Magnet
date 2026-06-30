"use client";

import { useState } from "react";
import { AUDIT_PROMISES } from "@/components/landing/content";
import { ArrowIcon } from "@/components/landing/icons";

export function AuditSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="form-sec sec" id="audit" aria-labelledby="form-h">
      <div className="wrap">
        <div className="form-layout">
          <div>
            <div className="eyebrow eyebrow-white">
              <span className="eyebrow-dot" aria-hidden="true" />
              AI Visibility Audit
            </div>
            <h2 className="d-md t-white" id="form-h" style={{ marginBottom: "1.1rem" }}>
              Discover How Your Brand
              <br />
              Appears Across AI Platforms.
            </h2>
            <p
              className="b-lg"
              style={{ color: "rgba(255,255,255,.62)", marginBottom: 0 }}
            >
              Uncover the opportunities to increase visibility, trust, and demand.
              Our AI Visibility Audit gives you a clear picture of where you stand —
              and a strategic roadmap to close the gaps.
            </p>

            <div className="form-promise-list" role="list" aria-label="What's included">
              {AUDIT_PROMISES.map((promise) => (
                <div key={promise} className="fp-item" role="listitem">
                  <div className="fp-check" aria-hidden="true">
                    ✓
                  </div>
                  <span>{promise}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="form-card">
              {submitted ? (
                <>
                  <div className="form-title">Thank you — we&apos;ll be in touch.</div>
                  <p className="form-sub" style={{ marginBottom: 0 }}>
                    A senior Calibrate strategist will review your details and
                    respond within one business day.
                  </p>
                </>
              ) : (
                <>
                  <div className="form-title">Get Your AI Visibility Strategy Session</div>
                  <div className="form-sub">
                    Tell us about your brand and we&apos;ll be in touch within 24 hours.
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="AI Visibility Audit booking form"
                  >
                    <div className="form-row">
                      <div className="form-g">
                        <label className="form-lbl" htmlFor="f-name">
                          Your Name <span aria-label="required">*</span>
                        </label>
                        <input
                          className="form-input"
                          type="text"
                          id="f-name"
                          name="name"
                          placeholder="Full name"
                          required
                          autoComplete="name"
                        />
                      </div>
                      <div className="form-g">
                        <label className="form-lbl" htmlFor="f-co">
                          Company <span aria-label="required">*</span>
                        </label>
                        <input
                          className="form-input"
                          type="text"
                          id="f-co"
                          name="company"
                          placeholder="Company name"
                          required
                          autoComplete="organization"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-g">
                        <label className="form-lbl" htmlFor="f-email">
                          Work Email <span aria-label="required">*</span>
                        </label>
                        <input
                          className="form-input"
                          type="email"
                          id="f-email"
                          name="email"
                          placeholder="you@company.com"
                          required
                          autoComplete="email"
                        />
                      </div>
                      <div className="form-g">
                        <label className="form-lbl" htmlFor="f-web">
                          Website <span aria-label="required">*</span>
                        </label>
                        <input
                          className="form-input"
                          type="url"
                          id="f-web"
                          name="website"
                          placeholder="https://yoursite.com"
                          required
                          autoComplete="url"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-g" style={{ marginBottom: 0 }}>
                        <label className="form-lbl" htmlFor="f-rev">
                          Monthly Revenue Range
                        </label>
                        <select className="form-select" id="f-rev" name="revenue" defaultValue="">
                          <option value="">Select range</option>
                          <option>Under $100K/month</option>
                          <option>$100K – $500K/month</option>
                          <option>$500K – $2M/month</option>
                          <option>$2M – $10M/month</option>
                          <option>$10M+/month</option>
                        </select>
                      </div>
                      <div className="form-g" style={{ marginBottom: 0 }}>
                        <label className="form-lbl" htmlFor="f-mkt">
                          Primary Market
                        </label>
                        <select className="form-select" id="f-mkt" name="market" defaultValue="">
                          <option value="">Select market</option>
                          <option>UAE</option>
                          <option>Saudi Arabia</option>
                          <option>GCC (Multi-market)</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                          <option>Global</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-g" style={{ marginTop: "1.1rem" }}>
                      <label className="form-lbl" htmlFor="f-challenge">
                        What&apos;s your primary challenge?{" "}
                        <span aria-label="required">*</span>
                      </label>
                      <textarea
                        className="form-ta"
                        id="f-challenge"
                        name="challenge"
                        placeholder="e.g. We're not visible in ChatGPT or Gemini when buyers search for our category. We rank well on Google but AI platforms don't recommend us. We want to understand our AI search presence vs competitors."
                        required
                      />
                    </div>

                    <button type="submit" className="form-submit">
                      Book Your AI Visibility Audit
                      <ArrowIcon />
                    </button>
                  </form>
                  <p className="form-note">
                    Your details will only be used to respond to your audit request.
                    We do not share or sell your information.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
