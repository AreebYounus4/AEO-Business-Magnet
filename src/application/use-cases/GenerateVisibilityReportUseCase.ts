import type { BrandProfile } from "@/domain/entities/BrandProfile";
import type { AIObservation } from "@/domain/entities/AIObservation";
import type { VisibilityReport } from "@/domain/entities/VisibilityReport";
import type { PlatformScore } from "@/domain/entities/PlatformScore";
import {
  calculateOverallScore,
  calculatePlatformScores,
  scoreToBand,
} from "@/domain/services/ScoreCalculator";
import { createReportId } from "@/lib/utils/id";
import { nowIso } from "@/lib/utils/date";
import { OpenAIBrandExtractor } from "@/infrastructure/ai/OpenAIProvider";

export class GenerateVisibilityReportUseCase {
  constructor(private readonly openAi = new OpenAIBrandExtractor()) {}

  async execute(input: {
    scanId: string;
    leadId: string;
    brandProfile: BrandProfile;
    observations: AIObservation[];
    enabledEngines: string[];
    partialResults?: boolean;
  }): Promise<VisibilityReport> {
    const platformScores = calculatePlatformScores(input.observations);
    const overallScore = calculateOverallScore(platformScores);

    let keyFindings: string[];
    let recommendations: string[];

    try {
      const generated = await this.openAi.generateFindings({
        brandProfile: input.brandProfile,
        observations: input.observations.map((o) => ({
          platform: o.platform,
          brandMentioned: o.brandMentioned,
          brandRecommended: o.brandRecommended,
          citationFound: o.citationFound,
        })),
        platformScores,
      });
      keyFindings = generated.keyFindings;
      recommendations = generated.recommendations;
    } catch {
      keyFindings = buildDefaultFindings(input.observations, platformScores);
      recommendations = buildDefaultRecommendations(input.brandProfile);
    }

    return {
      id: createReportId(),
      scanId: input.scanId,
      leadId: input.leadId,
      brandName: input.brandProfile.brandName,
      websiteUrl: input.brandProfile.websiteUrl,
      overallScore,
      scoreBand: scoreToBand(overallScore),
      platformScores,
      keyFindings,
      recommendations,
      enabledEngines: input.enabledEngines,
      partialResults: input.partialResults,
      generatedAt: nowIso(),
    };
  }
}

function buildDefaultFindings(
  observations: AIObservation[],
  platformScores: PlatformScore[],
): string[] {
  const mentioned = observations.filter((o) => o.brandMentioned).length;
  const total = observations.length;
  return [
    `The brand appeared in ${mentioned} of ${total} AI visibility checks.`,
    platformScores.some((p) => p.score < 40)
      ? "Several AI platforms show weak category visibility for this brand."
      : "AI platforms show moderate awareness of this brand.",
    "Competitors may appear more often in commercial-intent prompts.",
    "The website may need clearer entity and category signals.",
  ].slice(0, 4);
}

function buildDefaultRecommendations(profile: BrandProfile): string[] {
  return [
    `Create stronger ${profile.industry || "category"} landing pages with clear entity signals.`,
    "Add structured FAQ content that answers buyer questions directly.",
    "Build third-party authority signals and citations.",
    "Ensure brand name, services, and market are consistently described across the site.",
  ];
}
