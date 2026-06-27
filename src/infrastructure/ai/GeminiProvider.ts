import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AIEngineProvider, AIEngineResponse } from "@/application/ports/AIEngineProvider";
import type { BrandProfile } from "@/domain/entities/BrandProfile";
import type { AIEngine } from "@/domain/enums";
import { getEnv } from "../config/env";
import { AIProviderError } from "@/lib/errors/AIProviderError";

const AI_CALL_TIMEOUT_MS = 30_000;

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("AI call timed out")), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId!);
  }
}

export class GeminiProvider implements AIEngineProvider {
  readonly engineName: AIEngine = "gemini";
  private client: GoogleGenerativeAI | null = null;

  private getClient(): GoogleGenerativeAI {
    if (!this.client) {
      const env = getEnv();
      if (!env.GEMINI_API_KEY) {
        throw new AIProviderError("gemini", "API key not configured");
      }
      this.client = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    }
    return this.client;
  }

  async runPrompt(input: {
    prompt: string;
    brandName: string;
    websiteUrl: string;
    brandProfile: BrandProfile;
  }): Promise<AIEngineResponse> {
    try {
      const env = getEnv();
      const model = this.getClient().getGenerativeModel({
        model: env.GEMINI_MODEL,
      });

      const result = await withTimeout(
        model.generateContent({
          contents: [
            {
              role: "user",
              parts: [{ text: input.prompt }],
            },
          ],
        }),
        AI_CALL_TIMEOUT_MS,
      );

      const rawText = result.response.text().trim() || "No response generated.";

      return {
        engineName: this.engineName,
        prompt: input.prompt,
        rawText,
      };
    } catch (error) {
      throw new AIProviderError("gemini", "Request failed", error);
    }
  }
}
