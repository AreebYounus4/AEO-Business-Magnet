import Image from "next/image";
import { OpenScoreCheckButton } from "@/components/forms/ScoreCheckContext";
import { WHY_CARDS } from "@/components/landing/content";
import { ArrowIcon } from "@/components/landing/icons";

export function WhyCalibrateSection() {
  return (
    <section className="why-sec sec" id="why" aria-labelledby="why-h">
      <div className="wrap">
        <div className="why-grid">
          <div className="why-left">
            <div className="eyebrow eyebrow-white">
              <span className="eyebrow-dot" aria-hidden="true" />
              Why Calibrate Commerce
            </div>
            <h2 className="d-md t-white" id="why-h" style={{ marginBottom: "1.25rem" }}>
              We Optimize
              <br />
              Discoverability.
              <br />
              Not Just Websites.
            </h2>
            <p
              className="b-lg"
              style={{ color: "rgba(255,255,255,.62)", marginBottom: "1.5rem" }}
            >
              Most agencies optimize websites. There is a fundamental difference
              between being found and being chosen. Our Discoverability
              Intelligence framework helps brands become all four.
            </p>

            <div className="why-human-visual reveal">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?fm=jpg&q=80&w=800&auto=format&fit=crop"
                alt="Team collaborating on digital strategy around laptops"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="why-human-overlay" />
              <div className="why-human-caption">
                Senior strategists. Real results.
              </div>
            </div>

            <OpenScoreCheckButton className="btn btn-ghost btn-lg">
              Check Your Website Score Now
              <ArrowIcon />
            </OpenScoreCheckButton>
          </div>

          <div className="why-right">
            {WHY_CARDS.map((card) => (
              <div key={card.title} className="why-card">
                <div className="why-icon" aria-hidden="true">
                  {card.icon}
                </div>
                <div>
                  <div className="why-title">{card.title}</div>
                  <div className="why-desc">{card.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
