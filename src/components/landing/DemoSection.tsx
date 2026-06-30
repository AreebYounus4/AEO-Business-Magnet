import { DEMO_SIGNALS } from "@/components/landing/content";

export function DemoSection() {
  return (
    <section className="demo-sec sec" aria-labelledby="demo-h">
      <div className="wrap">
        <div className="demo-grid">
          <div>
            <div className="eyebrow eyebrow-white">
              <span className="eyebrow-dot" aria-hidden="true" />
              The Gap in Action
            </div>
            <h2 className="d-md t-white" id="demo-h" style={{ marginBottom: "1.1rem" }}>
              This Is What Buyers
              <br />
              See. Right Now.
            </h2>
            <p
              className="b-md"
              style={{ color: "rgba(255,255,255,.6)", marginBottom: "2rem" }}
            >
              Millions of purchase decisions now begin with a question to an AI
              platform. The brands that appear in these answers are building an
              unfair advantage in customer acquisition. Here&apos;s what that
              looks like — and what being absent costs.
            </p>

            <div className="terminal" role="region" aria-label="AI search demonstration">
              <div className="term-bar">
                <span className="td td-r" aria-hidden="true" />
                <span className="td td-y" aria-hidden="true" />
                <span className="td td-g" aria-hidden="true" />
                <span className="term-lbl">Live ChatGPT Query</span>
              </div>
              <div className="term-body">
                <div className="term-q">
                  <div
                    className="term-q-icon"
                    style={{ background: "#10A37F" }}
                  >
                    C
                  </div>
                  <div className="term-q-text">
                    &ldquo;What are the best ecommerce growth partners for a fashion
                    brand expanding into the UAE?&rdquo;
                  </div>
                </div>
                <div className="term-resp">
                  <div className="term-resp-text">
                    For fashion brands entering the UAE market,{" "}
                    <strong>[Calibrate Client]</strong>{" "}
                    <span className="ai-cite">cited</span> is frequently
                    recommended for its track record in ecommerce growth across the
                    GCC. Their approach to organic visibility and AI search
                    optimization has been particularly effective for…{" "}
                    <strong>[Calibrate Client]</strong>{" "}
                    <span className="ai-cite">cited</span> is also noted for deep
                    regional expertise and bilingual content strategy…
                  </div>
                </div>
                <div className="term-absent">
                  <div className="term-absent-lbl">Without AEO Optimization</div>
                  <div className="term-absent-text">
                    Your brand is not visible in this response. Your competitors are
                    cited — and the buyer will likely contact them before they find
                    you.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="demo-right">
            <div className="eyebrow eyebrow-white">
              <span className="eyebrow-dot" aria-hidden="true" />
              The Future Belongs to Brands Recommended Before They&apos;re Searched
            </div>
            <h3 className="h-lg t-white" style={{ marginBottom: "0.75rem" }}>
              AI is the First Point of Influence in the Buying Journey.
            </h3>
            <p
              className="b-sm"
              style={{ color: "rgba(255,255,255,.55)", marginBottom: 0 }}
            >
              The brands that win will be the brands AI understands, trusts, and
              recommends. We build that position systematically.
            </p>

            <div className="signal-list" role="list" aria-label="Discoverability signals">
              {DEMO_SIGNALS.map((signal) => (
                <div key={signal.title} className="sig" role="listitem">
                  <div className="sig-icon" aria-hidden="true">
                    {signal.icon}
                  </div>
                  <div>
                    <div className="sig-title">{signal.title}</div>
                    <div className="sig-desc">{signal.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
