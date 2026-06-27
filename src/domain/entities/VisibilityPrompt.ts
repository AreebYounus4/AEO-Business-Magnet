import type { PromptCategory } from "../enums";

export interface VisibilityPrompt {
  id: string;
  scanId: string;
  category: PromptCategory;
  prompt: string;
  createdAt: string;
}
