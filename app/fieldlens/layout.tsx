import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspect, diff, explore.",
  description:
    "Free online JSON inspector tool. Explore JSON structures visually, generate TypeScript types, compare JSON files side-by-side, extract paths, and validate JSON syntax. 100% client-side, your data never leaves your browser.",
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
    "free JSON tool",
  ],
  openGraph: {
    title: "JsonInspect - Inspect, diff, explore.",
    description:
      "Explore JSON structures, generate TypeScript types, compare JSON files, and extract paths instantly. 100% client-side, no data leaves your browser.",
    type: "website",
    url: "/fieldlens",
  },
  alternates: {
    canonical: "/fieldlens",
  },
};

export default function FieldLensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

