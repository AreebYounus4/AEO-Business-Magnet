import type { VisibilityReport } from "@/domain/entities/VisibilityReport";

export interface ReportRepository {
  saveReport(report: VisibilityReport): Promise<void>;
  getReportByScanId(scanId: string): Promise<VisibilityReport | null>;
}
