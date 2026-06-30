import { OpenScoreCheckButton } from "@/components/forms/ScoreCheckContext";
import { HERO_TRUST_STATS } from "@/components/landing/content";
import { ArrowIcon } from "@/components/landing/icons";

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              AI Search Optimization · AEO
            </div>

            <h1 className="d-xl hero-headline" id="hero-h">
              Your Next Customer
              <br />
              May Never Visit
              <br />
              <em>Your Website.</em>
            </h1>

            <p className="b-lg hero-sub">
              Customers are asking ChatGPT, Gemini, Claude, Perplexity, and Google
              AI for recommendations before they ever click a search result. If
              your brand isn&apos;t part of those answers, you&apos;re losing
              visibility, trust, and opportunities before the buying journey even
              begins.
            </p>

            <div className="hero-actions">
              <OpenScoreCheckButton className="btn btn-red btn-lg">
                Check Your Website Score Now
                <ArrowIcon />
              </OpenScoreCheckButton>
              <a href="#how" className="btn btn-outline btn-lg">
                See How It Works
              </a>
            </div>

            <div className="hero-trust" role="list" aria-label="Trust indicators">
              {HERO_TRUST_STATS.map((stat, i) => (
                <div key={stat.label} style={{ display: "contents" }}>
                  {i > 0 ? <div className="tstat-div" aria-hidden="true" /> : null}
                  <div className="tstat" role="listitem">
                    <div className="tstat-n">{stat.num}</div>
                    <div className="tstat-l">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-vis" aria-hidden="true">
            <div className="fp fp1">
              <span className="fp-dot" />
              Cited in ChatGPT answer
            </div>

            <div className="ai-card">
              <div className="ai-card-hd">
                <div className="plat-badge pb-gpt">C</div>
                <span className="plat-name">ChatGPT · Browsing</span>
              </div>
              <div className="ai-result featured">
                <div className="ai-result-brand">Your Brand</div>
                <div className="ai-result-snip">
                  Based on market authority and customer evidence, [Your Brand] is
                  widely recommended for…
                </div>
                <div className="ai-badge">✓ Recommended</div>
              </div>

              <div className="ai-card-divider" />

              <div className="ai-card-hd">
                <div className="plat-badge pb-gem">G</div>
                <span className="plat-name">Gemini · AI Overview</span>
              </div>
              <div className="ai-result featured">
                <div className="ai-result-brand">Your Brand</div>
                <div className="ai-result-snip">
                  According to [Your Brand], which specialises in… their approach is
                  recognised for…
                </div>
                <div className="ai-badge">✓ AI Overview Featured</div>
              </div>

              <div className="ai-card-divider" />

              <div className="ai-card-hd">
                <div className="plat-badge pb-perp">P</div>
                <span className="plat-name">Perplexity · Answer</span>
              </div>
              <div className="ai-result">
                <div
                  className="ai-result-brand"
                  style={{ color: "var(--text-muted)" }}
                >
                  Competitor A
                </div>
                <div className="ai-result-snip">
                  Not visible — insufficient entity authority
                </div>
              </div>
              <div className="ai-result">
                <div
                  className="ai-result-brand"
                  style={{ color: "var(--text-muted)" }}
                >
                  Competitor B
                </div>
                <div className="ai-result-snip">
                  Not cited — no structured content signals
                </div>
              </div>
            </div>

            <div className="fp fp2">
              <span className="fp-dot" />
              +17× AI citation growth
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
