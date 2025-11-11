# Vite to Next.js Migration Best Practices Guide

**Meta Description:** Master best practices for Vite to Next.js migration with our expert guidelines. Learn optimal project structure, performance optimization, SEO strategies, and development workflow best practices for seamless migration success.

**Keywords:** vite to nextjs best practices, nextjs migration guidelines, nextjs performance optimization, nextjs seo best practices, react to nextjs migration tips, nextjs development workflow, nextjs project structure

## Table of Contents

- [Project Structure and Organization](#project-structure)
- [Performance Optimization Strategies](#performance-optimization)
- [SEO and Metadata Best Practices](#seo-practices)
- [Code Quality and Development Workflow](#code-quality)
- [Testing and Quality Assurance](#testing-practices)
- [Security and Production Readiness](#security-practices)
- [Deployment and DevOps](#deployment-practices)
- [Maintenance and Long-term Strategy](#maintenance-strategy)

## Project Structure and Organization {#project-structure}

### 1. Recommended Directory Structure

#### Optimal Next.js App Router Structure

```
your-nextjs-project/
├── app/                          # App Router
│   ├── (marketing)/             # Route groups for organization
│   │   ├── page.tsx            # Home page (/)
│   │   ├── about/
│   │   │   └── page.tsx        # About page (/about)
│   │   └── contact/
│   │       └── page.tsx        # Contact page (/contact)
│   ├── (app)/                  # Authenticated app routes
│   │   ├── dashboard/
│   │   │   ├── page.tsx        # Dashboard (/dashboard)
│   │   │   ├── layout.tsx      # Dashboard-specific layout
│   │   │   └── settings/
│   │   │       └── page.tsx    # Settings (/dashboard/settings)
│   │   └── profile/
│   │       └── page.tsx        # Profile (/profile)
│   ├── api/                    # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts    # Auth routes
│   │   ├── users/
│   │   │   ├── route.ts        # GET/POST /api/users
│   │   │   └── [id]/
│   │   │       └── route.ts    # /api/users/:id
│   │   └── webhooks/
│   │       └── route.ts        # Webhook handlers
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── loading.tsx             # Global loading UI
│   ├── error.tsx               # Global error UI
│   └── not-found.tsx           # 404 page
├── src/
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── layout/             # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── navigation.tsx
│   │   ├── forms/              # Form components
│   │   │   ├── contact-form.tsx
│   │   │   ├── newsletter-form.tsx
│   │   │   └── ...
│   │   └── features/           # Feature-specific components
│   │       ├── auth/
│   │       ├── dashboard/
│   │       └── blog/
│   ├── lib/                    # Utility libraries
│   │   ├── auth.ts             # Authentication logic
│   │   ├── db.ts               # Database connection
│   │   ├── utils.ts            # General utilities
│   │   ├── validations.ts      # Zod schemas
│   │   ├── constants.ts        # App constants
│   │   └── types.ts            # TypeScript types
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   ├── useLocalStorage.ts
│   │   └── ...
│   ├── services/               # External service integrations
│   │   ├── api.ts              # API client
│   │   ├── supabase.ts         # Supabase client
│   │   └── analytics.ts        # Analytics service
│   └── styles/                 # Additional styles
│       ├── components/         # Component-specific styles
│       └── utilities.css       # Utility classes
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── og-image.jpg
│   └── ...
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest testing configuration
├── .eslintrc.json              # ESLint configuration
└── package.json
```

### 2. Route Group Organization

**Using Route Groups for Better Organization:**

```typescript
// app/(marketing)/layout.tsx
// Public-facing pages with marketing-focused layout
export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </div>
  );
}

// app/(app)/layout.tsx
// Authenticated app pages with dashboard-focused layout
export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### 3. Component Organization Best Practices

#### Component Hierarchy

```typescript
// src/components/ui/button.tsx - Base UI component
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// src/components/forms/submit-button.tsx - Feature-specific component
import { Button } from '@/components/ui/button';
export interface SubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export function SubmitButton({ isLoading, children }: SubmitButtonProps) {
  return (
    <Button variant="primary" disabled={isLoading}>
      {isLoading ? 'Submitting...' : children}
    </Button>
  );
}

// Usage in pages
<SubmitButton isLoading={isSubmitting}>
  Create Account
</SubmitButton>
```

#### Shared Component Library Structure

```typescript
// src/components/ui/
├── button/
│   ├── button.tsx           # Base button component
│   ├── button.stories.tsx   # Storybook stories
│   └── button.test.tsx      # Unit tests
├── input/
│   ├── input.tsx
│   ├── input.stories.tsx
│   └── input.test.tsx
└── card/
    ├── card.tsx
    ├── card.stories.tsx
    └── card.test.tsx
```

## Performance Optimization Strategies {#performance-optimization}

### 1. Bundle Optimization

#### Code Splitting Best Practices

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

// ❌ Incorrect - imports on page load
import ChartComponent from '@/components/heavy/Chart';

// ✅ Correct - lazy loading
const ChartComponent = dynamic(() => import('@/components/heavy/Chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Disable SSR for client-heavy components
});

// Route-based code splitting
// Next.js automatically splits code by routes
// pages/about/page.tsx → separate bundle
```

#### Bundle Analysis and Monitoring

```javascript
// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  webpack: (config, { dev, isServer }) => {
    // Add bundle analyzer plugin
    if (process.env.ANALYZE === "true") {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          reportFilename: "bundle-report.html",
        }),
      );
    }

    return config;
  },
});
```

**Package.json scripts for bundle analysis:**

```json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "build": "next build",
    "dev": "next dev",
    "lint": "next lint",
    "test": "jest",
    "type-check": "tsc --noEmit"
  }
}
```

### 2. Image Optimization

#### Proper Image Configuration

```typescript
// next.config.js
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

// components/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      priority={priority}
      className={`transition-opacity duration-300 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      } ${className}`}
      onLoad={() => setIsLoading(false)}
      onError={() => setImageError(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
```

### 3. Caching Strategies

#### Static Asset Caching

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache images for 1 month
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2628000, stale-while-revalidate",
          },
        ],
      },
      {
        // Cache API responses for 5 minutes
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=300, stale-while-revalidate=600",
          },
        ],
      },
    ];
  },
};
```

#### Data Caching with Revalidation

```typescript
// lib/data/blog.ts
export async function getBlogPosts(): Promise<BlogPost[]> {
  // Cache for 1 hour, revalidate in background
  const revalidate = 3600;

  const posts = await fetch("https://api.example.com/posts", {
    next: { revalidate },
  });

  if (!posts.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  return posts.json();
}

// For real-time data, use shorter revalidation
export async function getNotifications(): Promise<Notification[]> {
  // Cache for 30 seconds
  const notifications = await fetch("https://api.example.com/notifications", {
    next: { revalidate: 30 },
  });

  return notifications.json();
}
```

### 4. Performance Monitoring

#### Core Web Vitals Tracking

```typescript
// components/WebVitals.tsx
'use client';

import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      url: window.location.pathname,
    }),
  });
}

