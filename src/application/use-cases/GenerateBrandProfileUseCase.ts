import type { BrandExtractor } from "@/application/ports/BrandExtractor";
import type { CrawlResult } from "@/application/ports/WebsiteCrawler";
import type { BrandProfile } from "@/domain/entities/BrandProfile";
import { extractDomain } from "@/lib/utils/url";
import { OpenAIBrandExtractor } from "@/infrastructure/ai/OpenAIProvider";
import { isEngineEnabled } from "@/infrastructure/config/env";
import { logger } from "@/infrastructure/logging/logger";

const log = logger();

export class GenerateBrandProfileUseCase {
  constructor(
    private readonly extractor: BrandExtractor = new OpenAIBrandExtractorAdapter(),
  ) {}

  async execute(crawlResult: CrawlResult): Promise<BrandProfile> {
    if (crawlResult.pages.length === 0 || !isEngineEnabled("openai")) {
      return buildProfileFromCrawl(crawlResult);
    }

    try {
      return await this.extractor.extract(crawlResult);
    } catch (error) {
      log.error("Brand extraction failed, using crawl fallback", {
        error: String(error),
      });
      return buildProfileFromCrawl(crawlResult);
    }
  }
}

function buildProfileFromCrawl(crawlResult: CrawlResult): BrandProfile {
  const domain = extractDomain(crawlResult.websiteUrl);
  const home = crawlResult.pages[0];
  const brandName =
    home?.title?.split(/[|\-–—]/)[0]?.trim() || home?.h1[0]?.trim() || domain;
  const summary =
    home?.metaDescription?.trim() ||
    home?.visibleText.slice(0, 280).trim() ||
    `Brand profile for ${domain}.`;

  return {
    brandName,
    websiteUrl: crawlResult.websiteUrl,
    industry: "General",
    targetAudience: [],
    productsOrServices: home?.h2?.slice(0, 5) ?? [],
    customerProblems: [],
    competitors: [],
    entitySignals: home?.schemaJsonLd?.length
      ? ["Structured data detected on website"]
      : [],
    summary,
  };
}

class OpenAIBrandExtractorAdapter implements BrandExtractor {
  private readonly openAi = new OpenAIBrandExtractor();

  async extract(crawlResult: CrawlResult): Promise<BrandProfile> {
    const content = crawlResult.pages
      .map(
        (p) =>
          `URL: ${p.url}\nTitle: ${p.title}\nDescription: ${p.metaDescription}\nH1: ${p.h1.join(", ")}\nText: ${p.visibleText.slice(0, 2000)}`,
      )
      .join("\n\n");

    return this.openAi.extractFromContent(crawlResult.websiteUrl, content);
  }
}
