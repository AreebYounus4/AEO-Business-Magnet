import Image from "next/image";

export function HumanVisualBanner() {
  return (
    <div className="framework-banner reveal">
      <Image
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?fm=jpg&q=80&w=1200&auto=format&fit=crop"
        alt="Marketing professionals working on AI search strategy with laptops"
        fill
        className="framework-banner-img"
        sizes="(max-width: 1180px) 100vw, 1180px"
      />
      <div className="framework-banner-overlay" />
      <div className="framework-banner-copy">
        <div className="framework-banner-eyebrow">How We Work</div>
        <div className="framework-banner-title">
          A proven process that builds AI visibility you can measure and scale.
        </div>
      </div>
      <div className="framework-banner-stats">
        <div className="framework-stat">
          <div className="framework-stat-num">5</div>
          <div className="framework-stat-label">Step Framework</div>
        </div>
        <div className="framework-stat">
          <div className="framework-stat-num t-red">5</div>
          <div className="framework-stat-label">AI Platforms</div>
        </div>
      </div>
    </div>
  );
}
