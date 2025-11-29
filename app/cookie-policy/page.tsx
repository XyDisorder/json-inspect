import Link from "next/link";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Cookie Policy — FieldLens",
  description: "Cookie policy for FieldLens",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/fieldlens"
          className="mb-8 inline-block text-sm text-emerald-300 transition hover:text-emerald-200"
        >
          ← Back to FieldLens
        </Link>

        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold text-white">Cookie Policy</h1>
          <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-6 text-sm text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
            <p>
              This Cookie Policy explains how FieldLens uses cookies and similar technologies. FieldLens is designed with privacy in mind and uses minimal tracking technologies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit a website. They are commonly used to remember your preferences and improve your browsing experience.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Cookies Used by FieldLens</h2>
            <p>
              <strong className="text-emerald-300">FieldLens does not use cookies for tracking or analytics purposes.</strong>
            </p>
            <p>
              However, FieldLens uses browser localStorage (not cookies) to:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Save your JSON inputs locally on your device</li>
              <li>Remember your preferences (such as panel layout mode)</li>
            </ul>
            <p>
              This data:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Is stored only on your device</li>
              <li>Is never transmitted to any server</li>
              <li>Can be cleared at any time through your browser settings</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. Third-Party Cookies</h2>
            <p>
              FieldLens does not use third-party cookies or tracking services. We do not integrate with:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Analytics services (Google Analytics, etc.)</li>
              <li>Advertising networks</li>
              <li>Social media tracking pixels</li>
              <li>Any other third-party tracking technologies</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Hosting Platform Cookies</h2>
            <p>
              If FieldLens is hosted on platforms like Vercel, Netlify, or similar services, these platforms may set essential cookies for:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Security and authentication</li>
              <li>Load balancing</li>
              <li>Performance optimization</li>
            </ul>
            <p>
              These cookies are set by the hosting platform, not by FieldLens, and are standard for web hosting services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Managing Cookies and Local Storage</h2>
            <p>
              You can manage or clear localStorage data at any time:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Chrome/Edge:</strong> DevTools → Application → Local Storage
              </li>
              <li>
                <strong>Firefox:</strong> DevTools → Storage → Local Storage
              </li>
              <li>
                <strong>Safari:</strong> DevTools → Storage → Local Storage
              </li>
            </ul>
            <p>
              Clearing localStorage will remove your saved JSON inputs and preferences.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. The &quot;Last updated&quot; date at the top indicates when changes were made.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">8. Contact</h2>
            <p>
              If you have questions about this Cookie Policy, please open an issue on the{" "}
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
            ← Back to FieldLens
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

