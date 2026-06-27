import type { AIObservation } from "../entities/AIObservation";
import type { PlatformScore } from "../entities/PlatformScore";
import type { AIEngine, Sentiment } from "../enums";
import { clampScore, scoreToBand } from "../value-objects/Score";

const SENTIMENT_POINTS: Record<Sentiment, number> = {
  positive: 10,
  neutral: 10,
  mixed: 5,
  negative: 0,
};

export function calculateObservationScore(input: {
  brandMentioned: boolean;
  brandRecommended: boolean;
  citationFound: boolean;
  entityAccuracyScore: number;
  sentiment: Sentiment;
  competitorsMentioned: string[];
}): number {
  let score = 0;

  if (input.brandMentioned) score += 25;
  if (input.brandRecommended) score += 30;
  if (input.citationFound) score += 20;
  score += (input.entityAccuracyScore / 100) * 15;
  score += SENTIMENT_POINTS[input.sentiment];

  if (
    input.competitorsMentioned.length > 0 &&
    !input.brandMentioned
  ) {
    score = Math.max(0, score - 15);
  }

  return clampScore(score);
}

export function calculatePlatformScores(
  observations: AIObservation[],
): PlatformScore[] {
  const byPlatform = new Map<AIEngine, AIObservation[]>();

  for (const observation of observations) {
    const list = byPlatform.get(observation.platform) ?? [];
    list.push(observation);
    byPlatform.set(observation.platform, list);
  }

  return Array.from(byPlatform.entries()).map(([platform, platformObs]) => {
    const average =
      platformObs.reduce((sum, obs) => sum + obs.scoreContribution, 0) /
      platformObs.length;

    const mentioned = platformObs.filter((o) => o.brandMentioned).length;
    const recommended = platformObs.filter((o) => o.brandRecommended).length;
    const cited = platformObs.filter((o) => o.citationFound).length;

    let reason = "Brand has limited visibility in AI responses.";
    if (recommended > platformObs.length / 2) {
      reason = "Brand is frequently recommended in category queries.";
    } else if (mentioned > platformObs.length / 2) {
      reason = "Brand is understood but rarely recommended.";
    } else if (cited > 0) {
      reason = "Brand website is cited but mention rate is low.";
    }

    return {
      platform,
      score: clampScore(average),
      reason,
    };
  });
}

export function calculateOverallScore(platformScores: PlatformScore[]): number {
  if (platformScores.length === 0) return 0;
  const total = platformScores.reduce((sum, p) => sum + p.score, 0);
  return clampScore(total / platformScores.length);
}

export { scoreToBand };
