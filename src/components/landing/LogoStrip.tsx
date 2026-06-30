import { LOGO_STRIP } from "@/components/landing/content";

export function LogoStrip() {
  return (
    <div className="logo-strip" role="region" aria-label="Trusted by">
      <div className="wrap">
        <p className="ls-label">
          Trusted by growth brands across the GCC and beyond
        </p>
        <div className="ls-row">
          {LOGO_STRIP.map((name) => (
            <div key={name} className="ls-item">
              <div className="ls-text">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
