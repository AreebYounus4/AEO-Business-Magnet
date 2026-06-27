import { ExternalProviderError } from "./ExternalProviderError";

export class CrawlerError extends ExternalProviderError {
  constructor(message: string, cause?: unknown) {
    super("CRAWLER_ERROR", message, cause);
    this.name = "CrawlerError";
  }
}
