import type { Metadata } from "next";
import Layout from "@/app/components/Layout";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore BlueprintForDev's comprehensive features for AI-powered project planning, architecture design, and development guidance.",
};

export default function Features() {
  const mainFeatures = [
    {
      title: "Project Architecture Generation",
      description:
        "Automatically generate comprehensive architecture diagrams and technical specifications tailored to your project needs.",
      details: [
        "Visual architecture diagrams with component relationships",
        "Technology stack recommendations based on project requirements",
        "Scalability and performance considerations",
        "Security architecture patterns",
        "Integration guidelines and API design",
      ],
      icon: "🏗️",
    },
    {
      title: "Component Library Planning",
      description:
        "Get intelligent recommendations for organizing your component structure with best practices and reusability in mind.",
      details: [
        "Hierarchical component organization",
        "Reusable component identification",
        "State management strategies",
        "Props and data flow patterns",
        "Component testing guidelines",
      ],
      icon: "🧩",
    },
    {
      title: "Database Design Guidance",
      description:
        "Receive expert guidance on database schema design, relationships, and optimization strategies.",
      details: [
        "Entity-relationship diagrams",
        "Database normalization recommendations",
        "Indexing and query optimization",
        "Migration strategies",
        "Performance monitoring setup",
      ],
      icon: "🗄️",
    },
    {
      title: "Implementation Roadmaps",
      description:
        "Get step-by-step implementation plans with clear milestones, deliverables, and timeline estimates.",
      details: [
        "Phased development approach",
        "Task breakdown with time estimates",
        "Dependencies and critical path analysis",
        "Risk assessment and mitigation strategies",
        "Quality gates and testing milestones",
      ],
      icon: "🗺️",
    },
    {
      title: "Best Practices & Standards",
      description:
        "Follow industry-standard best practices and coding conventions specific to your technology stack.",
      details: [
        "Code organization standards",
        "Naming conventions and style guides",
        "Error handling patterns",
        "Security best practices",
        "Performance optimization techniques",
      ],
      icon: "⭐",
    },
    {
      title: "AI-Powered Insights",
      description:
        "Leverage cutting-edge AI to get intelligent recommendations and make data-driven decisions.",
      details: [
        "Intelligent technology stack recommendations",
        "Predictive project timeline estimation",
        "Automated code review suggestions",
        "Performance bottleneck identification",
        "Architecture improvement recommendations",
      ],
      icon: "🤖",
    },
  ];

  const additionalFeatures = [
    {
      title: "Multi-Framework Support",
      description:
        "Support for popular frameworks including React, Vue, Angular, Next.js, Nuxt, and more.",
    },
    {
      title: "Cloud Integration",
      description:
        "Guidance for AWS, Azure, GCP deployment strategies and infrastructure as code.",
    },
    {
      title: "Team Collaboration",
      description:
        "Features designed for team workflows, including version control integration and code review processes.",
    },
    {
      title: "Documentation Generation",
      description:
        "Automatic generation of technical documentation, API specs, and developer guides.",
    },
    {
      title: "Testing Strategy",
      description:
        "Comprehensive testing recommendations including unit, integration, and end-to-end testing approaches.",
    },
    {
      title: "DevOps Integration",
      description:
        "CI/CD pipeline recommendations and deployment automation strategies.",
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Comprehensive Features for Modern Development
          </h1>
          <p className="text-lg text-muted-foreground leading-8 max-w-3xl mx-auto">
            Discover how BlueprintForDev empowers developers with AI-powered
            tools for every aspect of project planning, from initial
            architecture design to final implementation guidance.
          </p>
        </section>

        {/* Main Features Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Core Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to plan, design, and implement your next
              project
            </p>
          </div>

          <div className="space-y-12">
            {mainFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="flex flex-col lg:flex-row gap-8 items-start"
              >
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{feature.icon}</span>
                    <h3 className="text-2xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="lg:w-2/3">
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Additional Capabilities
            </h2>
            <p className="text-lg text-muted-foreground">
              Extended features to support your entire development workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6 text-center">
              Why Choose BlueprintForDev?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Save Time",
                  description: "Reduce project planning time by up to 70%",
                  icon: "⏰",
                },
                {
                  title: "Improve Quality",
                  description: "Follow proven best practices and patterns",
                  icon: "🏆",
                },
                {
                  title: "Scale Confidently",
                  description: "Design for growth from the start",
                  icon: "📈",
                },
                {
                  title: "Reduce Risk",
                  description: "Avoid common architectural mistakes",
                  icon: "🛡️",
                },
              ].map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Experience These Features?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start creating comprehensive project blueprints with our
              AI-powered platform. Join thousands of developers who trust
              BlueprintForDev for their project planning needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#get-started"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
              >
                Start Free Trial
              </a>
              <a
                href="/about"
                className="inline-block px-6 py-3 border border-border text-foreground font-semibold rounded-md hover:bg-accent transition-colors"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
