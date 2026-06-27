import { ExternalProviderError } from "./ExternalProviderError";

export class GoogleSheetsError extends ExternalProviderError {
  constructor(message: string, cause?: unknown) {
    super("GOOGLE_SHEETS_ERROR", message, cause);
    this.name = "GoogleSheetsError";
  }
}
