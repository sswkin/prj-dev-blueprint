import type { Metadata } from "next";
import Layout from "@/app/components/Layout";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the perfect plan for your development project needs. Flexible pricing options for individuals, teams, and enterprises.",
};

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  buttonVariant: "outline" | "default";
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "Free",
    description:
      "Perfect for individual developers getting started with project planning",
    features: [
      "1 project blueprint per month",
      "Basic architecture templates",
      "Standard component planning",
      "Community support",
      "Basic documentation export",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    name: "Professional",
    price: "$29",
    description: "Ideal for professional developers and small teams",
    features: [
      "Unlimited project blueprints",
      "Advanced architecture generation",
      "Database design guidance",
      "Implementation roadmaps",
      "Priority email support",
      "PDF & Markdown export",
      "Custom templates",
      "Version history",
    ],
    highlighted: true,
    buttonText: "Start Free Trial",
    buttonVariant: "default",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams and organizations with advanced needs",
    features: [
      "Everything in Professional",
      "Team collaboration tools",
      "Custom integrations",
      "Advanced security features",
      "Dedicated support manager",
      "On-premise deployment option",
      "Custom training sessions",
      "SLA guarantee",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
  },
];

const faqs = [
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, we offer a 14-day free trial for both Professional and Enterprise plans. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. Contact support for assistance with refunds.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
];

export default function PricingPage() {
  return (
    <Layout>
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the perfect plan for your development needs. Start free,
              upgrade when you&apos;re ready.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-20">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-8 shadow-sm ${
                  tier.highlighted
                    ? "border-primary bg-card"
                    : "border-border bg-card"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {tier.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-foreground">
                      {tier.price}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      <span className="ml-3 text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    tier.buttonVariant === "default"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of developers who use BlueprintForDev to plan and
                execute their projects more effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                  Start Free Trial
                </button>
                <button className="rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
