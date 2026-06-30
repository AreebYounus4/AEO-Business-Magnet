export const AI_ENGINES = ["openai", "gemini", "perplexity", "claude"] as const;
export type AIEngine = (typeof AI_ENGINES)[number];

export const PROMPT_CATEGORIES = [
  "category_discovery",
  "problem_solution",
  "commercial_investigation",
  "reputation_branded",
  "transactional",
] as const;
export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];

export const SCAN_STATUSES = [
  "pending",
  "running",
  "completed",
  "failed",
] as const;
export type ScanStatus = (typeof SCAN_STATUSES)[number];

export const SCORE_BANDS = [
  "Low",
  "Weak",
  "Moderate",
  "Strong",
  "Excellent",
] as const;
export type ScoreBand = (typeof SCORE_BANDS)[number];

export const SENTIMENTS = ["positive", "neutral", "mixed", "negative"] as const;
export type Sentiment = (typeof SENTIMENTS)[number];

export const LEAD_STATUSES = ["new", "scanned", "failed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
