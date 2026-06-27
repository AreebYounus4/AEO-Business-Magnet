import type { Scan } from "@/domain/entities/Scan";
import type { VisibilityPrompt } from "@/domain/entities/VisibilityPrompt";
import type { AIObservation } from "@/domain/entities/AIObservation";

export interface ScanRepository {
  createScan(scan: Scan): Promise<void>;
  updateScan(scan: Scan): Promise<void>;
  savePrompts(prompts: VisibilityPrompt[]): Promise<void>;
  saveObservations(observations: AIObservation[]): Promise<void>;
}
