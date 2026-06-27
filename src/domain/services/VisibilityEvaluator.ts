import type { BrandProfile } from "../entities/BrandProfile";
import type { AIObservation } from "../entities/AIObservation";
import type { Sentiment } from "../enums";
import { containsIgnoreCase, truncate } from "@/lib/utils/text";
import { extractDomain } from "@/lib/utils/url";
import { createObservationId } from "@/lib/utils/id";
import { nowIso } from "@/lib/utils/date";
import { calculateObservationScore } from "./ScoreCalculator";
import type { AIEngine } from "../enums";

export interface EvaluationInput {
  engineName: AIEngine;
  prompt: string;
  promptId: string;
  scanId: string;
  rawText: string;
  brandProfile: BrandProfile;
  aiEvaluation?: {
    brandRecommended: boolean;
    competitorsMentioned: string[];
    sentiment: Sentiment;
    entityAccuracyScore: number;
  };
}

export function evaluateVisibilityResponse(
  input: EvaluationInput,
): AIObservation {
  const brand = input.brandProfile.brandName;
  const domain = extractDomain(input.brandProfile.websiteUrl);
  const text = input.rawText;

  const brandMentioned =
    containsIgnoreCase(text, brand) ||
    containsIgnoreCase(text, domain);

  const citationFound =
    containsIgnoreCase(text, domain) ||
    containsIgnoreCase(text, input.brandProfile.websiteUrl);

  const competitorsMentioned =
    input.aiEvaluation?.competitorsMentioned ??
    input.brandProfile.competitors.filter((c) =>
      containsIgnoreCase(text, c),
    );

  const brandRecommended =
    input.aiEvaluation?.brandRecommended ??
    (brandMentioned &&
      /recommend|best choice|top pick|leading|suggest/i.test(text));

  const sentiment: Sentiment =
    input.aiEvaluation?.sentiment ??
    inferSentiment(text, brandMentioned);

  const entityAccuracyScore =
    input.aiEvaluation?.entityAccuracyScore ??
    (brandMentioned ? 60 : 20);

  const scoreContribution = calculateObservationScore({
    brandMentioned,
    brandRecommended,
    citationFound,
    entityAccuracyScore,
    sentiment,
    competitorsMentioned,
  });

  return {
    id: createObservationId(),
    scanId: input.scanId,
    promptId: input.promptId,
    platform: input.engineName,
    prompt: input.prompt,
    brandMentioned,
    brandRecommended,
    citationFound,
    competitorsMentioned,
    sentiment,
    entityAccuracyScore,
    scoreContribution,
    responseSummary: truncate(text.replace(/\s+/g, " ").trim(), 500),
    createdAt: nowIso(),
  };
}

function inferSentiment(text: string, brandMentioned: boolean): Sentiment {
  if (!brandMentioned) return "neutral";
  const lower = text.toLowerCase();
  const negative = /avoid|poor|bad|unreliable|negative|issue|problem/.test(
    lower,
  );
  const positive = /recommend|excellent|trusted|leading|best|great/.test(
    lower,
  );
  if (negative && positive) return "mixed";
  if (negative) return "negative";
  if (positive) return "positive";
  return "neutral";
}