export function WebVitals() {
  useEffect(() => {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }, []);

  return null;
}

// Add to app/layout.tsx
import { WebVitals } from '@/components/WebVitals';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <WebVitals />
      </body>
    </html>
  );
}
```

## SEO and Metadata Best Practices {#seo-practices}

### 1. Comprehensive Metadata Strategy

#### Base Metadata Configuration

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://yoursite.com"),
  title: {
    default: "Your Site Name",
    template: "%s | Your Site Name",
  },
  description: "Your site description for search engines",
  keywords: ["keyword1", "keyword2", "keyword3"],
  authors: [{ name: "Author Name", url: "https://yoursite.com" }],
  creator: "Your Company",
  publisher: "Your Company",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    siteName: "Your Site Name",
    title: "Your Site Name",
    description: "Your site description",
    images: [
      {
        url: "https://yoursite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Site Name",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Site Name",
    description: "Your site description",
    images: ["https://yoursite.com/twitter-image.jpg"],
    creator: "@yourtwitter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};
```

#### Dynamic Metadata for Pages

```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://yoursite.com/blog/${params.slug}`,
      siteName: "Your Site Name",
      images: [
        {
          url: post.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.twitterImage],
      creator: "@yourtwitter",
    },
    alternates: {
      canonical: `https://yoursite.com/blog/${params.slug}`,
    },
  };
}
```

### 2. Structured Data Implementation

#### Comprehensive Schema Markup

```typescript
// components/StructuredData.tsx
import { Metadata } from 'next';

