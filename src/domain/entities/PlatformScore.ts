import type { AIEngine } from "../enums";

export interface PlatformScore {
  platform: AIEngine;
  score: number;
  reason: string;
}
