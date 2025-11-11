import type { Metadata } from "next";
import Layout from "@/app/components/Layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for BlueprintForDev - Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <article className="prose prose-sm sm:prose max-w-none">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">
            Privacy Policy
          </h1>

          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              1. Introduction
            </h2>
            <p className="text-muted-foreground mb-4">
              BlueprintForDev ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-muted-foreground mb-4">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Personal Data:</strong> Name, email address, and other information you voluntarily provide</li>
              <li><strong>Device Information:</strong> Browser type, IP address, and operating system</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and links clicked</li>
              <li><strong>Cookies:</strong> Information stored on your device for site functionality and analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              3. Use of Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Generate a personal profile about you so that future visits to the Site will be personalized</li>
              <li>Increase the efficiency and operation of the Site</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site</li>
              <li>Notify you of updates to the Site</li>
              <li>Offer new products, services, and/or recommendations to you</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              4. Disclosure of Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We may share information we have collected about you in certain situations:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>By Law or to Protect Rights:</strong> If required by law or if we believe in good faith that disclosure is necessary</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with vendors, consultants, and service providers</li>
              <li><strong>Business Transfers:</strong> Your information may be transferred as part of a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              5. Security of Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use administrative, technical, and physical security measures to help protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              6. Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: privacy@blueprintfordev.xyz
            </p>
          </section>
        </article>
      </div>
    </Layout>
  );
}

