import { AppError } from "./AppError";

export class ExternalProviderError extends AppError {
  constructor(
    code: string,
    message: string,
    public readonly cause?: unknown,
  ) {
    super(code, message, 502);
    this.name = "ExternalProviderError";
  }
}
