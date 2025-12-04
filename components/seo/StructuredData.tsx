"use client";

import Script from "next/script";

type StructuredDataProps = {
  type?: "WebApplication" | "SoftwareApplication" | "WebSite";
  name?: string;
  description?: string;
  url?: string;
};

export default function StructuredData({
  type = "WebApplication",
  name = "JsonInspect",
  description = "Free online JSON inspector and validator. Explore JSON structures, generate TypeScript types, compare JSON files, and extract paths instantly.",
  url = process.env.NEXT_PUBLIC_SITE_URL || "https://jsoninspect.dev",
}: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jsoninspect.dev";

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: siteUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "JSON Inspector",
      "JSON Validator",
      "TypeScript Generator",
      "JSON Comparison",
      "Path Extractor",
      "Schema Generator",
      "100% Client-Side",
      "No Data Collection",
    ],
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/fieldlens?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://github.com/XyDisorder/json-lens",
    ],
  };

  return (
    <>
      <Script
        id="structured-data-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}

