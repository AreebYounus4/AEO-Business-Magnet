import { OUTCOMES } from "@/components/landing/content";

export function OutcomesSection() {
  return (
    <section className="sec" aria-labelledby="outcomes-h" style={{ background: "#fff" }}>
      <div className="wrap">
        <div className="section-center-sm">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="eyebrow-dot" aria-hidden="true" />
            What Success Looks Like
          </div>
          <h2 className="d-md" id="outcomes-h" style={{ marginBottom: "0.9rem" }}>
            Visibility That Drives
            <br />
            Business Outcomes.
          </h2>
          <p className="b-md t-muted">
            Because visibility only matters when it drives business results.
          </p>
        </div>

        <div className="outcomes-grid" role="list" aria-label="Business outcomes">
          {OUTCOMES.map((outcome) => (
            <div key={outcome.title} className="oc-card" role="listitem">
              <div className="oc-icon" aria-hidden="true">
                {outcome.icon}
              </div>
              <h3 className="oc-title">{outcome.title}</h3>
              <p className="oc-desc">{outcome.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
