import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jsoninspect.dev";

  return {
    name: "JsonInspect - Inspect, diff, explore.",
    short_name: "JsonInspect",
    description: "Free online JSON inspector and validator. Explore JSON structures, generate TypeScript types, compare JSON files, and extract paths instantly.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#10b981",
    orientation: "any",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["developer", "utilities", "productivity"],
    screenshots: [],
  };
}

