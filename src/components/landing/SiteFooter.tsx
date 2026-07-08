const EXTERNAL_LINK_PROPS = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

export function SiteFooter() {
  const year = new Date().getFullYear();

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
              <a href="https://www.calibratecommerce.com/about" {...EXTERNAL_LINK_PROPS}>
                About Calibrate
              </a>
              <a href="https://www.calibratecommerce.com/work" {...EXTERNAL_LINK_PROPS}>
                Case Studies
              </a>
              <a href="https://www.calibratecommerce.com/blog" {...EXTERNAL_LINK_PROPS}>
                Insights
              </a>
              <a href="https://www.calibratecommerce.com/contact" {...EXTERNAL_LINK_PROPS}>
                Contact
              </a>
            </nav>
          </div>
          <div>
            <div className="footer-col-title">Resources</div>
            <nav className="footer-links" aria-label="Resources">
              <a href="#faq">FAQ</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {year} Calibrate Commerce. All rights reserved.</div>
          <div className="footer-bottom-right" role="navigation" aria-label="Legal">
            <a
              href="https://www.calibratecommerce.com/privacy-policy"
              {...EXTERNAL_LINK_PROPS}
            >
              Privacy Policy
            </a>
            <a
              href="https://www.calibratecommerce.com/terms-conditions"
              {...EXTERNAL_LINK_PROPS}
            >
              Terms
            </a>
            <a
              href="https://www.calibratecommerce.com/terms-conditions"
              {...EXTERNAL_LINK_PROPS}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
