import type { AIEngineProvider } from "@/application/ports/AIEngineProvider";
import type { AIEngine } from "@/domain/enums";
import { isEngineEnabled } from "../config/env";
import { OpenAIProvider } from "./OpenAIProvider";
import { GeminiProvider } from "./GeminiProvider";
import { PerplexityProvider } from "./PerplexityProvider";

export class AIEngineRegistry {
  private readonly providers: AIEngineProvider[];

  constructor(providers?: AIEngineProvider[]) {
    this.providers = providers ?? [
      new OpenAIProvider(),
      new GeminiProvider(),
      new PerplexityProvider(),
    ];
  }

  getEnabledProviders(): AIEngineProvider[] {
    return this.providers.filter((provider) =>
      isEngineEnabled(provider.engineName),
    );
  }

  getEnabledEngineNames(): AIEngine[] {
    return this.getEnabledProviders().map((p) => p.engineName);
  }
}
