import type { Metadata } from "next";
import Layout from "@/app/components/Layout";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stay updated with the latest insights, tips, and news about development project planning and BlueprintForDev.",
};

export default function Blog() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            BlueprintForDev Blog
          </h1>
          <p className="text-lg text-muted-foreground leading-8 max-w-2xl mx-auto">
            Discover the latest insights, best practices, and updates in development project planning, architecture design, and AI-powered development tools.
          </p>
        </section>

        {/* Featured Article */}
        <section className="mb-16">
          <div className="rounded-lg border border-border bg-card p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                Featured
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The Future of AI-Powered Project Planning
            </h2>
            <p className="text-muted-foreground mb-6">
              Explore how artificial intelligence is revolutionizing the way developers approach project planning, architecture design, and implementation strategies.
            </p>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <span>BlueprintForDev Team</span>
              <span className="mx-2">•</span>
              <span>November 10, 2025</span>
              <span className="mx-2">•</span>
              <span>8 min read</span>
            </div>
            <a
              href="#featured-article"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
            >
              Read Article
            </a>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "10 Best Practices for Modern Web Application Architecture",
                excerpt: "Learn the essential principles and patterns for building scalable, maintainable web applications that stand the test of time.",
                author: "Alex Chen",
                date: "November 8, 2025",
                readTime: "6 min read",
                category: "Architecture",
              },
              {
                title: "Database Design Patterns Every Developer Should Know",
                excerpt: "Discover proven database design patterns that can help you build more efficient and scalable data structures.",
                author: "Sarah Johnson",
                date: "November 5, 2025",
                readTime: "7 min read",
                category: "Database",
              },
              {
                title: "From Idea to Production: A Complete Development Workflow",
                excerpt: "Step-by-step guide to taking your project from initial concept to successful deployment using modern tools and practices.",
                author: "Mike Rodriguez",
                date: "November 3, 2025",
                readTime: "10 min read",
                category: "Development",
              },
              {
                title: "Component Library Planning: Building for Reusability",
                excerpt: "How to plan and architect component libraries that promote consistency and speed up development across your team.",
                author: "Emily Davis",
                date: "November 1, 2025",
                readTime: "5 min read",
                category: "Components",
              },
              {
                title: "AI in Development: Complementary Intelligence, Not Replacement",
                excerpt: "Understanding how AI tools can enhance developer productivity without replacing the human creativity and judgment that drives innovation.",
                author: "David Park",
                date: "October 28, 2025",
                readTime: "9 min read",
                category: "AI",
              },
              {
                title: "Project Blueprint Templates: Accelerating Your Development Process",
                excerpt: "How to leverage project templates and blueprints to reduce setup time and focus on what matters most: building great software.",
                author: "Lisa Wang",
                date: "October 25, 2025",
                readTime: "4 min read",
                category: "Templates",
              },
            ].map((post, index) => (
              <article
                key={index}
                className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Architecture", count: 12, color: "bg-blue-100 text-blue-800" },
              { name: "Development", count: 18, color: "bg-green-100 text-green-800" },
              { name: "Database", count: 8, color: "bg-purple-100 text-purple-800" },
              { name: "Components", count: 15, color: "bg-orange-100 text-orange-800" },
              { name: "AI", count: 10, color: "bg-pink-100 text-pink-800" },
              { name: "Templates", count: 6, color: "bg-indigo-100 text-indigo-800" },
              { name: "Best Practices", count: 20, color: "bg-yellow-100 text-yellow-800" },
              { name: "Tools", count: 14, color: "bg-red-100 text-red-800" },
            ].map((category) => (
              <a
                key={category.name}
                href={`#category-${category.name.toLowerCase()}`}
                className="block p-4 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <div className="text-center">
                  <div className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 ${category.color}`}>
                    {category.name}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category.count} articles
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest articles, tips, and updates on development project planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}