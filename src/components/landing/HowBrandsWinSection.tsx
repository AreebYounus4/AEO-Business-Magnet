import { WIN_STEPS } from "@/components/landing/content";

export function HowBrandsWinSection() {
  return (
    <section className="sec" id="how" aria-labelledby="how-h" style={{ background: "#fff" }}>
      <div className="wrap">
        <div className="section-center">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="eyebrow-dot" aria-hidden="true" />
            How Brands Win in AI Search
          </div>
          <h2 className="d-md" id="how-h" style={{ marginBottom: "1rem" }}>
            AI Recommends Brands It Can
            <br />
            Find, Understand and Trust.
          </h2>
          <p className="b-md t-muted">
            Most brands are missing one or more of these signals. That&apos;s where
            we help.
          </p>
        </div>

        <div className="win-grid" role="list" aria-label="How brands win in AI search">
          {WIN_STEPS.map((step) => (
            <div key={step.num} className="win-card" role="listitem">
              <div className="win-step" aria-label={`Step ${step.num}`}>
                {step.num}
              </div>
              <div className="win-title">{step.title}</div>
              <div className="win-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
