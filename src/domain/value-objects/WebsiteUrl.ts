import { normalizeWebsiteUrl } from "@/lib/utils/url";

export function parseWebsiteUrl(value: string): string {
  return normalizeWebsiteUrl(value);
}
