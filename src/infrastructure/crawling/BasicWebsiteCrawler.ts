import type {
  WebsiteCrawler,
  CrawlResult,
  CrawledPage,
} from "@/application/ports/WebsiteCrawler";
import {
  discoverInternalPages,
  extractPageContent,
} from "./HtmlContentExtractor";
import { logger } from "../logging/logger";

const PAGE_TIMEOUT_MS = 10_000;
const MAX_PAGES = 5;

const log = logger();

async function fetchPage(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PAGE_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "AEO-Visibility-Scanner/1.0",
        Accept: "text/html",
      },
      redirect: "follow",
    });

    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return null;
    return await response.text();
  } catch (error) {
    log.warn("Page fetch failed", { url, error: String(error) });
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export class BasicWebsiteCrawler implements WebsiteCrawler {
  async crawl(websiteUrl: string): Promise<CrawlResult> {
    const pages: CrawledPage[] = [];
    const visited = new Set<string>();

    const homepageHtml = await fetchPage(websiteUrl);
    if (!homepageHtml) {
      return { websiteUrl, pages: [] };
    }

    const homepage = extractPageContent(homepageHtml, websiteUrl);
    pages.push(homepage);
    visited.add(websiteUrl);

    const additionalUrls = discoverInternalPages(
      websiteUrl,
      pages,
      MAX_PAGES,
    );

    for (const url of additionalUrls) {
      if (pages.length >= MAX_PAGES || visited.has(url)) continue;
      visited.add(url);

      const html = await fetchPage(url);
      if (!html) continue;
      pages.push(extractPageContent(html, url));
    }

    return { websiteUrl, pages };
  }
}
