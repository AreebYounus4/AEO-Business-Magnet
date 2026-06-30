import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Calibrate Commerce</div>
            <div className="footer-desc">
              AI Search Optimization (AEO) and Discoverability services helping
              brands get found, trusted, and chosen across ChatGPT, Gemini, Claude,
              Perplexity, and Google AI.
            </div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,.28)" }}>
              Dubai, UAE · Global
            </div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <nav className="footer-links" aria-label="Services">
              <a href="#framework">AI Visibility Audit</a>
              <a href="#framework">AI Readiness Optimization</a>
              <a href="#framework">Authority &amp; Citation Building</a>
              <a href="#framework">Answer Asset Creation</a>
              <a href="#framework">Visibility Monitoring</a>
            </nav>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <nav className="footer-links" aria-label="Company">
              <Link href="/about">About Calibrate</Link>
              <Link href="/case-studies">Case Studies</Link>
              <Link href="/insights">Insights</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          <div>
            <div className="footer-col-title">Resources</div>
            <nav className="footer-links" aria-label="Resources">
              <Link href="/insights/aeo-guide">AEO Guide</Link>
              <Link href="/insights/ai-search">AI Search Report</Link>
              <Link href="/insights/entity-optimization">Entity Optimization</Link>
              <Link href="/faq">FAQ</Link>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2025 Calibrate Commerce. All rights reserved.</div>
          <div className="footer-bottom-right" role="navigation" aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