interface StructuredDataProps {
  type: 'article' | 'website' | 'organization' | 'breadcrumb';
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';

  const schemas = {
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Your Site Name',
      url: baseUrl,
      description: 'Your site description',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Your Company',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        contactType: 'customer service',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Main St',
        addressLocality: 'City',
        addressRegion: 'State',
        postalCode: '12345',
        addressCountry: 'US',
      },
    },
    article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      description: data.description,
      image: data.image,
      author: {
        '@type': 'Person',
        name: data.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Your Company',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': data.url,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas[type]),
      }}
    />
  );
}

// Usage in components
<StructuredData
  type="website"
  data={{}}
/>

<StructuredData
  type="article"
  data={{
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: post.author,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    url: `${baseUrl}/blog/${post.slug}`,
  }}
/>
```

#### Breadcrumb Implementation

```typescript
// components/Breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {items.map((item, index) => (
          <li key={item.href || index}>
            <div className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="h-5 w-5 text-gray-400 mr-4" />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm font-medium text-gray-900">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

### 3. SEO-Optimized Content Structure

#### Content Hierarchy Best Practices

```typescript
// app/blog/[slug]/page.tsx
export default function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumbs for navigation */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Article header with structured data */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {post.excerpt}
        </p>

        {/* Author and date info */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Main content with proper heading hierarchy */}
      <div className="prose prose-lg max-w-none">
        {/* Content will be rendered here with proper h2, h3, etc. */}
      </div>

      {/* Related articles */}
      <section className="mt-16 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <RelatedArticles currentPostId={post.id} />
      </section>
    </article>
  );
}
```

## Code Quality and Development Workflow {#code-quality}

### 1. TypeScript Configuration Best Practices

#### Comprehensive TypeScript Setup

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "es2020"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"]
    },
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### Type Definitions Organization

```typescript
// src/types/index.ts
// Export all types from a central location
export * from "./user";
export * from "./post";
export * from "./api";

// src/types/api.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// src/types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "admin" | "moderator";
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role?: "user" | "admin" | "moderator";
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: string;
}
```

### 2. ESLint and Code Standards

#### Comprehensive ESLint Configuration

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "next/typescript", "prettier"],
  "rules": {
    // TypeScript specific
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",

    // React specific
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "warn",

    // Next.js specific
    "@next/next/no-img-element": "error",
    "@next/next/no-html-link-for-pages": "error",

    // General code quality
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn",
    "no-debugger": "error",
    "no-duplicate-imports": "error",
    "no-unused-expressions": "error",

    // Accessibility
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/anchor-is-valid": "error"
  },
  "overrides": [
    {
      "files": ["*.test.ts", "*.test.tsx"],
      "env": {
        "jest": true
      },
      "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off"
      }
    }
  ]
}
```

#### Prettier Configuration

```json
// .prettierrc.json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "quoteProps": "as-needed",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 100
      }
    }
  ]
}
```

### 3. Git Workflow and Commit Standards

#### Git Hooks Configuration

```json
// .huskyrc
{
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "npm run test",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}

// lint-staged.config.js
module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'git add'
  ],
  '*.{json,md,yml,yaml}': [
    'prettier --write',
    'git add'
  ],
  '*.{css,scss}': [
    'stylelint --fix',
    'prettier --write',
    'git add'
  ]
};
```

#### Conventional Commits

```bash
# Commit message format
<type>[optional scope]: <description>

