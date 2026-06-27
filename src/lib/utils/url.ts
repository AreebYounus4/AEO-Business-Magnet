import { ValidationError } from "@/lib/errors/ValidationError";

const PRIVATE_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^0\.0\.0\.0$/,
  /^\[::1\]$/,
  /^::1$/,
];

export function normalizeWebsiteUrl(input: string): string {
  const trimmed = input.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(withProtocol);
  } catch {
    throw new ValidationError("Please enter a valid website URL.");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new ValidationError("Website URL must use http or https.");
  }

  const hostname = parsed.hostname.toLowerCase();
  if (PRIVATE_HOST_PATTERNS.some((pattern) => pattern.test(hostname))) {
    throw new ValidationError("This website URL cannot be scanned.");
  }

  parsed.hash = "";
  return parsed.toString().replace(/\/$/, "");
}

export function extractDomain(url: string): string {
  return new URL(url).hostname.replace(/^www\./i, "");
}

export function isSameDomain(url: string, baseUrl: string): boolean {
  try {
    return extractDomain(url) === extractDomain(baseUrl);
  } catch {
    return false;
  }
}
