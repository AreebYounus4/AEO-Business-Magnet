import type { BrandProfile } from "@/domain/entities/BrandProfile";
import type { CrawlResult } from "./WebsiteCrawler";

export interface BrandExtractor {
  extract(crawlResult: CrawlResult): Promise<BrandProfile>;
}
