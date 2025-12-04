import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jsoninspect.dev";

  const routes = [
    "",
    "/fieldlens",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/cookie-policy",
    "/legal-notice",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/fieldlens" ? "daily" : "monthly",
    priority: route === "" || route === "/fieldlens" ? 1.0 : 0.7,
  }));
}

