import Image from "next/image";
import type { PlatformScore } from "@/domain/entities/PlatformScore";
import type { PlatformId } from "@/components/landing/logos";
import { ENGINE_TO_PLATFORM, PLATFORM_META } from "@/components/landing/logos";

interface PlatformScoreCardProps {
  platformScores: PlatformScore[];
}

function scoreColor(score: number): string {
  if (score <= 30) return "bg-red";
  if (score <= 50) return "bg-orange-500";
  if (score <= 70) return "bg-yellow-500";
  if (score <= 85) return "bg-green-500";
  return "bg-emerald-600";
}

function getPlatformId(engine: string): PlatformId | null {
  return ENGINE_TO_PLATFORM[engine] ?? null;
}

export function PlatformScoreCard({ platformScores }: PlatformScoreCardProps) {
  if (platformScores.length === 0) {
    return (
      <p className="text-sm text-text-muted">No platform scores available.</p>
    );
  }

  return (
    <div className="space-y-4">
      {platformScores.map((item) => {
        const platformId = getPlatformId(item.platform);
        const meta = platformId
          ? PLATFORM_META[platformId]
          : { label: item.platform, bg: "#071932", logo: "" };

        return (
          <div
            key={item.platform}
            className="score-row rounded-xl border border-border bg-white p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {platformId ? (
                  <span
                    className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg"
                    style={{ background: meta.bg }}
                  >
                    <Image
                      src={meta.logo}
                      alt=""
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                  </span>
                ) : (
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ background: meta.bg }}
                  >
                    {meta.label[0]}
                  </span>
                )}
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
