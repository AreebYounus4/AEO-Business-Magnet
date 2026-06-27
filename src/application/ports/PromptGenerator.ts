import type { BrandProfile } from "@/domain/entities/BrandProfile";
import type { VisibilityPrompt } from "@/domain/entities/VisibilityPrompt";

export interface PromptGenerator {
  generate(scanId: string, profile: BrandProfile): Promise<VisibilityPrompt[]>;
}
