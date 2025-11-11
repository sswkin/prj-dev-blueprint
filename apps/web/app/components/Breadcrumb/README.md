# Breadcrumb Component

This directory contains the breadcrumb navigation component for the BlueprintForDev web application.

## Components

### Breadcrumb.tsx

A responsive breadcrumb navigation component that provides easy navigation across pages.

**Features:**

- Automatically generates breadcrumbs based on current route
- Shows home icon with link to homepage
- Displays current page as non-clickable text
- Responsive design with proper spacing
- Accessible with proper ARIA labels
- Supports custom styling through className prop

**Usage:**

```tsx
import Breadcrumb from "@/app/components/Breadcrumb";

// Basic usage - shows breadcrumbs automatically
<Breadcrumb />

// With custom styling
<Breadcrumb className="mb-4" />

// Hide home link
<Breadcrumb showHome={false} />

// Custom home label
<Breadcrumb homeLabel="Start" />
```

**Route Configuration:**
The component automatically generates breadcrumbs for these routes:

- `/` - Home
- `/about` - About
- `/contact` - Contact
- `/cookies` - Cookies
- `/privacy` - Privacy
- `/terms` - Terms

**Styling:**
The component uses Tailwind CSS classes and follows the app's design system:

- Colors: `text-muted-foreground`, `text-foreground`
- Hover states: `hover:text-foreground`
- Current page: `font-medium text-foreground`
- Icons: Inline SVG icons for home and chevron separators

### Layout.tsx

A layout wrapper component that includes the header, breadcrumb, and footer for consistent page structure.

**Usage:**

```tsx
import Layout from "@/app/components/Layout";

// Basic usage with breadcrumbs
<Layout>
  <div>Page content</div>
</Layout>

// Hide breadcrumbs
<Layout showBreadcrumb={false}>
  <div>Page content</div>
</Layout>
```

## Integration

The breadcrumb component is automatically included in all pages through the Layout component:

- About page (`/about`)
- Contact page (`/contact`)
- Cookies page (`/cookies`)
- Privacy page (`/privacy`)
- Terms page (`/terms`)

The home page (`/`) does not show breadcrumbs to avoid redundancy.

## Accessibility

- Uses semantic `<nav>` element with `aria-label="Breadcrumb"`
- Current page uses `aria-current="page"` attribute
- Home link includes descriptive `aria-label`
- Proper keyboard navigation support
- Screen reader friendly structure
