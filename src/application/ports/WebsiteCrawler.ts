export interface CrawledPage {
  url: string;
  title: string;
  metaDescription: string;
  h1: string[];
  h2: string[];
  visibleText: string;
  internalLinks: string[];
  schemaJsonLd: string[];
  robotsMeta: string;
  canonicalUrl: string;
}

export interface CrawlResult {
  websiteUrl: string;
  pages: CrawledPage[];
}

export interface WebsiteCrawler {
  crawl(websiteUrl: string): Promise<CrawlResult>;
}
