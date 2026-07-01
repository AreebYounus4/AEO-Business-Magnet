import { QUERY_CARDS } from "@/components/landing/content";
import { PlatformLogo } from "@/components/landing/PlatformLogo";

export function ProblemSection() {
  return (
    <section className="problem-sec sec" id="problem" aria-labelledby="problem-h">
      <div className="wrap">
        <div className="problem-intro">
          <div className="eyebrow eyebrow-white" style={{ justifyContent: "center" }}>
            <span className="eyebrow-dot" aria-hidden="true" />
            The New Reality
          </div>
          <h2 className="d-lg t-white" id="problem-h" style={{ marginBottom: "1.1rem" }}>
            Ranking #1 Doesn&apos;t Mean
            <br />
            You&apos;re Recommended.
          </h2>
          <p className="b-lg" style={{ color: "rgba(255,255,255,.62)" }}>
            Traditional SEO was built for rankings. AI search is built for answers.
            Today, buyers ask AI, and AI doesn&apos;t simply show websites. It
            recommends brands.
          </p>
        </div>

        <div className="query-wall" role="list" aria-label="AI search query examples">
          {QUERY_CARDS.map((card) => (
            <div key={card.query} className="query-card" role="listitem">
              <div className="qc-platform">
                <PlatformLogo platform={card.platform} size={14} />
                <span className="qc-name">{card.platformLabel}</span>
              </div>
              <div className="qc-q">&ldquo;{card.query}&rdquo;</div>
              <div
                className={`qc-note ${card.visible ? "visible" : "invisible"}`}
              >
                {card.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
