import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Search Optimization (AEO) | Calibrate Commerce",
  description:
    "Your next customer may never visit your website. Calibrate Commerce helps brands get found, trusted and chosen inside ChatGPT, Gemini, Claude, Perplexity and Google AI, through Answer Engine Optimization (AEO).",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "AI Search Optimization (AEO) | Calibrate Commerce",
    description:
      "Your next customer may never visit your website. Get found, trusted and chosen inside AI-generated answers. Check your AI visibility score with Calibrate Commerce.",
    type: "website",
    url: "https://calibratecommerce.com/ai-search-optimization",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Search Optimization (AEO) | Calibrate Commerce",
    description:
      "Your next customer may never visit your website. Get found, trusted and chosen inside AI-generated answers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
