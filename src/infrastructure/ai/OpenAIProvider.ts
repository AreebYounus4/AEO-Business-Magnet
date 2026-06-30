import OpenAI from "openai";
import { z } from "zod";
import type { AIEngineProvider, AIEngineResponse } from "@/application/ports/AIEngineProvider";
import type { BrandProfile } from "@/domain/entities/BrandProfile";
import type { AIEngine } from "@/domain/enums";
import { getEnv } from "../config/env";
import { AIProviderError } from "@/lib/errors/AIProviderError";

const AI_CALL_TIMEOUT_MS = 30_000;

function formatOpenAIErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message === "AI call timed out") {
    return "Request timed out after 30 seconds";
  }

  if (error && typeof error === "object" && "error" in error) {
    const apiError = (error as { error?: { message?: string; code?: string } })
      .error;
    if (apiError?.code === "insufficient_quota") {
      return "API quota exceeded. Check your OpenAI billing settings.";
    }
    if (apiError?.message) return apiError.message;
  }

  if (error instanceof Error && error.message) {
    return error.message.replace(/^\d{3}\s+/, "");
  }

  return "Request failed";
}

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

export class OpenAIProvider implements AIEngineProvider {
  readonly engineName: AIEngine = "openai";
  private client: OpenAI | null = null;

  private getClient(): OpenAI {
    if (!this.client) {
      const env = getEnv();
      if (!env.OPENAI_API_KEY) {
        throw new AIProviderError("openai", "API key not configured");
      }
      this.client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
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
      const completion = await withTimeout(
        this.getClient().chat.completions.create({
          model: env.OPENAI_MODEL,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant answering buyer research questions. Be concise and factual.",
            },
            { role: "user", content: input.prompt },
          ],
          temperature: 0.4,
        }),
        AI_CALL_TIMEOUT_MS,
      );

      const rawText =
        completion.choices[0]?.message?.content?.trim() ??
        "No response generated.";

      return {
        engineName: this.engineName,
        prompt: input.prompt,
        rawText,
      };
    } catch (error) {
      throw new AIProviderError(
        "openai",
        formatOpenAIErrorMessage(error),
        error,
      );
    }
  }
}

const brandProfileSchema = z.object({
  brandName: z.string().optional(),
  industry: z.string().optional(),
  primaryMarket: z.string().optional(),
  targetAudience: z.array(z.string()).optional(),
  productsOrServices: z.array(z.string()).optional(),
  customerProblems: z.array(z.string()).optional(),
  competitors: z.array(z.string()).optional(),
  entitySignals: z.array(z.string()).optional(),
  summary: z.string().optional(),
});

function parseBrandProfile(
  raw: string,
  websiteUrl: string,
): BrandProfile {
  const domain = new URL(websiteUrl).hostname.replace(/^www\./i, "");
  let json: unknown = {};
  try {
    json = JSON.parse(raw);
  } catch {
    json = {};
  }

  const parsed = brandProfileSchema.safeParse(json);
  const data = parsed.success ? parsed.data : {};

  return {
    brandName: data.brandName?.trim() || domain,
    websiteUrl,
    industry: data.industry?.trim() || "General",
    primaryMarket: data.primaryMarket?.trim() || undefined,
    targetAudience: data.targetAudience ?? [],
    productsOrServices: data.productsOrServices ?? [],
    customerProblems: data.customerProblems ?? [],
    competitors: data.competitors ?? [],
    entitySignals: data.entitySignals ?? [],
    summary: data.summary?.trim() || `Brand profile for ${domain}.`,
  };
}

export class OpenAIBrandExtractor {
  private client: OpenAI | null = null;

  private getClient(): OpenAI {
    if (!this.client) {
      const env = getEnv();
      if (!env.OPENAI_API_KEY) {
        throw new AIProviderError("openai", "API key not configured");
      }
      this.client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
    }
    return this.client;
  }

  async extractFromContent(
    websiteUrl: string,
    content: string,
  ): Promise<BrandProfile> {
    const env = getEnv();

    try {
      const completion = await withTimeout(
        this.getClient().chat.completions.create({
          model: env.OPENAI_MODEL,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "Extract a structured brand profile from website content. Return strict JSON only. Do not hallucinate competitors.",
            },
            {
              role: "user",
              content: `Website: ${websiteUrl}\n\nContent:\n${content.slice(0, 12000)}`,
            },
          ],
          temperature: 0.2,
        }),
        AI_CALL_TIMEOUT_MS,
      );

      const raw = completion.choices[0]?.message?.content ?? "{}";
      return parseBrandProfile(raw, websiteUrl);
    } catch (error) {
      throw new AIProviderError(
        "openai",
        formatOpenAIErrorMessage(error),
        error,
      );
    }
  }

  async evaluateResponse(input: {
    prompt: string;
    rawText: string;
    brandProfile: BrandProfile;
  }): Promise<{
    brandRecommended: boolean;
    competitorsMentioned: string[];
    sentiment: "positive" | "neutral" | "mixed" | "negative";
    entityAccuracyScore: number;
  }> {
    const env = getEnv();
    const schema = z.object({
      brandRecommended: z.boolean(),
      competitorsMentioned: z.array(z.string()),
      sentiment: z.enum(["positive", "neutral", "mixed", "negative"]),
      entityAccuracyScore: z.number().min(0).max(100),
    });

    const completion = await withTimeout(
      this.getClient().chat.completions.create({
        model: env.OPENAI_MODEL,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Evaluate AI visibility response for a brand. Return strict JSON only.",
          },
          {
            role: "user",
            content: JSON.stringify({
              brand: input.brandProfile.brandName,
              website: input.brandProfile.websiteUrl,
              competitors: input.brandProfile.competitors,
              prompt: input.prompt,
              response: input.rawText.slice(0, 3000),
            }),
          },
        ],
        temperature: 0,
      }),
      AI_CALL_TIMEOUT_MS,
    );

    const raw = completion.choices[0]?.message?.content ?? "{}";
    return schema.parse(JSON.parse(raw));
  }

  async generateFindings(input: {
    brandProfile: BrandProfile;
    observations: Array<{
      platform: string;
      brandMentioned: boolean;
      brandRecommended: boolean;
      citationFound: boolean;
    }>;
    platformScores: Array<{ platform: string; score: number }>;
  }): Promise<{ keyFindings: string[]; recommendations: string[] }> {
    const env = getEnv();
    const schema = z.object({
      keyFindings: z.array(z.string()).min(3).max(5),
      recommendations: z.array(z.string()).min(3).max(5),
    });

    const completion = await withTimeout(
      this.getClient().chat.completions.create({
        model: env.OPENAI_MODEL,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Generate concise AI visibility findings and recommendations. Return strict JSON.",
          },
          { role: "user", content: JSON.stringify(input) },
        ],
        temperature: 0.3,
      }),
      AI_CALL_TIMEOUT_MS,
    );

    const raw = completion.choices[0]?.message?.content ?? "{}";
    return schema.parse(JSON.parse(raw));
  }
}
