import * as cheerio from "cheerio";
import type { CrawledPage } from "@/application/ports/WebsiteCrawler";

export function extractPageContent(html: string, url: string): CrawledPage {
  const $ = cheerio.load(html);

  $("script, style, noscript").remove();

  const title = $("title").first().text().trim();
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() ?? "";
  const h1 = $("h1")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);
  const h2 = $("h2")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean)
    .slice(0, 10);

  const visibleText = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 8000);

  const internalLinks = $("a[href]")
    .map((_, el) => $(el).attr("href") ?? "")
    .get()
    .filter(Boolean);

  const schemaJsonLd: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const content = $(el).html()?.trim();
    if (content) schemaJsonLd.push(content.slice(0, 2000));
  });

  const robotsMeta = $('meta[name="robots"]').attr("content")?.trim() ?? "";
  const canonicalUrl =
    $('link[rel="canonical"]').attr("href")?.trim() ?? url;

  return {
    url,
    title,
    metaDescription,
    h1,
    h2,
    visibleText,
    internalLinks,
    schemaJsonLd,
    robotsMeta,
    canonicalUrl,
  };
}

export function discoverInternalPages(
  baseUrl: string,
  pages: CrawledPage[],
  maxPages: number,
): string[] {
  const base = new URL(baseUrl);
  const discovered = new Set<string>();
  const keywords = ["about", "services", "service", "product", "contact"];

  for (const page of pages) {
    for (const link of page.internalLinks) {
      try {
        const resolved = new URL(link, baseUrl);
        if (resolved.hostname !== base.hostname) continue;
        const path = resolved.pathname.toLowerCase();
        if (keywords.some((k) => path.includes(k))) {
          discovered.add(resolved.toString().replace(/\/$/, ""));
        }
      } catch {
        // ignore invalid links
      }
    }
  }

  return Array.from(discovered)
    .filter((url) => url !== baseUrl.replace(/\/$/, ""))
    .slice(0, maxPages - 1);
}
