import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NotFoundPage } from "@/components/NotFoundPage";
import { NO_INDEX_ROBOTS, SITE_NAME, SITE_URL } from "@/lib/seo/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    absolute: "Not Found",
  },
  robots: NO_INDEX_ROBOTS,
  openGraph: {
    title: "Not Found",
    type: "website",
    siteName: SITE_NAME,
    url: `${SITE_URL.replace(/\/$/, "")}/404`,
  },
  twitter: {
    card: "summary",
    title: "Not Found",
  },
  alternates: {
    canonical: `${SITE_URL.replace(/\/$/, "")}/404`,
  },
};

export default function NotFound() {
  return (
    <div className={montserrat.className}>
      <NotFoundPage />
    </div>
  );
}
