# Vite to Next.js Migration Troubleshooting Guide

**Meta Description:** Solve common Vite to Next.js migration issues with our comprehensive troubleshooting guide. Find solutions for routing errors, build failures, performance issues, and more with expert tips and fixes.

**Keywords:** vite to nextjs troubleshooting, nextjs migration problems, nextjs build errors, nextjs routing issues, migration troubleshooting guide, nextjs configuration problems, react router to nextjs issues

## Table of Contents
- [Common Build and Compilation Errors](#build-errors)
- [Routing and Navigation Issues](#routing-issues)
- [Configuration Problems](#configuration-problems)
- [Performance and Optimization Issues](#performance-issues)
- [SEO and Metadata Problems](#seo-issues)
- [CSS and Styling Issues](#styling-issues)
- [API Routes and Data Fetching Problems](#api-issues)
- [Deployment and Environment Issues](#deployment-issues)

## Common Build and Compilation Errors {#build-errors}

### 1. TypeScript Compilation Errors

#### Problem: Property 'X' does not exist on type 'Y'

**Error Message:**
```
Property 'router' does not exist on type 'NextRequest'
Type 'User' is not assignable to type 'any'
```

**Solutions:**

**A. Missing Type Imports**
```typescript
// ❌ Incorrect
import { NextRequest, NextResponse } from 'next/server';

// ✅ Correct
import type { NextRequest, NextResponse } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';
```

**B. Component Prop Type Issues**
```typescript
// ❌ Incorrect
interface Props {
  data: any;
}

export default function Component({ data }: Props) {
  return <div>{data.title}</div>; // Type error
}

// ✅ Correct
interface ComponentProps {
  data: {
    title: string;
    description?: string;
  };
}

export default function Component({ data }: ComponentProps) {
  return <div>{data.title}</div>;
}

// ✅ Or with more flexibility
interface ComponentProps {
  data: Record<string, any>;
}

export default function Component({ data }: ComponentProps) {
  return <div>{(data as { title: string }).title}</div>;
}
```

#### Problem: Module Resolution Errors

**Error Message:**
```
Module not found: Can't resolve '@/components/Button'
```

**Solutions:**

**A. Verify Path Mapping**
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

**B. Check File Extensions**
```typescript
// ❌ Incorrect
import Button from '@/components/Button'; // Missing extension

// ✅ Correct
import Button from '@/components/Button.tsx';
// or
import Button from '@/components/Button'; // If extension in pathMapping
```

### 2. Webpack and Bundle Errors

#### Problem: Module Federation Issues

**Error Message:**
```
Module not found: Error: Can't resolve 'fs' in production build
```

**Solutions:**

**A. Configure Webpack Fallbacks**
```javascript
// next.config.js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        readline: false,
      };
    }
    return config;
  },
};
```

#### Problem: Large Bundle Size Warnings

**Warning Message:**
```
Build size exceeded warning: current build size 2.1MB
```

**Solutions:**

**A. Enable Bundle Analysis**
```bash
npm run build -- --analyze
```

**B. Implement Dynamic Imports**
```typescript
// ❌ Incorrect
import { HeavyComponent } from './components/HeavyComponent';

// ✅ Correct
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR for client-heavy components
});
```

**C. Configure Bundle Size Limits**
```javascript
// next.config.js
module.exports = {
  experimental: {
    buildExceedsBuildSizeWarningKB: 500, // Default 500KB
  },
};
```

## Routing and Navigation Issues {#routing-issues}

### 1. File-Based Routing Problems

#### Problem: 404 Errors for New Routes

**Error Message:**
```
Cannot GET /new-page
```

**Solutions:**

**A. Check File Structure**
```
app/
├── page.tsx              # ✅ / route
├── about/
│   └── page.tsx          # ✅ /about route
├── blog/
│   ├── page.tsx          # ✅ /blog route
│   └── [slug]/
│       └── page.tsx      # ✅ /blog/[slug] route

# ❌ Incorrect
app/
├── pages/
│   └── HomePage.tsx      # This won't create /pages route
```

**B. Route File Naming**
```typescript
// ✅ Correct file names
app/
├── page.tsx              # Home page
├── [dynamic]/
│   └── page.tsx          # Dynamic route
├── [...catchall]/
│   └── page.tsx          # Catch-all route
└── optional/
    └── [[...slug]]/
        └── page.tsx      # Optional catch-all route
```

#### Problem: Dynamic Route Parameter Issues

**Error Message:**
```
Error: Route parameters did not match
```

**Solutions:**

**A. Correct Parameter Access**
```typescript
// ❌ Incorrect
interface Props {
  params: string; // Wrong type
}

export default function Page({ params }: Props) {
  const { id } = params; // Error
  return <div>{id}</div>;
}

// ✅ Correct
interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const { id } = params;
  return <div>User ID: {id}</div>;
}
```

**B. Route Group Issues**
```typescript
// app/(marketing)/page.tsx → '/' route (not '/(marketing)')
// app/(app)/dashboard/page.tsx → '/dashboard' route (not '/(app)/dashboard')
```

### 2. Navigation and Link Issues

#### Problem: useRouter Hook Not Working

**Error Message:**
```
Error: useRouter() should be used inside a Router component
```

**Solutions:**

**A. Client-Side Only**
```typescript
// ❌ Incorrect - Server Component
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter(); // Error
  // ...
}

// ✅ Correct - Client Component
'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  // ...
}
```

#### Problem: Link Component Not Working

**Solutions:**

**A. Import Correct Link**
```typescript
// ❌ Incorrect
import { Link } from 'react-router-dom';

// ✅ Correct
import Link from 'next/link';
```

**B. Client-Side Navigation**
```typescript
// For client-side navigation without page reload
'use client';

import { useRouter } from 'next/navigation';

function ClientComponent() {
  const router = useRouter();
  
  const handleNavigation = () => {
    router.push('/new-page');
    // or
    router.replace('/new-page'); // Won't add to history
    // or
    router.back(); // Go back
  };
}
```

## Configuration Problems {#configuration-problems}

### 1. Next.js Config Issues

#### Problem: Experimental Features Not Working

**Solutions:**

**A. Enable Experimental Features**
```javascript
// next.config.js
module.exports = {
  experimental: {
    appDir: true,        // Enable App Router
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
    serverMinification: true,
  },
};
```

#### Problem: Image Optimization Errors

**Error Message:**
```
Error: Invalid src prop: 'https://example.com/image.jpg'
```

**Solutions:**

**A. Configure Allowed Domains**
```javascript
// next.config.js
module.exports = {
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'your-domain.com',
      'cdn.your-domain.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.your-domain.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};
```

**B. Handle Image Loading Errors**
```typescript
// components/OptimizedImage.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function OptimizedImage({ src, alt, ...props }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (imageError) {
    return (
      <div className="bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onLoad={() => setImageLoading(false)}
      onError={() => setImageError(true)}
      {...props}
    />
  );
}
```

### 2. TypeScript Config Issues

#### Problem: TypeScript Path Mapping Not Working

**Solutions:**

**A. Check tsconfig.json Structure**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

**B. Restart TypeScript Service**
```
# In VS Code
Ctrl+Shift+P → TypeScript: Restart TS Server

# Or in terminal
rm -rf node_modules/.cache
npm run dev
```

## Performance and Optimization Issues {#performance-issues}

### 1. Slow Build Times

#### Problem: Development Server Slow to Start

**Solutions:**

**A. Optimize Dependencies**
```bash
# Check for unused dependencies
npx depcheck

# Analyze bundle size
npm run build -- --analyze
```

**B. Enable SWC Minification**
```javascript
// next.config.js
module.exports = {
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
};
```

#### Problem: Hot Reload Not Working

**Solutions:**

**A. Check File Watching**
```javascript
// next.config.js
module.exports = {
  watchOptions: {
    ignored: ['**/node_modules/**', '**/.next/**'],
  },
};
```

**B. Restart Development Server**
```bash
# Stop the server (Ctrl+C)
# Clear .next directory
rm -rf .next
# Restart
npm run dev
```

### 2. Memory Issues During Build

#### Problem: Out of Memory Errors

**Error Message:**
```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed
```

**Solutions:**

**A. Increase Node.js Memory Limit**
```bash
# Set memory limit
export NODE_OPTIONS="--max_old_space_size=4096"
npm run build

# Or in package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
  }
}
```

**B. Optimize Build Process**
```javascript
// next.config.js
module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Reduce memory usage
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};
```

## SEO and Metadata Problems {#seo-issues}

### 1. Metadata Not Updating

#### Problem: Meta Tags Not Changing

**Solutions:**

**A. Use Client-Side Meta Updates**
```typescript
// ❌ Incorrect - Server Component
import { Metadata } from 'next';

export default function Page() {
  return <div>Page content</div>;
}

// ✅ Correct - Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Page ${params.id} | My App`,
    description: `Description for page ${params.id}`,
  };
}
```

**B. Client-Side Meta Updates with Helmet**
```typescript
// components/PageMeta.tsx
'use client';

import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string[];
}

export default function PageMeta({ title, description, keywords = [] }: PageMetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
```

#### Problem: Structured Data Issues

**Error Message:**
```
Warning: The attribute "itemtype" is not valid
```

**Solutions:**

**A. Valid JSON-LD Structure**
```typescript
// ❌ Incorrect
const jsonLd = {
  '@context': 'https://schema.org',
  'itemtype': 'https://schema.org/Article', // Wrong attribute
  'itemscope': true,
};

// ✅ Correct
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Article Title',
  author: {
    '@type': 'Person',
    name: 'Author Name',
  },
  datePublished: '2024-01-01',
};
```

**B. Test Structured Data**
```typescript
// app/components/StructuredData.tsx
interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  // Validate JSON before rendering
  try {
    JSON.stringify(data);
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  } catch (error) {
    console.error('Invalid structured data:', error);
    return null;
  }
}
```

## CSS and Styling Issues {#styling-issues}

### 1. CSS Import Problems

#### Problem: Styles Not Loading

**Solutions:**

**A. Check Global CSS Import**
```typescript
// app/layout.tsx
import './globals.css'; // Must be imported in root layout

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

**B. Tailwind CSS Configuration**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 2. CSS-in-JS Issues

#### Problem: Styled Components Not Working

**Solutions:**

**A. Configure Next.js for Styled Components**
```javascript
// next.config.js
module.exports = {
  compiler: {
    styledComponents: true,
  },
};
```

**B. Server-Side Rendering Setup**
```typescript
// lib/styled-components.tsx
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
    color: #333;
  }
`;

// app/layout.tsx
import { GlobalStyles } from '@/lib/styled-components';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
```

## API Routes and Data Fetching Problems {#api-issues}

### 1. API Route Not Found

#### Problem: 404 for API Routes

**Error Message:**
```
Cannot GET /api/users
```

**Solutions:**

**A. Check File Structure**
```
app/
├── api/
│   ├── users/
│   │   ├── route.ts        # Handles /api/users
│   └── user/
│       └── [id]/
│           └── route.ts    # Handles /api/user/:id

# ❌ Incorrect
app/
├── api/
│   ├── users.ts           # Won't create route
│   └── user.ts            # Won't create route
```

**B. HTTP Method Handling**
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'GET request' });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'POST request' });
}

// ❌ Using wrong function names
export async function GET_ALL() {}  // Wrong
export async function CREATE() {}    // Wrong

// ✅ Using correct HTTP method names
export async function GET() {}       // Correct
export async function POST() {}      // Correct
export async function PUT() {}       // Correct
export async function DELETE() {}    // Correct
export async function PATCH() {}     // Correct
```

### 2. Data Fetching Issues

#### Problem: Hydration Mismatch

**Error Message:**
```
Warning: Text content did not match
```

**Solutions:**

**A. Use Client Components for Dynamic Data**
```typescript
// ❌ Incorrect - Server Component with dynamic data
export default function Page() {
  const [data, setData] = useState(null); // Hydration mismatch
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data?.title}</div>;
}

// ✅ Correct - Client Component
'use client';

export default function Page() {
  // Client-side data fetching
}
```

**B. Consistent Server/Client Rendering**
```typescript
// ✅ Loading state during SSR
export default async function Page() {
  // Server-side loading
  const data = await fetchData();
  
  return (
    <div>
      {data ? data.title : 'Loading...'}
    </div>
  );
}
```

## Deployment and Environment Issues {#deployment-issues}

### 1. Build Environment Problems

#### Problem: Environment Variables Not Working

**Solutions:**

**A. Correct Environment Variable Usage**
```bash
# .env.local (for development)
NEXT_PUBLIC_API_URL=http://localhost:3001
API_SECRET=your-secret-key

# .env.production (for production)
NEXT_PUBLIC_API_URL=https://api.yoursite.com
API_SECRET=your-production-secret
```

**B. Access Variables Correctly**
```typescript
// ❌ Incorrect
const apiUrl = process.env.API_URL; // Not available on client

// ✅ Correct
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Available on client

// Server-side only
const secret = process.env.API_SECRET; // Available on server
```

#### Problem: Deployment Build Failures

**Solutions:**

**A. Check Node.js Version**
```json
// package.json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

**B. Optimize for Production**
```javascript
// next.config.js
module.exports = {
  // Disable console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable compression
  compress: true,
  
  // Enable SWC minification
  swcMinify: true,
};
```

### 2. Static Export Issues

#### Problem: Static Export Not Working

**Error Message:**
```
Error: Image Optimization requires Node.js server
```

**Solutions:**

**A. Configure for Static Export**
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable features that require server
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
```

**B. Use Static Image Handling**
```typescript
// Use local images for static export
import Image from 'next/image';
import localImage from '@/public/image.jpg';

function Component() {
  return (
    <Image
      src={localImage}
      alt="Description"
      width={500}
      height={300}
      unoptimized={true} // Required for static export
    />
  );
}
```

## General Troubleshooting Tips

### 1. Development Tools

**A. Enable Debug Logging**
```javascript
// next.config.js
module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

**B. Use Source Maps**
```javascript
// next.config.js
module.exports = {
  productionBrowserSourceMaps: true, // For production debugging
};
```

### 2. Performance Monitoring

**A. Bundle Analysis**
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

**B. Performance Profiling**
```bash
# Profile build performance
npm run build -- --profile
```

### 3. Common Solutions Checklist

- [ ] Clear `.next` directory and restart dev server
- [ ] Check Node.js and npm versions
- [ ] Verify TypeScript configuration
- [ ] Ensure all imports have correct extensions
- [ ] Check file-based routing structure
- [ ] Validate environment variables
- [ ] Test API route HTTP methods
- [ ] Verify Tailwind CSS content paths
- [ ] Check for circular dependencies
- [ ] Restart TypeScript language service

## Getting Help

If you continue to experience issues:

1. **Check Next.js Documentation**: https://nextjs.org/docs
2. **Search GitHub Issues**: https://github.com/vercel/next.js/issues
3. **Next.js Discord Community**: https://discord.gg/nextjs
4. **Create Reproducible Example**: Minimal code that demonstrates the issue
5. **Check Logs**: Development server logs often contain helpful error messages

Remember: Most migration issues are configuration-related and can be resolved by carefully checking file structures, imports, and settings.

---

*This troubleshooting guide covers the most common issues encountered during Vite to Next.js migration. For additional support, consult the main migration guide or implementation documentation.*