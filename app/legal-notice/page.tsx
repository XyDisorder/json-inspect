import Link from "next/link";
import Footer from "@/components/ui/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice",
  description:
    "Legal notice and information about JsonInspect. Hosting information, intellectual property, data processing, and liability information.",
  keywords: ["JsonInspect legal", "legal notice", "intellectual property", "hosting information"],
  openGraph: {
    title: "Legal Notice — JsonInspect",
    description: "Legal notice and information about JsonInspect. Open source project with client-side processing.",
    type: "website",
    url: "/legal-notice",
  },
  alternates: {
    canonical: "/legal-notice",
  },
};

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/fieldlens"
          className="mb-8 inline-block text-sm text-emerald-300 transition hover:text-emerald-200"
        >
          ← Back to JsonInspect
        </Link>

        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold text-white">Legal Notice</h1>
          <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-6 text-sm text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Publisher Information</h2>
            <p>
              <strong className="text-slate-200">Service Name:</strong> JsonInspect
            </p>
            <p>
              <strong className="text-slate-200">Type:</strong> Open Source Developer Tool
            </p>
            <p>
              <strong className="text-slate-200">Description:</strong> A client-side JSON inspection and analysis tool
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Hosting</h2>
            <p>
              This service is hosted on web hosting infrastructure. The specific hosting provider may vary depending on deployment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Intellectual Property</h2>
            <p>
              JsonInspect is an open source project. The source code is available on GitHub under the applicable open source license.
            </p>
            <p>
              Unless otherwise specified, the code and content are provided as-is for use and modification according to the project&apos;s license.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. Data Processing</h2>
            <p>
              <strong className="text-emerald-300">Important:</strong> JsonInspect operates entirely client-side. All JSON data processing occurs in your browser. No data is transmitted to any server.
            </p>
            <p>
              The application may use browser localStorage to persist your JSON inputs locally on your device for convenience. This data remains on your device and is never shared.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Limitation of Liability</h2>
            <p>
              JsonInspect is provided &quot;as is&quot; without warranty of any kind. The developers and contributors are not liable for any damages resulting from the use of this tool.
            </p>
            <p>
              Users are responsible for ensuring the security and privacy of their own data when using this tool.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Contact</h2>
            <p>
              For questions regarding this legal notice, please open an issue on the{" "}
              <a
                href="https://github.com/XyDisorder/json-lens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 transition hover:text-emerald-200"
              >
                GitHub repository
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <Link
            href="/fieldlens"
            className="text-sm text-emerald-300 transition hover:text-emerald-200"
          >
            ← Back to JsonInspect
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

