import type { LeadRepository } from "@/application/ports/LeadRepository";
import type { Lead, UpdateLeadScoreInput } from "@/domain/entities/Lead";
import { GoogleSheetsClient } from "./GoogleSheetsClient";

export class GoogleSheetsLeadRepository implements LeadRepository {
  constructor(private readonly client: GoogleSheetsClient) {}

  async createLead(lead: Lead): Promise<void> {
    await this.client.appendRow("Leads", [
      lead.id,
      lead.scanId,
      lead.fullName,
      lead.workEmail,
      lead.phoneNumber,
      lead.websiteUrl,
      lead.brandName,
      lead.overallScore ?? "",
      lead.scoreBand ?? "",
      lead.enabledEngines.join(", "),
      lead.reportUrl,
      lead.status,
      lead.createdAt,
      lead.updatedAt,
    ]);
  }

  async updateLeadScore(input: UpdateLeadScoreInput): Promise<void> {
    const rows = await this.client.findRows("Leads");
    const row = rows.find((r) => r[0] === input.leadId);
    if (!row) return;

    await this.client.updateRowByScanId("Leads", input.leadId, 0, [
      input.leadId,
      row[1] ?? "",
      row[2] ?? "",
      row[3] ?? "",
      row[4] ?? "",
      row[5] ?? "",
      input.brandName,
      input.overallScore,
      input.scoreBand,
      input.enabledEngines.join(", "),
      input.reportUrl,
      input.status,
      row[12] ?? "",
      new Date().toISOString(),
    ]);
  }
}
