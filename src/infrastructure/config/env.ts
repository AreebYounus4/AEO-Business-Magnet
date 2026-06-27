import { z } from "zod";

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
  OPENAI_API_KEY: z.string().optional().default(""),
  OPENAI_MODEL: z.string().default("gpt-4.1-mini"),
  GEMINI_API_KEY: z.string().optional().default(""),
  GEMINI_MODEL: z.string().default("gemini-1.5-flash"),
  PERPLEXITY_API_KEY: z.string().optional().default(""),
  PERPLEXITY_MODEL: z.string().default("sonar"),
  GOOGLE_SHEET_ID: z.string().optional().default(""),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().optional().default(""),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string().optional().default(""),
});

export type AppEnv = z.infer<typeof envSchema>;

export function getEnv(): AppEnv {
  if (!cachedEnv) {
    cachedEnv = envSchema.parse(process.env);
  }
  return cachedEnv;
}

export function isEngineEnabled(
  engine: "openai" | "gemini" | "perplexity",
): boolean {
  const env = getEnv();
  switch (engine) {
    case "openai":
      return env.AI_ENGINE_OPENAI_ENABLED && !!env.OPENAI_API_KEY;
    case "gemini":
      return env.AI_ENGINE_GEMINI_ENABLED && !!env.GEMINI_API_KEY;
    case "perplexity":
      return env.AI_ENGINE_PERPLEXITY_ENABLED && !!env.PERPLEXITY_API_KEY;
  }
}

export function getEnabledEngineNames(): Array<"openai" | "gemini" | "perplexity"> {
  return (["openai", "gemini", "perplexity"] as const).filter(isEngineEnabled);
}

export function hasGoogleSheetsConfig(): boolean {
  const env = getEnv();
  return !!(
    env.GOOGLE_SHEET_ID &&
    env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );
}