# Examples
feat(auth): add user registration endpoint
fix(api): resolve CORS issue in authentication
docs(readme): update installation instructions
style(button): adjust component spacing
refactor(auth): simplify token validation logic
test(user): add unit tests for user service
chore(deps): update Next.js to version 14
```

### 4. Development Environment Setup

#### Environment Configuration

```bash
# .env.example
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# External Services
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Analytics
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# Public Environment Variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

#### Development Scripts

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "analyze": "ANALYZE=true npm run build",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

## Testing and Quality Assurance {#testing-practices}

### 1. Testing Strategy

#### Comprehensive Test Setup

```javascript
// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapping: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "src/**/*.{js,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,ts,tsx}",
    "!src/styles/**",
    "!src/types/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ["text", "lcov", "html"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,ts,tsx}",
  ],
};

module.exports = createJestConfig(customJestConfig);
```

#### Testing Utilities and Helpers

```typescript
// jest.setup.js
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for Node.js
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} alt={props.alt || ''} />;
  },
}));

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
```

### 2. Component Testing Patterns

#### Comprehensive Component Tests

```typescript
// src/components/ui/button/Button.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('btn-primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('btn-secondary');

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('btn-outline');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Accessible Button</Button>);

    const button = screen.getByRole('button');

    // Test Enter key
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Test Space key
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('forwards additional props', () => {
    render(
      <Button
        data-testid="custom-button"
        aria-label="Custom button"
        disabled
      >
        Custom
      </Button>
    );

    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom button');
    expect(button).toBeDisabled();
  });
});
```

### 3. Integration Testing

#### API Route Testing

```typescript
// tests/api/users.test.ts
import { GET, POST } from "@/app/api/users/route";
import { GET as GET_USERS } from "@/lib/services/users";
import { createUser } from "@/lib/services/users";

// Mock the service functions
jest.mock("@/lib/services/users");

describe("/api/users", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("returns paginated users", async () => {
      const mockUsers = [
        { id: "1", name: "John Doe", email: "john@example.com" },
        { id: "2", name: "Jane Smith", email: "jane@example.com" },
      ];

      (GET_USERS as jest.Mock).mockResolvedValue(mockUsers);

      const request = new Request(
        "http://localhost:3000/api/users?page=1&limit=10",
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        success: true,
        data: mockUsers,
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
        },
      });
    });

    it("handles errors gracefully", async () => {
      (GET_USERS as jest.Mock).mockRejectedValue(new Error("Database error"));

      const request = new Request("http://localhost:3000/api/users");
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({
        error: "Failed to fetch users",
      });
    });
  });

  describe("POST", () => {
    it("creates a new user successfully", async () => {
      const userData = {
        name: "New User",
        email: "new@example.com",
        role: "user",
      };

      const mockUser = { id: "3", ...userData };
      (createUser as jest.Mock).mockResolvedValue(mockUser);

      const request = new Request("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual({
        success: true,
        data: mockUser,
      });
    });

    it("validates input data", async () => {
      const invalidData = {
        name: "", // Invalid: empty name
        email: "invalid-email", // Invalid: bad email format
      };

      const request = new Request("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Validation error");
      expect(data.details).toBeDefined();
    });
  });
});
```

### 4. End-to-End Testing

#### Playwright E2E Tests

```typescript
// e2e/auth.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test("user can register successfully", async ({ page }) => {
    await page.goto("/signup");

    await page.fill('[data-testid="name-input"]', "Test User");
    await page.fill('[data-testid="email-input"]', "test@example.com");
    await page.fill('[data-testid="password-input"]', "SecurePassword123");
    await page.fill(
      '[data-testid="confirm-password-input"]',
      "SecurePassword123",
    );

    await page.click('[data-testid="submit-button"]');

    await expect(page).toHaveURL("/dashboard");
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test("user can log in with valid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.fill('[data-testid="email-input"]', "test@example.com");
    await page.fill('[data-testid="password-input"]', "SecurePassword123");

    await page.click('[data-testid="submit-button"]');

    await expect(page).toHaveURL("/dashboard");
  });

  test("shows error for invalid login", async ({ page }) => {
    await page.goto("/login");

    await page.fill('[data-testid="email-input"]', "invalid@example.com");
    await page.fill('[data-testid="password-input"]', "wrongpassword");

    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      "Invalid credentials",
    );
  });
});
```

