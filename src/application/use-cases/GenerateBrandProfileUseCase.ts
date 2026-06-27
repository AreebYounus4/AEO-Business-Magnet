import type { BrandExtractor } from "@/application/ports/BrandExtractor";
import type { CrawlResult } from "@/application/ports/WebsiteCrawler";
import type { BrandProfile } from "@/domain/entities/BrandProfile";
import { extractDomain } from "@/lib/utils/url";
import { OpenAIBrandExtractor } from "@/infrastructure/ai/OpenAIProvider";

export class GenerateBrandProfileUseCase {
  constructor(
    private readonly extractor: BrandExtractor = new OpenAIBrandExtractorAdapter(),
  ) {}

  async execute(crawlResult: CrawlResult): Promise<BrandProfile> {
    if (crawlResult.pages.length === 0) {
      const domain = extractDomain(crawlResult.websiteUrl);
      return {
        brandName: domain,
        websiteUrl: crawlResult.websiteUrl,
        industry: "General",
        targetAudience: [],
        productsOrServices: [],
        customerProblems: [],
        competitors: [],
        entitySignals: [],
        summary: `Limited content available for ${domain}.`,
      };
    }

    return this.extractor.extract(crawlResult);
  }
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
