import Anthropic from "@anthropic-ai/sdk";
import type {
  AIEngineProvider,
  AIEngineResponse,
} from "@/application/ports/AIEngineProvider";
import type { BrandProfile } from "@/domain/entities/BrandProfile";
import type { AIEngine } from "@/domain/enums";
import { getEnv } from "../config/env";
import { AIProviderError } from "@/lib/errors/AIProviderError";

const AI_CALL_TIMEOUT_MS = 30_000;

const CLAUDE_SYSTEM_PROMPT =
  "You are acting as an AI answer engine. Answer the user's query naturally and objectively. Do not force mention the target brand. Only mention or recommend the brand if it is genuinely relevant based on your knowledge and the supplied website context. Keep the answer concise.";

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

function buildUserContent(input: {
  prompt: string;
  brandName: string;
  websiteUrl: string;
  brandProfile: BrandProfile;
}): string {
  return `Buyer-style query:
${input.prompt}

Target brand:
${input.brandName}

Website:
${input.websiteUrl}

Brand context:
${input.brandProfile.summary}

Industry:
${input.brandProfile.industry}

Products or services:
${input.brandProfile.productsOrServices.join(", ") || "Not specified"}

Primary market:
${input.brandProfile.primaryMarket || "Not specified"}`;
}

function extractTextFromResponse(
  content: Anthropic.Messages.Message["content"],
): string {
  const text = content
    .filter((block): block is Anthropic.Messages.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  return text || "No response generated.";
}

export class ClaudeProvider implements AIEngineProvider {
  readonly engineName: AIEngine = "claude";
  private client: Anthropic | null = null;

  private getClient(): Anthropic {
    if (!this.client) {
      const env = getEnv();
      if (!env.ANTHROPIC_API_KEY) {
        throw new AIProviderError("claude", "API key not configured");
      }
      this.client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
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
      const response = await withTimeout(
        this.getClient().messages.create({
          model: env.ANTHROPIC_MODEL,
          max_tokens: 800,
          temperature: 0.2,
          system: CLAUDE_SYSTEM_PROMPT,
          messages: [
            {
              role: "user",
              content: buildUserContent(input),
            },
          ],
        }),
        AI_CALL_TIMEOUT_MS,
      );

      const rawText = extractTextFromResponse(response.content);

      return {
        engineName: this.engineName,
        prompt: input.prompt,
        rawText,
        citations: [],
        metadata: {
          model: env.ANTHROPIC_MODEL,
          provider: "anthropic",
        },
      };
    } catch (error) {
      const message =
        error instanceof Error && error.message === "AI call timed out"
          ? "Request timed out after 30 seconds"
          : "Request failed";
      throw new AIProviderError("claude", message, error);
    }
  }
}
