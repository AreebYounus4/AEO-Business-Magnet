import type { Metadata } from "next";

export const SITE_NAME = "Calibrate Commerce";

export const SITE_DESCRIPTION =
  "Your next customer may never visit your website. Calibrate Commerce helps brands get found, trusted and chosen inside ChatGPT, Gemini, Claude, Perplexity and Google AI, through Answer Engine Optimization (AEO).";

export const SITE_OG_DESCRIPTION =
  "Your next customer may never visit your website. Get found, trusted and chosen inside AI-generated answers. Check your AI visibility score with Calibrate Commerce.";

export const SITE_TITLE = "AI Search Optimization (AEO) | Calibrate Commerce";

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://calibratecommerce.com/ai-search-optimization";

export const SITE_OG_IMAGE = {
  url: "/favicon.png",
  width: 512,
  height: 512,
  alt: "Calibrate Commerce",
};

export const NO_INDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
  },
};

export function createSiteMetadata(overrides: Metadata = {}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: "https://www.calibratecommerce.com" }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: NO_INDEX_ROBOTS,
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_TITLE,
      description: SITE_OG_DESCRIPTION,
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_OG_DESCRIPTION,
      images: [SITE_OG_IMAGE.url],
    },
    alternates: {
      canonical: SITE_URL,
    },
    ...overrides,
  };
}
