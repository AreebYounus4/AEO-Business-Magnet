import type { ScanRepository } from "@/application/ports/ScanRepository";
import type { Scan } from "@/domain/entities/Scan";
import type { VisibilityPrompt } from "@/domain/entities/VisibilityPrompt";
import type { AIObservation } from "@/domain/entities/AIObservation";
import { GoogleSheetsClient } from "./GoogleSheetsClient";

export class GoogleSheetsScanRepository implements ScanRepository {
  constructor(private readonly client: GoogleSheetsClient) {}

  async createScan(scan: Scan): Promise<void> {
    await this.client.appendRow("Scans", [
      scan.id,
      scan.leadId,
      scan.websiteUrl,
      scan.normalizedWebsiteUrl,
      scan.brandName,
      scan.industry,
      scan.primaryMarket,
      scan.status,
      scan.startedAt,
      scan.completedAt ?? "",
      scan.errorMessage ?? "",
    ]);
  }

  async updateScan(scan: Scan): Promise<void> {
    await this.client.updateRowByScanId("Scans", scan.id, 0, [
      scan.id,
      scan.leadId,
      scan.websiteUrl,
      scan.normalizedWebsiteUrl,
      scan.brandName,
      scan.industry,
      scan.primaryMarket,
      scan.status,
      scan.startedAt,
      scan.completedAt ?? "",
      scan.errorMessage ?? "",
    ]);
  }

  async savePrompts(prompts: VisibilityPrompt[]): Promise<void> {
    for (const prompt of prompts) {
      await this.client.appendRow("Prompts", [
        prompt.id,
        prompt.scanId,
        prompt.category,
        prompt.prompt,
        prompt.createdAt,
      ]);
    }
  }

  async saveObservations(observations: AIObservation[]): Promise<void> {
    for (const obs of observations) {
      await this.client.appendRow("AI_Observations", [
        obs.id,
        obs.scanId,
        obs.promptId,
        obs.platform,
        obs.prompt,
        obs.brandMentioned,
        obs.brandRecommended,
        obs.citationFound,
        obs.competitorsMentioned.join(", "),
        obs.sentiment,
        obs.entityAccuracyScore,
        obs.scoreContribution,
        obs.responseSummary,
        obs.createdAt,
      ]);
    }
  }
}
