import { FRAMEWORK_STEPS } from "@/components/landing/content";
import { HumanVisualBanner } from "@/components/landing/HumanVisualBanner";

export function FrameworkSection() {
  return (
    <section
      className="aeo-framework-sec sec"
      id="framework"
      aria-labelledby="framework-h"
    >
      <div className="wrap">
        <div className="section-center-md">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="eyebrow-dot" aria-hidden="true" />
            Our AEO Framework
          </div>
          <h2 className="d-md" id="framework-h" style={{ marginBottom: "1rem" }}>
            A Systematic Approach to
            <br />
            AI Search Visibility.
          </h2>
          <p className="b-md t-muted">
            Five interconnected components that build your brand&apos;s presence
            across every AI platform where buying decisions are made.
          </p>
        </div>

        <HumanVisualBanner />

        <div
          className="framework-grid"
          role="list"
          aria-label="AEO framework components"
        >
          {FRAMEWORK_STEPS.map((step) => (
            <article key={step.title} className="fw-card" role="listitem">
              <div className="fw-icon" aria-hidden="true">
                {step.icon}
              </div>
              <div className="fw-num">{step.num}</div>
              <h3 className="fw-title">{step.title}</h3>
              <p className="fw-desc">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
