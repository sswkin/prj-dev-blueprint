import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Home",
  description: "Generate comprehensive development project blueprints with architecture, components, database design, and implementation guidance.",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BlueprintForDev",
    description: "Generate comprehensive development project blueprints with architecture, components, database design, and implementation guidance. Streamline your development process with AI-powered project planning.",
    url: "https://blueprintfordev.xyz",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "BlueprintForDev Team",
    },
    featureList: [
      "Project architecture generation",
      "Component library planning",
      "Database design guidance",
      "Implementation roadmaps",
      "Best practices recommendations"
    ],
    screenshot: "https://blueprintfordev.xyz/assets/og-image.png",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "BlueprintForDev",
      description: "AI-powered development project blueprint generator"
    }
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header sticky={true} />

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="py-20 sm:py-32">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                  BlueprintForDev
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Your AI-powered development project blueprint generator
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#get-started"
                    className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
                  >
                    Get started
                  </a>
                  <a
                    href="#learn-more"
                    className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 sm:py-24">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Everything you need to plan your project
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Generate comprehensive development blueprints with AI-powered guidance
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-5xl">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Project Architecture",
                      description: "Generate comprehensive architecture diagrams and technical specifications for your project.",
                    },
                    {
                      title: "Component Library",
                      description: "Plan and organize your component structure with best practices and reusability in mind.",
                    },
                    {
                      title: "Database Design",
                      description: "Get guidance on database schema design, relationships, and optimization strategies.",
                    },
                    {
                      title: "Implementation Roadmaps",
                      description: "Receive step-by-step implementation plans with clear milestones and deliverables.",
                    },
                    {
                      title: "Best Practices",
                      description: "Follow industry-standard best practices and coding conventions for your tech stack.",
                    },
                    {
                      title: "AI-Powered",
                      description: "Leverage AI to streamline your development process and make informed decisions.",
                    },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
