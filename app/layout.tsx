import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import StructuredData from "@/components/seo/StructuredData";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jsoninspect.dev";
const siteName = "JsonInspect";
const siteDescription =
  "Free online JSON inspector and validator. Explore JSON structures, generate TypeScript types, compare JSON files, and extract paths instantly. 100% client-side, no data leaves your browser.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JsonInspect - Inspect, diff, explore.",
    template: "%s | JsonInspect",
  },
  description: siteDescription,
  keywords: [
    "JSON inspector",
    "JSON validator",
    "JSON viewer",
    "JSON editor",
    "TypeScript generator",
    "JSON compare",
    "JSON diff",
    "JSON path extractor",
    "JSON schema generator",
    "online JSON tool",
    "JSON formatter",
    "JSON parser",
  ],
  authors: [{ name: "XyDisorder" }],
  creator: "XyDisorder",
  publisher: "XyDisorder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "JsonInspect - Inspect, diff, explore.",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "JsonInspect - Inspect, diff, explore.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JsonInspect - Inspect, diff, explore.",
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: "@jsoninspect",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JsonInspect",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100`}>
        <StructuredData />
        <GoogleAnalytics />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
