import type { CreateScanRequest } from "@/application/dto/CreateScanRequest";
import type { LeadRepository } from "@/application/ports/LeadRepository";
import type { ScanRepository } from "@/application/ports/ScanRepository";
import type { ReportRepository } from "@/application/ports/ReportRepository";
import type { WebsiteCrawler } from "@/application/ports/WebsiteCrawler";
import type { Scan } from "@/domain/entities/Scan";
import { createLeadId, createScanId } from "@/lib/utils/id";
import { nowIso } from "@/lib/utils/date";
import { parseWebsiteUrl } from "@/domain/value-objects/WebsiteUrl";
import { getEnv } from "@/infrastructure/config/env";
import { AppError } from "@/lib/errors/AppError";
import { ValidationError } from "@/lib/errors/ValidationError";
import { GenerateBrandProfileUseCase } from "./GenerateBrandProfileUseCase";
import { GenerateVisibilityPromptsUseCase } from "./GenerateVisibilityPromptsUseCase";
import { RunAIVisibilityChecksUseCase } from "./RunAIVisibilityChecksUseCase";
import { GenerateVisibilityReportUseCase } from "./GenerateVisibilityReportUseCase";
import { AIEngineRegistry } from "@/infrastructure/ai/AIEngineRegistry";
import { BasicWebsiteCrawler } from "@/infrastructure/crawling/BasicWebsiteCrawler";

export class CreateVisibilityScanUseCase {
  constructor(
    private readonly leadRepository: LeadRepository,
    private readonly scanRepository: ScanRepository,
    private readonly reportRepository: ReportRepository,
    private readonly crawler: WebsiteCrawler = new BasicWebsiteCrawler(),
    private readonly engineRegistry: AIEngineRegistry = new AIEngineRegistry(),
    private readonly brandProfileUseCase = new GenerateBrandProfileUseCase(),
    private readonly promptUseCase = new GenerateVisibilityPromptsUseCase(),
    private readonly visibilityChecksUseCase?: RunAIVisibilityChecksUseCase,
    private readonly reportUseCase = new GenerateVisibilityReportUseCase(),
  ) {}

  async execute(request: CreateScanRequest) {
    const normalizedUrl = parseWebsiteUrl(request.websiteUrl);
    const leadId = createLeadId();
    const scanId = createScanId();
    const env = getEnv();
    const reportUrl = `${env.NEXT_PUBLIC_APP_URL}/report/${scanId}`;
    const enabledEngines = this.engineRegistry.getEnabledEngineNames();
    const now = nowIso();

    if (enabledEngines.length === 0) {
      throw new AppError(
        "NO_ENGINES_ENABLED",
        "No AI engines are currently enabled for scanning.",
        503,
      );
    }

    await this.leadRepository.createLead({
      id: leadId,
      scanId,
      fullName: request.fullName,
      workEmail: request.workEmail,
      phoneNumber: request.phoneNumber,
      websiteUrl: normalizedUrl,
      brandName: "",
      enabledEngines,
      reportUrl,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });

    const scan: Scan = {
      id: scanId,
      leadId,
      websiteUrl: request.websiteUrl,
      normalizedWebsiteUrl: normalizedUrl,
      brandName: "",
      industry: "",
      primaryMarket: "",
      status: "running",
      startedAt: now,
    };

    await this.scanRepository.createScan(scan);

    try {
      const crawlResult = await this.crawler.crawl(normalizedUrl);
      const brandProfile = await this.brandProfileUseCase.execute(crawlResult);

      scan.brandName = brandProfile.brandName;
      scan.industry = brandProfile.industry;
      scan.primaryMarket = brandProfile.primaryMarket ?? "";
      await this.scanRepository.updateScan(scan);

      const prompts = await this.promptUseCase.generate(scanId, brandProfile);
      await this.scanRepository.savePrompts(prompts);

      const checksUseCase =
        this.visibilityChecksUseCase ??
        new RunAIVisibilityChecksUseCase(
          this.engineRegistry.getEnabledProviders(),
        );

      const { observations, partialResults } =
        await checksUseCase.execute({
          scanId,
          brandProfile,
          prompts,
        });

      await this.scanRepository.saveObservations(observations);

      const report = await this.reportUseCase.execute({
        scanId,
        leadId,
        brandProfile,
        observations,
        enabledEngines,
        partialResults,
      });

      await this.reportRepository.saveReport(report);

      scan.status = "completed";
      scan.completedAt = nowIso();
      await this.scanRepository.updateScan(scan);

      await this.leadRepository.updateLeadScore({
        leadId,
        brandName: brandProfile.brandName,
        overallScore: report.overallScore,
        scoreBand: report.scoreBand,
        enabledEngines,
        reportUrl,
        status: "scanned",
      });

      return {
        scanId,
        reportUrl,
        partialResults,
      };
    } catch (error) {
      const originalMessage =
        error instanceof Error ? error.message : "Scan failed";
      scan.status = "failed";
      scan.completedAt = nowIso();
      scan.errorMessage = originalMessage;
      await this.scanRepository.updateScan(scan);

      await this.leadRepository.updateLeadScore({
        leadId,
        brandName: scan.brandName,
        overallScore: 0,
        scoreBand: "Low",
        enabledEngines,
        reportUrl,
        status: "failed",
      });

      if (error instanceof ValidationError || error instanceof AppError) {
        throw error;
      }

      console.error("Scan pipeline failed:", error);

      throw new AppError("SCAN_FAILED", originalMessage, 500);
    }
  }
}
