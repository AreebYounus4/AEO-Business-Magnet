import type { ScoreBand } from "@/domain/enums";

const bandColors: Record<ScoreBand, string> = {
  Low: "text-red",
  Weak: "text-orange-500",
  Moderate: "text-yellow-600",
  Strong: "text-green-600",
  Excellent: "text-emerald-700",
};

interface ScoreSummaryProps {
  overallScore: number;
  scoreBand: ScoreBand;
  brandName: string;
  websiteUrl: string;
  generatedAt: string;
}

export function ScoreSummary({
  overallScore,
  scoreBand,
  brandName,
  websiteUrl,
  generatedAt,
}: ScoreSummaryProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-8 shadow-lg">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-text-muted">
            AI Visibility Report
          </p>
          <h1 className="text-2xl font-extrabold text-navy md:text-3xl">
            {brandName}
          </h1>
          <p className="text-sm text-text-muted">{websiteUrl}</p>
          <p className="mt-2 text-xs text-text-muted">
            Generated {new Date(generatedAt).toLocaleString()}
          </p>
        </div>
        <div className="text-center md:text-right">
          <div className={`text-5xl font-extrabold ${bandColors[scoreBand]}`}>
            {overallScore}
            <span className="text-lg font-semibold text-text-muted">/100</span>
          </div>
          <div className={`text-sm font-bold uppercase tracking-wider ${bandColors[scoreBand]}`}>
            {scoreBand}
          </div>
        </div>
      </div>
    </div>
  );
}
