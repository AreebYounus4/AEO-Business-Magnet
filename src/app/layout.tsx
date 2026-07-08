import { Inter } from "next/font/google";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { createSiteMetadata } from "@/lib/seo/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = createSiteMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">
        <GoogleTagManager />
        {children}
      </body>
    </html>
  );
}
