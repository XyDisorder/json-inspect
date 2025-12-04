import Link from "next/link";
import Footer from "@/components/ui/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for JsonInspect. Learn about the usage terms, open source license, and user responsibilities for this free JSON tool.",
  keywords: ["JsonInspect terms", "terms of service", "usage terms", "open source license"],
  openGraph: {
    title: "Terms of Service — JsonInspect",
    description: "Terms of service for JsonInspect. Open source software provided as-is for free use.",
    type: "website",
    url: "/terms-of-service",
  },
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
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
          <h1 className="text-3xl font-semibold text-white">Terms of Service</h1>
          <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-6 text-sm text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using JsonInspect, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Description of Service</h2>
            <p>
              JsonInspect is a free, open-source developer tool that allows users to inspect, analyze, and transform JSON data entirely within their web browser.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Use License</h2>
            <p>
              JsonInspect is provided as open source software. You are free to:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Use the service for any purpose</li>
              <li>Modify the source code</li>
              <li>Distribute the software</li>
            </ul>
            <p>
              Subject to the terms of the applicable open source license (see the GitHub repository for details).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. Disclaimer</h2>
            <p>
              JsonInspect is provided &quot;as is&quot; without any warranties, expressed or implied. We do not guarantee:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>That the service will be uninterrupted or error-free</li>
              <li>That the results will be accurate or reliable</li>
              <li>That any defects will be corrected</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Limitation of Liability</h2>
            <p>
              In no event shall JsonInspect, its developers, or contributors be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use JsonInspect.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. User Responsibilities</h2>
            <p>
              You are responsible for:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Ensuring the security and privacy of your own data</li>
              <li>Using the service in compliance with applicable laws</li>
              <li>Not using the service for illegal purposes</li>
              <li>Verifying the accuracy of results for your use case</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. Data and Privacy</h2>
            <p>
              JsonInspect processes all data client-side. You retain full control and responsibility for your data. We do not collect, store, or process your JSON data on our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">8. Modifications</h2>
            <p>
              We reserve the right to modify or discontinue the service at any time without notice. We may also update these Terms of Service from time to time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">9. Contact</h2>
            <p>
              For questions about these Terms of Service, please open an issue on the{" "}
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

