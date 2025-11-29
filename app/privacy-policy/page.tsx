import Link from "next/link";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Privacy Policy — JsonLens",
  description: "Privacy policy for JsonLens",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/fieldlens"
          className="mb-8 inline-block text-sm text-emerald-300 transition hover:text-emerald-200"
        >
          ← Back to JsonLens
        </Link>

        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
          <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-6 text-sm text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
            <p>
              JsonLens is committed to protecting your privacy. This Privacy Policy explains how we handle data when you use our service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Client-Side Processing</h2>
            <p>
              <strong className="text-emerald-300">JsonLens operates 100% client-side.</strong> All JSON data processing occurs entirely in your web browser. No data is transmitted to our servers or any third-party servers.
            </p>
            <p>
              This means:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Your JSON data never leaves your device</li>
              <li>No data is collected, stored, or analyzed by us</li>
              <li>No tracking or analytics on your data</li>
              <li>No cookies are used for tracking purposes</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Local Storage</h2>
            <p>
              JsonLens uses browser localStorage to save your JSON inputs locally on your device. This feature:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Stores data only on your device</li>
              <li>Is never transmitted to any server</li>
              <li>Can be cleared at any time through your browser settings</li>
              <li>Is used solely for your convenience</li>
            </ul>
            <p>
              You can disable this feature by clearing your browser&apos;s localStorage for this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. No Personal Data Collection</h2>
            <p>
              We do not collect, store, or process any personal data. We do not:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Require user registration or accounts</li>
              <li>Collect email addresses or contact information</li>
              <li>Track user behavior or usage patterns</li>
              <li>Use third-party analytics or tracking services</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Third-Party Services</h2>
            <p>
              JsonLens may be hosted on platforms (such as Vercel, Netlify, or GitHub Pages) that may collect standard web server logs (IP addresses, access times). These logs are standard for web hosting and are not used by JsonLens for any purpose.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Your Rights</h2>
            <p>
              Since we do not collect personal data, there is no personal data to access, modify, or delete. All data processing happens on your device, and you have full control over it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top indicates when changes were made.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">8. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please open an issue on the{" "}
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
            ← Back to JsonLens
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

