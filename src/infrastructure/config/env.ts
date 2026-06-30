import { z } from "zod";
import { AI_ENGINES, type AIEngine } from "@/domain/enums";

let cachedEnv: AppEnv | null = null;

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  AI_ENGINE_OPENAI_ENABLED: z
    .string()
    .optional()
    .transform((v) => v !== "false"),
  AI_ENGINE_GEMINI_ENABLED: z
    .string()
    .optional()
    .transform((v) => v !== "false"),
  AI_ENGINE_PERPLEXITY_ENABLED: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  AI_ENGINE_CLAUDE_ENABLED: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  OPENAI_API_KEY: z.string().optional().default(""),
  OPENAI_MODEL: z.string().default("gpt-4.1-mini"),
  GEMINI_API_KEY: z.string().optional().default(""),
  GEMINI_MODEL: z.string().default("gemini-1.5-flash"),
  PERPLEXITY_API_KEY: z.string().optional().default(""),
  PERPLEXITY_MODEL: z.string().default("sonar"),
  ANTHROPIC_API_KEY: z.string().optional().default(""),
  ANTHROPIC_MODEL: z.string().default("claude-sonnet-4-6"),
  GOOGLE_SHEET_ID: z.string().optional().default(""),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().optional().default(""),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string().optional().default(""),
});

export type AppEnv = z.infer<typeof envSchema>;

function validateEngineConfiguration(env: AppEnv): void {
  if (env.AI_ENGINE_CLAUDE_ENABLED && !env.ANTHROPIC_API_KEY.trim()) {
    throw new Error(
      "Server configuration error: AI_ENGINE_CLAUDE_ENABLED is true but ANTHROPIC_API_KEY is missing. Set ANTHROPIC_API_KEY or set AI_ENGINE_CLAUDE_ENABLED=false.",
    );
  }
}

export function getEnv(): AppEnv {
  if (!cachedEnv) {
    cachedEnv = envSchema.parse(process.env);
    validateEngineConfiguration(cachedEnv);
  }
  return cachedEnv;
}

export function isEngineEnabled(engine: AIEngine): boolean {
  const env = getEnv();
  switch (engine) {
    case "openai":
      return env.AI_ENGINE_OPENAI_ENABLED && !!env.OPENAI_API_KEY;
    case "gemini":
      return env.AI_ENGINE_GEMINI_ENABLED && !!env.GEMINI_API_KEY;
    case "perplexity":
      return env.AI_ENGINE_PERPLEXITY_ENABLED && !!env.PERPLEXITY_API_KEY;
    case "claude":
      return env.AI_ENGINE_CLAUDE_ENABLED && !!env.ANTHROPIC_API_KEY;
  }
}

export function getEnabledEngineNames(): AIEngine[] {
  return AI_ENGINES.filter(isEngineEnabled);
}

export function hasGoogleSheetsConfig(): boolean {
  const env = getEnv();
  return !!(
    env.GOOGLE_SHEET_ID &&
    env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );
}
