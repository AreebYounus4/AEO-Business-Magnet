export function ProblemSection() {
  const points = [
    "Buyers now ask AI for recommendations before they ever click a website.",
    "Ranking #1 on Google does not guarantee AI will recommend your brand.",
    "AI platforms synthesize answers from entity signals, authority, and citations.",
    "Most brands are invisible in AI-generated buying journeys.",
  ];

  return (
    <section id="problem" className="sec bg-off">
      <div className="wrap">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          The Problem
        </div>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          Traditional SEO is not enough for AI search.
        </h2>
        <p className="mb-10 max-w-2xl text-lg text-text-mid">
          AI search is built for answers and recommendations — not blue links. If
          your brand lacks entity authority and category signals, you will not be
          recommended.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {points.map((point) => (
            <div
              key={point}
              className="rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <p className="font-semibold text-navy">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
