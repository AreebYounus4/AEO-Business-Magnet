import type { ScoreBand } from "../enums";
import type { PlatformScore } from "./PlatformScore";

export interface VisibilityReport {
  id: string;
  scanId: string;
  leadId: string;
  brandName: string;
  websiteUrl: string;
  overallScore: number;
  scoreBand: ScoreBand;
  platformScores: PlatformScore[];
  keyFindings: string[];
  recommendations: string[];
  enabledEngines: string[];
  partialResults?: boolean;
  generatedAt: string;
}
