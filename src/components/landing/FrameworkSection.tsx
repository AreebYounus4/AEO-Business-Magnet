const steps = [
  {
    num: "01",
    title: "Submit your website",
    desc: "Enter your details and website URL to start a live AI visibility scan.",
  },
  {
    num: "02",
    title: "We analyse your brand signals",
    desc: "We crawl your site and test how AI platforms understand and recommend you.",
  },
  {
    num: "03",
    title: "Get your visibility score",
    desc: "See platform-level scores, key findings, and recommended actions.",
  },
];

export function FrameworkSection() {
  return (
    <section id="framework" className="sec">
      <div className="wrap">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          How It Works
        </div>
        <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          From invisible to recommended in three steps.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-red text-xs font-extrabold text-red">
                {step.num}
              </div>
              <h3 className="mb-2 text-lg font-bold text-navy">{step.title}</h3>
              <p className="text-sm text-text-mid">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
