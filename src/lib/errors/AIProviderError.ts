import { ExternalProviderError } from "./ExternalProviderError";

export class AIProviderError extends ExternalProviderError {
  constructor(engine: string, message: string, cause?: unknown) {
    super("AI_PROVIDER_ERROR", `${engine}: ${message}`, cause);
    this.name = "AIProviderError";
  }
}
