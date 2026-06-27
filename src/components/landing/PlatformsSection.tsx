export function PlatformsSection() {
  const platforms = [
    { name: "ChatGPT", color: "#10A37F" },
    { name: "Gemini", color: "#4285F4" },
    { name: "Perplexity", color: "#1B2B3B" },
    { name: "Google AI", color: "#4285F4" },
  ];

  return (
    <section className="sec bg-navy text-white">
      <div className="wrap text-center">
        <div className="eyebrow mx-auto border-red/30 bg-red/15 text-red">
          <span className="eyebrow-dot" />
          AI Platforms
        </div>
        <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
          Visibility across the AI platforms that matter.
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-white/70">
          Your scan tests how enabled AI engines understand, cite, and recommend
          your brand in real buyer-style queries.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-white"
                style={{ background: p.color }}
              >
                {p.name[0]}
              </span>
              <span className="font-semibold">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
