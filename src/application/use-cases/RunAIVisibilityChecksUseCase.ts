import type { AIEngineProvider } from "@/application/ports/AIEngineProvider";
import type { BrandProfile } from "@/domain/entities/BrandProfile";
import type { VisibilityPrompt } from "@/domain/entities/VisibilityPrompt";
import type { AIObservation } from "@/domain/entities/AIObservation";
import { evaluateVisibilityResponse } from "@/domain/services/VisibilityEvaluator";
import { OpenAIBrandExtractor } from "@/infrastructure/ai/OpenAIProvider";
import { logger } from "@/infrastructure/logging/logger";
import { AppError } from "@/lib/errors/AppError";

const log = logger();
const CONCURRENCY = 3;

export class RunAIVisibilityChecksUseCase {
  constructor(
    private readonly providers: AIEngineProvider[],
    private readonly evaluator = new OpenAIBrandExtractor(),
  ) {}

  async execute(input: {
    scanId: string;
    brandProfile: BrandProfile;
    prompts: VisibilityPrompt[];
  }): Promise<{
    observations: AIObservation[];
    failedEngines: string[];
    partialResults: boolean;
  }> {
    const observations: AIObservation[] = [];
    const failedEngines = new Set<string>();

    const tasks: Array<() => Promise<void>> = [];

    for (const prompt of input.prompts) {
      for (const provider of this.providers) {
        tasks.push(async () => {
          try {
            const response = await provider.runPrompt({
              prompt: prompt.prompt,
              brandName: input.brandProfile.brandName,
              websiteUrl: input.brandProfile.websiteUrl,
              brandProfile: input.brandProfile,
            });

            let aiEvaluation;
            try {
              aiEvaluation = await this.evaluator.evaluateResponse({
                prompt: prompt.prompt,
                rawText: response.rawText,
                brandProfile: input.brandProfile,
              });
            } catch {
              // fall back to deterministic evaluation
            }

            observations.push(
              evaluateVisibilityResponse({
                engineName: provider.engineName,
                prompt: prompt.prompt,
                promptId: prompt.id,
                scanId: input.scanId,
                rawText: response.rawText,
                brandProfile: input.brandProfile,
                aiEvaluation,
              }),
            );
          } catch (error) {
            failedEngines.add(provider.engineName);
            log.error("AI provider failed", {
              engine: provider.engineName,
              error: String(error),
            });
          }
        });
      }
    }

    await runWithConcurrency(tasks, CONCURRENCY);

    const successfulEngines = new Set(observations.map((o) => o.platform));
    const allFailed = this.providers.every(
      (p) => !successfulEngines.has(p.engineName),
    );

    if (allFailed) {
      throw new AppError(
        "AI_PROVIDERS_FAILED",
        "All enabled AI providers failed. Check your API keys and billing settings.",
        502,
      );
    }

    return {
      observations,
      failedEngines: Array.from(failedEngines),
      partialResults: failedEngines.size > 0,
    };
  }
}

async function runWithConcurrency(
  tasks: Array<() => Promise<void>>,
  limit: number,
): Promise<void> {
  const queue = [...tasks];
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length > 0) {
      const task = queue.shift();
      if (task) await task();
    }
  });
  await Promise.all(workers);
}
