import type { Metadata } from "next";
import Layout from "@/app/components/Layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for BlueprintForDev - Read our terms and conditions for using our service.",
};

export default function TermsOfService() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <article className="prose prose-sm sm:prose max-w-none">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">
            Terms of Service
          </h1>

          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and BlueprintForDev ("we," "us," "our," or "Company"), concerning your access to and use of the BlueprintForDev website and all related applications, services, tools, and materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              2. Intellectual Property Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              3. User Representations
            </h2>
            <p className="text-muted-foreground mb-4">
              By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>All registration information you submit is true, accurate, and current</li>
              <li>You will maintain the confidentiality of your account information and password</li>
              <li>You are responsible for all activity that occurs under your account</li>
              <li>You will not use the Site for any illegal or unauthorized purpose</li>
              <li>Your use of the Site will not violate any applicable law or regulation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              4. User Contributions
            </h2>
            <p className="text-muted-foreground mb-4">
              The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              5. Contribution License
            </h2>
            <p className="text-muted-foreground mb-4">
              By posting your Contributions to any part of the Site, you automatically grant us, and authorize us to sublicense to others, an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right to use, copy, reproduce, fix, adapt, modify, create derivative works from, make available, perform, send, transmit, display, publish, distribute, and sublicense the Contributions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-muted-foreground mb-4">
              The Site is provided on an "AS-IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the Site. To the fullest extent permissible pursuant to applicable law, we disclaim all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              In no event shall BlueprintForDev or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BlueprintForDev's website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              8. Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: legal@blueprintfordev.xyz
            </p>
          </section>
        </article>
      </div>
    </Layout>
  );
}

