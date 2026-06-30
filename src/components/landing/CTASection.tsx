import { OpenScoreCheckButton } from "@/components/forms/ScoreCheckContext";

export function CTASection() {
  return (
    <section id="score" className="sec bg-navy text-white">
      <div className="wrap max-w-3xl text-center">
        <div className="eyebrow mx-auto border-red/30 bg-red/15 text-red">
          <span className="eyebrow-dot" />
          Free AI Score Check
        </div>
        <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
          Check your website&apos;s AI visibility score.
        </h2>
        <p className="mb-8 text-white/65">
          See how your brand appears across enabled AI engines. Get your score,
          platform breakdown, key findings, and recommended actions — in under
          a minute.
        </p>
        <ul className="mb-10 space-y-3 text-sm text-white/80">
          <li>✓ Live scan across enabled AI engines</li>
          <li>✓ Platform-level visibility scores</li>
          <li>✓ Actionable findings and recommendations</li>
          <li>✓ Shareable report page</li>
        </ul>
        <OpenScoreCheckButton className="btn-red mx-auto">
          Check Your AI Website Score — Free
        </OpenScoreCheckButton>
      </div>
    </section>
  );
}
