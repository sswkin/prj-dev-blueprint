import type { Metadata } from "next";
import Layout from "@/app/components/Layout";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about BlueprintForDev - Our mission, vision, and the team behind the platform.",
};

export default function About() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            About BlueprintForDev
          </h1>
          <p className="text-lg text-muted-foreground leading-8">
            BlueprintForDev is an AI-powered platform designed to streamline the development process by generating comprehensive project blueprints. We believe that every developer deserves access to professional-grade project planning tools.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-8 mb-4">
            Our mission is to empower developers and teams by providing intelligent tools that accelerate project planning and architecture design. We aim to reduce the time spent on initial project setup and allow developers to focus on what they do best: writing great code.
          </p>
          <p className="text-lg text-muted-foreground leading-8">
            By leveraging artificial intelligence and industry best practices, we help teams make informed decisions about their project structure, technology stack, and implementation roadmap.
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-muted-foreground leading-8">
            We envision a future where project planning is no longer a bottleneck in software development. Our vision is to create a world where developers can instantly generate professional blueprints for any project, regardless of complexity or scale.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Innovation",
                description: "We continuously push the boundaries of what's possible with AI and development tools.",
              },
              {
                title: "Quality",
                description: "We are committed to delivering high-quality blueprints and guidance that developers can trust.",
              },
              {
                title: "Accessibility",
                description: "We believe powerful tools should be accessible to developers of all skill levels.",
              },
              {
                title: "Community",
                description: "We value feedback from our community and continuously improve based on user needs.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
            What We Offer
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Project Architecture Generation",
                description: "Automatically generate comprehensive architecture diagrams and technical specifications tailored to your project needs.",
              },
              {
                title: "Component Library Planning",
                description: "Get intelligent recommendations for organizing your component structure with best practices and reusability in mind.",
              },
              {
                title: "Database Design Guidance",
                description: "Receive expert guidance on database schema design, relationships, and optimization strategies.",
              },
              {
                title: "Implementation Roadmaps",
                description: "Get step-by-step implementation plans with clear milestones, deliverables, and timeline estimates.",
              },
              {
                title: "Best Practices",
                description: "Follow industry-standard best practices and coding conventions specific to your technology stack.",
              },
              {
                title: "AI-Powered Insights",
                description: "Leverage cutting-edge AI to get intelligent recommendations and make data-driven decisions.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="border-l-4 border-primary pl-6 py-2"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of developers using BlueprintForDev to streamline their project planning.
          </p>
          <a
            href="#get-started"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Creating Blueprints
          </a>
        </section>
      </div>
    </Layout>
  );
}

