import type { PlatformScore } from "@/domain/entities/PlatformScore";

const engineLabels: Record<string, { label: string; color: string }> = {
  openai: { label: "ChatGPT", color: "#10A37F" },
  gemini: { label: "Gemini", color: "#4285F4" },
  perplexity: { label: "Perplexity", color: "#1B2B3B" },
};

function scoreColor(score: number): string {
  if (score <= 30) return "bg-red";
  if (score <= 50) return "bg-orange-500";
  if (score <= 70) return "bg-yellow-500";
  if (score <= 85) return "bg-green-500";
  return "bg-emerald-600";
}

export function PlatformScoreCard({ platformScores }: { platformScores: PlatformScore[] }) {
  if (platformScores.length === 0) {
    return (
      <p className="text-sm text-text-muted">No platform scores available.</p>
    );
  }

  return (
    <div className="space-y-4">
      {platformScores.map((item) => {
        const meta = engineLabels[item.platform] ?? {
          label: item.platform,
          color: "#071932",
        };
        return (
          <div
            key={item.platform}
            className="rounded-xl border border-border bg-white p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{ background: meta.color }}
                >
                  {meta.label[0]}
                </span>
                <div>
                  <div className="font-bold text-navy">{meta.label}</div>
                  <div className="text-xs text-text-muted">{item.reason}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-navy">{item.score}</div>
                <div className="text-xs text-text-muted">/100</div>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-off">
              <div
                className={`h-full rounded-full ${scoreColor(item.score)}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
