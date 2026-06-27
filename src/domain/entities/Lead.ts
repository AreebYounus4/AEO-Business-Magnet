import type { LeadStatus, ScoreBand } from "../enums";
import type { AIEngine } from "../enums";

export interface Lead {
  id: string;
  scanId: string;
  fullName: string;
  workEmail: string;
  phoneNumber: string;
  websiteUrl: string;
  brandName: string;
  overallScore?: number;
  scoreBand?: ScoreBand;
  enabledEngines: AIEngine[];
  reportUrl: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateLeadScoreInput {
  leadId: string;
  brandName: string;
  overallScore: number;
  scoreBand: ScoreBand;
  enabledEngines: AIEngine[];
  reportUrl: string;
  status: LeadStatus;
}
