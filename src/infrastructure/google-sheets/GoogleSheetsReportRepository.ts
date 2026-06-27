import type { ReportRepository } from "@/application/ports/ReportRepository";
import type { VisibilityReport } from "@/domain/entities/VisibilityReport";
import { GoogleSheetsClient } from "./GoogleSheetsClient";

export class GoogleSheetsReportRepository implements ReportRepository {
  constructor(private readonly client: GoogleSheetsClient) {}

  async saveReport(report: VisibilityReport): Promise<void> {
    await this.client.appendRow("Reports", [
      report.id,
      report.scanId,
      report.leadId,
      report.brandName,
      report.websiteUrl,
      report.overallScore,
      report.scoreBand,
      JSON.stringify(report.platformScores),
      JSON.stringify(report.keyFindings),
      JSON.stringify(report.recommendations),
      report.generatedAt,
    ]);
  }

  async getReportByScanId(scanId: string): Promise<VisibilityReport | null> {
    const rows = await this.client.findRows("Reports");
    const matches = rows.filter((row) => row[1] === scanId);
    if (matches.length === 0) return null;

    const row = matches[matches.length - 1];
    const platformScores = JSON.parse(row[7] || "[]");
    const keyFindings = JSON.parse(row[8] || "[]");
    const recommendations = JSON.parse(row[9] || "[]");

    return {
      id: row[0],
      scanId: row[1],
      leadId: row[2],
      brandName: row[3],
      websiteUrl: row[4],
      overallScore: Number(row[5]),
      scoreBand: row[6] as VisibilityReport["scoreBand"],
      platformScores,
      keyFindings,
      recommendations,
      enabledEngines: platformScores.map(
        (p: { platform: string }) => p.platform,
      ),
      generatedAt: row[10],
    };
  }
}
