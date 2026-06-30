import { TRUST_STATS } from "@/components/landing/content";

export function TrustSignalsSection() {
  return (
    <section className="trust-sec sec-sm" aria-labelledby="trust-h">
      <div className="wrap">
        <div className="section-center-trust">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="eyebrow-dot" aria-hidden="true" />
            Calibrate by the Numbers
          </div>
          <h2 className="d-md" id="trust-h" style={{ marginBottom: "0.75rem" }}>
            Built on Measurable Results.
          </h2>
        </div>
        <div className="trust-grid" role="list" aria-label="Calibrate statistics">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="tg-card" role="listitem">
              <div className="tg-num">{stat.num}</div>
              <div className="tg-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
