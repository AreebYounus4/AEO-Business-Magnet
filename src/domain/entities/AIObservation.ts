import type { AIEngine, Sentiment } from "../enums";

export interface AIObservation {
  id: string;
  scanId: string;
  promptId: string;
  platform: AIEngine;
  prompt: string;
  brandMentioned: boolean;
  brandRecommended: boolean;
  citationFound: boolean;
  competitorsMentioned: string[];
  sentiment: Sentiment;
  entityAccuracyScore: number;
  scoreContribution: number;
  responseSummary: string;
  createdAt: string;
}
