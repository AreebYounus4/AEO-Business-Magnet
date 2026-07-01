import { LOGO_STRIP } from "@/components/landing/content";
import { ClientLogoImage } from "@/components/landing/ClientLogoImage";

export function LogoStrip() {
  return (
    <div className="logo-strip" role="region" aria-label="Trusted by">
      <div className="wrap">
        <p className="ls-label">
          Trusted by growth brands across the GCC and beyond
        </p>
        <div className="ls-row">
          {LOGO_STRIP.map((logo) => (
            <div key={logo.name} className="ls-item">
              <ClientLogoImage name={logo.name} src={logo.src} height={26} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
