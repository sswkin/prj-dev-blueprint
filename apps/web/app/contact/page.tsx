import type { Metadata } from "next";
import Layout from "@/app/components/Layout";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the BlueprintForDev team. We'd love to hear from you.",
};

export default function Contact() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions or feedback? We'd love to hear from you. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Email */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Email
              </h3>
              <p className="text-muted-foreground">
                <a
                  href="mailto:hello@blueprintfordev.xyz"
                  className="hover:text-primary transition-colors"
                >
                  hello@blueprintfordev.xyz
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                We typically respond within 24 hours
              </p>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Support
              </h3>
              <p className="text-muted-foreground">
                <a
                  href="mailto:support@blueprintfordev.xyz"
                  className="hover:text-primary transition-colors"
                >
                  support@blueprintfordev.xyz
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                For technical support and issues
              </p>
            </div>

            {/* Sales */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Sales
              </h3>
              <p className="text-muted-foreground">
                <a
                  href="mailto:sales@blueprintfordev.xyz"
                  className="hover:text-primary transition-colors"
                >
                  sales@blueprintfordev.xyz
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                For enterprise inquiries
              </p>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#twitter"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.678 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#github"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="border-t border-border pt-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "What is BlueprintForDev?",
                answer: "BlueprintForDev is an AI-powered platform that helps developers generate comprehensive project blueprints, including architecture, components, database design, and implementation roadmaps.",
              },
              {
                question: "How long does it take to generate a blueprint?",
                answer: "Most blueprints are generated within minutes. The time depends on the complexity of your project and the level of detail you require.",
              },
              {
                question: "Can I customize the generated blueprints?",
                answer: "Yes! All generated blueprints are fully customizable. You can modify any section to match your specific requirements and preferences.",
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes, we offer a free trial so you can explore BlueprintForDev and see how it can help your projects.",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-border pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

