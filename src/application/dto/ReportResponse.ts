import type { PlatformScore } from "@/domain/entities/PlatformScore";
import type { ScoreBand } from "@/domain/enums";
import type { AIEngine } from "@/domain/enums";

export interface ReportResponse {
  scanId: string;
  brandName: string;
  websiteUrl: string;
  overallScore: number;
  scoreBand: ScoreBand;
  enabledEngines: AIEngine[];
  platformScores: PlatformScore[];
  keyFindings: string[];
  recommendations: string[];
  partialResults?: boolean;
  generatedAt: string;
}
