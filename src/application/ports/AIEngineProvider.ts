import type { BrandProfile } from "@/domain/entities/BrandProfile";
import type { AIEngine } from "@/domain/enums";

export interface AIEngineResponse {
  engineName: AIEngine;
  prompt: string;
  rawText: string;
  citations?: string[];
  metadata?: Record<string, unknown>;
}

export interface AIEngineProvider {
  readonly engineName: AIEngine;

  runPrompt(input: {
    prompt: string;
    brandName: string;
    websiteUrl: string;
    brandProfile: BrandProfile;
  }): Promise<AIEngineResponse>;
}
