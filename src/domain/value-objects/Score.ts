import type { ScoreBand } from "../enums";

export function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function scoreToBand(score: number): ScoreBand {
  if (score <= 30) return "Low";
  if (score <= 50) return "Weak";
  if (score <= 70) return "Moderate";
  if (score <= 85) return "Strong";
  return "Excellent";
}
