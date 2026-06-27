import type { ScanStatus } from "../enums";

export interface Scan {
  id: string;
  leadId: string;
  websiteUrl: string;
  normalizedWebsiteUrl: string;
  brandName: string;
  industry: string;
  primaryMarket: string;
  status: ScanStatus;
  startedAt: string;
  completedAt?: string;
  errorMessage?: string;
}
