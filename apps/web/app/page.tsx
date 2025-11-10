import type { Metadata } from "next";
import Script from "next/script";

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
      <main>
        <h1>BlueprintForDev</h1>
        <p>Your AI-powered development project blueprint generator</p>
      </main>
    </>
  );
}
