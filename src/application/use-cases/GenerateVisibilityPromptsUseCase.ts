import type { PromptGenerator } from "@/application/ports/PromptGenerator";
import type { BrandProfile } from "@/domain/entities/BrandProfile";
import type { VisibilityPrompt } from "@/domain/entities/VisibilityPrompt";
import { generateVisibilityPrompts } from "@/domain/services/PromptPolicy";

export class GenerateVisibilityPromptsUseCase implements PromptGenerator {
  async generate(
    scanId: string,
    profile: BrandProfile,
  ): Promise<VisibilityPrompt[]> {
    return generateVisibilityPrompts(scanId, profile);
  }
}
