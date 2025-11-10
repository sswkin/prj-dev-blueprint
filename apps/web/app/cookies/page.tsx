import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for BlueprintForDev - Learn how we use cookies and similar technologies.",
};

export default function CookiePolicy() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header sticky={true} />

        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <article className="prose prose-sm sm:prose max-w-none">
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">
                Cookie Policy
              </h1>

              <p className="text-muted-foreground mb-6">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  1. What Are Cookies?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  2. How We Use Cookies
                </h2>
                <p className="text-muted-foreground mb-4">
                  BlueprintForDev uses cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be switched off</li>
                  <li><strong>Performance Cookies:</strong> These cookies collect information about how you use our website, such as which pages you visit most often</li>
                  <li><strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization</li>
                  <li><strong>Targeting Cookies:</strong> These cookies are used to deliver advertisements relevant to you and your interests</li>
                  <li><strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  3. Types of Cookies We Use
                </h2>
                <p className="text-muted-foreground mb-4">
                  <strong>Session Cookies:</strong> These are temporary cookies that expire once you close your browser. They are used to remember information about your visit while you are browsing the website.
                </p>
                <p className="text-muted-foreground mb-4">
                  <strong>Persistent Cookies:</strong> These cookies remain on your device for a set period of time or until you delete them manually. They are used to remember your preferences and login information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  4. Third-Party Cookies
                </h2>
                <p className="text-muted-foreground mb-4">
                  We may allow third-party service providers to place cookies on your device for analytics, advertising, and other purposes. These third parties may collect information about your online activities across different websites.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  5. Your Cookie Choices
                </h2>
                <p className="text-muted-foreground mb-4">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>View what cookies have been set and delete them</li>
                  <li>Block cookies from being set in the future</li>
                  <li>Set your browser to alert you when cookies are being set</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  Please note that disabling cookies may affect the functionality of our website and your user experience.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  6. Do Not Track
                </h2>
                <p className="text-muted-foreground mb-4">
                  Some browsers include a "Do Not Track" feature. Currently, there is no industry standard for recognizing Do Not Track signals, and BlueprintForDev does not respond to Do Not Track browser signals.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  7. Updates to This Policy
                </h2>
                <p className="text-muted-foreground mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  8. Contact Us
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about our use of cookies, please contact us at:
                </p>
                <p className="text-muted-foreground">
                  Email: cookies@blueprintfordev.xyz
                </p>
              </section>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

