import { nanoid } from "nanoid";

export function createId(prefix: string): string {
  return `${prefix}_${nanoid(12)}`;
}

export function createLeadId(): string {
  return createId("lead");
}

export function createScanId(): string {
  return createId("scan");
}

export function createPromptId(): string {
  return createId("prompt");
}

export function createObservationId(): string {
  return createId("obs");
}

export function createReportId(): string {
  return createId("report");
}
