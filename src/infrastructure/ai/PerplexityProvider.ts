import type { AIEngineProvider, AIEngineResponse } from "@/application/ports/AIEngineProvider";
import type { BrandProfile } from "@/domain/entities/BrandProfile";
import type { AIEngine } from "@/domain/enums";
import { getEnv } from "../config/env";
import { AIProviderError } from "@/lib/errors/AIProviderError";

const AI_CALL_TIMEOUT_MS = 30_000;

export class PerplexityProvider implements AIEngineProvider {
  readonly engineName: AIEngine = "perplexity";

  async runPrompt(input: {
    prompt: string;
    brandName: string;
    websiteUrl: string;
    brandProfile: BrandProfile;
  }): Promise<AIEngineResponse> {
    const env = getEnv();
    if (!env.PERPLEXITY_API_KEY) {
      throw new AIProviderError("perplexity", "API key not configured");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), AI_CALL_TIMEOUT_MS);

    try {
      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: env.PERPLEXITY_MODEL,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant answering buyer research questions.",
            },
            { role: "user", content: input.prompt },
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
        citations?: string[];
      };

      const rawText =
        data.choices?.[0]?.message?.content?.trim() ?? "No response generated.";

      return {
        engineName: this.engineName,
        prompt: input.prompt,
        rawText,
        citations: data.citations,
      };
    } catch (error) {
      throw new AIProviderError("perplexity", "Request failed", error);
    } finally {
      clearTimeout(timeout);
    }
  }
}
