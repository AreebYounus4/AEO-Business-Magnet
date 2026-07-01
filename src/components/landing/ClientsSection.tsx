import { CLIENT_LOGOS } from "@/components/landing/content";
import { ClientLogoImage } from "@/components/landing/ClientLogoImage";

export function ClientsSection() {
  return (
    <section className="client-sec sec-sm" id="clients" aria-labelledby="clients-h">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="eyebrow-dot" aria-hidden="true" />
            Our Clients
          </div>
          <h2 className="d-md" id="clients-h">
            Brands That Trust Calibrate
          </h2>
        </div>
        <div className="logo-grid" role="list" aria-label="Client logos">
          {CLIENT_LOGOS.map((logo) => (
            <div key={logo.name} className="lg-cell" role="listitem">
              <ClientLogoImage name={logo.name} src={logo.src} height={30} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