## Security and Production Readiness {#security-practices}

### 1. Security Headers Configuration

#### Comprehensive Security Headers

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://api.yoursite.com wss://yoursite.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          // Security headers
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Permissions-Policy",
            value: ["geolocation=()", "microphone=()", "camera=()"].join(", "),
          },
          // HTTPS enforcement
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      {
        // API specific headers
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.ALLOWED_ORIGINS || "https://yoursite.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};
```

### 2. Authentication and Authorization

#### Secure Authentication Implementation

```typescript
// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { getUserById } from "@/lib/services/user";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
        if (user) {
          session.user = {
            ...session.user,
            id: user.id,
            role: user.role,
          };
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Check role-based access
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    if (pathname.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }

        if (pathname.startsWith("/dashboard")) {
          return !!token;
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
```

### 3. Input Validation and Sanitization

#### Comprehensive Input Validation

```typescript
// lib/validations/user.ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  role: z.enum(["user", "admin", "moderator"]).default("user"),
});

export const updateUserSchema = z.object({
  id: z.string().uuid("Invalid user ID"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  email: z.string().email("Invalid email address").toLowerCase().optional(),
  role: z.enum(["user", "admin", "moderator"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

// lib/utils/sanitization.ts
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9.-]/gi, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase();
}
```

## Deployment and DevOps {#deployment-practices}

### 1. CI/CD Pipeline Configuration

#### GitHub Actions Workflow

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: "18"

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run type checking
        run: npm run type-check

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: test

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: .next/

  deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files
          path: .next/

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

### 2. Environment Management

#### Multi-Environment Configuration

```typescript
// lib/config/environments.ts
interface EnvironmentConfig {
  NODE_ENV: "development" | "production" | "test";
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_API_URL: string;
  DATABASE_URL: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
}

const configs: Record<string, EnvironmentConfig> = {
  development: {
    NODE_ENV: "development",
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    NEXT_PUBLIC_API_URL: "http://localhost:3000",
    DATABASE_URL: process.env.DEV_DATABASE_URL!,
    NEXTAUTH_SECRET: process.env.DEV_NEXTAUTH_SECRET!,
    NEXTAUTH_URL: "http://localhost:3000",
  },
  production: {
    NODE_ENV: "production",
    NEXT_PUBLIC_SITE_URL: process.env.PRODUCTION_SITE_URL!,
    NEXT_PUBLIC_API_URL: process.env.PRODUCTION_API_URL!,
    DATABASE_URL: process.env.PRODUCTION_DATABASE_URL!,
    NEXTAUTH_SECRET: process.env.PRODUCTION_NEXTAUTH_SECRET!,
    NEXTAUTH_URL: process.env.PRODUCTION_SITE_URL!,
    GOOGLE_CLIENT_ID: process.env.PRODUCTION_GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.PRODUCTION_GOOGLE_CLIENT_SECRET!,
    SUPABASE_URL: process.env.PRODUCTION_SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.PRODUCTION_SUPABASE_ANON_KEY!,
  },
  test: {
    NODE_ENV: "test",
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    NEXT_PUBLIC_API_URL: "http://localhost:3000",
    DATABASE_URL: process.env.TEST_DATABASE_URL!,
    NEXTAUTH_SECRET: process.env.TEST_NEXTAUTH_SECRET!,
    NEXTAUTH_URL: "http://localhost:3000",
  },
};

export function getConfig(): EnvironmentConfig {
  const env = process.env.NODE_ENV || "development";
  return configs[env];
}
```

This comprehensive best practices guide provides the foundation for a successful Vite to Next.js migration with production-ready code quality, security, and performance standards.

---

_Continue to case studies for real-world migration examples and performance comparisons._
