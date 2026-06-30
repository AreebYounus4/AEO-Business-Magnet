import { OpenScoreCheckButton } from "@/components/forms/ScoreCheckContext";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="wrap">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Answer Engine Optimization
            </div>
            <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-navy md:text-6xl">
              Your next customer may never visit your website.{" "}
              <em className="not-italic text-red">Will AI recommend you?</em>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-text-mid">
              Calibrate Commerce helps brands get found, trusted and chosen inside
              ChatGPT, Gemini, Perplexity and Google AI — through Answer Engine
              Optimization (AEO).
            </p>
            <div className="flex flex-wrap gap-3">
              <OpenScoreCheckButton>
                Check Your AI Website Score — Free
              </OpenScoreCheckButton>
              <a
                href="#framework"
                className="inline-flex items-center rounded-lg border-2 border-border px-6 py-3 font-bold text-navy hover:border-navy"
              >
                How AEO Works
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-off p-6 shadow-lg">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">
              AI platforms buyers use today
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["ChatGPT", "Gemini", "Perplexity", "Google AI"].map((platform) => (
                <div
                  key={platform}
                  className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-bold text-navy"
                >
                  {platform}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-text-muted">
              Get a free visibility score across enabled AI engines in under 60 seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
