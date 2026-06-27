import type { LeadRepository } from "@/application/ports/LeadRepository";
import type { ScanRepository } from "@/application/ports/ScanRepository";
import type { ReportRepository } from "@/application/ports/ReportRepository";
import { GoogleSheetsClient } from "@/infrastructure/google-sheets/GoogleSheetsClient";
import { GoogleSheetsLeadRepository } from "@/infrastructure/google-sheets/GoogleSheetsLeadRepository";
import { GoogleSheetsScanRepository } from "@/infrastructure/google-sheets/GoogleSheetsScanRepository";
import { GoogleSheetsReportRepository } from "@/infrastructure/google-sheets/GoogleSheetsReportRepository";
import {
  InMemoryLeadRepository,
  InMemoryScanRepository,
  InMemoryReportRepository,
} from "@/infrastructure/memory/InMemoryRepositories";
import { hasGoogleSheetsConfig } from "@/infrastructure/config/env";
import { CreateVisibilityScanUseCase } from "@/application/use-cases/CreateVisibilityScanUseCase";
import { AIEngineRegistry } from "@/infrastructure/ai/AIEngineRegistry";

let leadRepository: LeadRepository | null = null;
let scanRepository: ScanRepository | null = null;
let reportRepository: ReportRepository | null = null;
let createScanUseCase: CreateVisibilityScanUseCase | null = null;
let engineRegistry: AIEngineRegistry | null = null;

function initRepositories() {
  if (leadRepository) return;

  if (hasGoogleSheetsConfig()) {
    const client = new GoogleSheetsClient();
    leadRepository = new GoogleSheetsLeadRepository(client);
    scanRepository = new GoogleSheetsScanRepository(client);
    reportRepository = new GoogleSheetsReportRepository(client);
  } else {
    leadRepository = new InMemoryLeadRepository();
    scanRepository = new InMemoryScanRepository();
    reportRepository = new InMemoryReportRepository();
  }
}

export function getLeadRepository(): LeadRepository {
  initRepositories();
  return leadRepository!;
}

export function getScanRepository(): ScanRepository {
  initRepositories();
  return scanRepository!;
}

export function getReportRepository(): ReportRepository {
  initRepositories();
  return reportRepository!;
}

export function getCreateScanUseCase(): CreateVisibilityScanUseCase {
  if (!createScanUseCase) {
    initRepositories();
    createScanUseCase = new CreateVisibilityScanUseCase(
      leadRepository!,
      scanRepository!,
      reportRepository!,
    );
  }
  return createScanUseCase;
}

export function getAIEngineRegistry(): AIEngineRegistry {
  if (!engineRegistry) {
    engineRegistry = new AIEngineRegistry();
  }
  return engineRegistry;
}
