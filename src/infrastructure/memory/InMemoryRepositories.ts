import type { LeadRepository } from "@/application/ports/LeadRepository";
import type { ScanRepository } from "@/application/ports/ScanRepository";
import type { ReportRepository } from "@/application/ports/ReportRepository";
import type { Lead, UpdateLeadScoreInput } from "@/domain/entities/Lead";
import type { Scan } from "@/domain/entities/Scan";
import type { VisibilityPrompt } from "@/domain/entities/VisibilityPrompt";
import type { AIObservation } from "@/domain/entities/AIObservation";
import type { VisibilityReport } from "@/domain/entities/VisibilityReport";
import { logger } from "../logging/logger";

const log = logger();

export class InMemoryLeadRepository implements LeadRepository {
  private leads: Lead[] = [];

  async createLead(lead: Lead): Promise<void> {
    this.leads.push(lead);
    log.info("Lead stored in memory", { leadId: lead.id });
  }

  async updateLeadScore(input: UpdateLeadScoreInput): Promise<void> {
    const lead = this.leads.find((l) => l.id === input.leadId);
    if (!lead) return;
    Object.assign(lead, {
      brandName: input.brandName,
      overallScore: input.overallScore,
      scoreBand: input.scoreBand,
      enabledEngines: input.enabledEngines,
      reportUrl: input.reportUrl,
      status: input.status,
      updatedAt: new Date().toISOString(),
    });
  }
}

export class InMemoryScanRepository implements ScanRepository {
  private scans: Scan[] = [];
  private prompts: VisibilityPrompt[] = [];
  private observations: AIObservation[] = [];

  async createScan(scan: Scan): Promise<void> {
    this.scans.push(scan);
  }

  async updateScan(scan: Scan): Promise<void> {
    const index = this.scans.findIndex((s) => s.id === scan.id);
    if (index >= 0) this.scans[index] = scan;
  }

  async savePrompts(prompts: VisibilityPrompt[]): Promise<void> {
    this.prompts.push(...prompts);
  }

  async saveObservations(observations: AIObservation[]): Promise<void> {
    this.observations.push(...observations);
  }
}

export class InMemoryReportRepository implements ReportRepository {
  private reports: VisibilityReport[] = [];

  async saveReport(report: VisibilityReport): Promise<void> {
    this.reports.push(report);
  }

  async getReportByScanId(scanId: string): Promise<VisibilityReport | null> {
    const matches = this.reports.filter((r) => r.scanId === scanId);
    return matches[matches.length - 1] ?? null;
  }
}
