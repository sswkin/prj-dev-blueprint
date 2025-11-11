"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Inline SVG Icon Components
function HomeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  className?: string;
  showHome?: boolean;
  homeLabel?: string;
}

// Route configuration for breadcrumb labels

// Route configuration for breadcrumb labels
const routeLabels: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/cookies": "Cookies",
  "/privacy": "Privacy",
  "/terms": "Terms",
};

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Add home link if requested and not on home page
  if (pathname !== "/") {
    breadcrumbs.push({
      label: "Home",
      href: "/",
    });
  }

  // Build breadcrumbs for each segment
  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    breadcrumbs.push({
      label:
        routeLabels[currentPath] ||
        segment.charAt(0).toUpperCase() + segment.slice(1),
      href: currentPath,
      isCurrentPage: isLast,
    });
  });

  return breadcrumbs;
}

export default function Breadcrumb({
  className = "",
  showHome = true,
  homeLabel = "Home",
}: BreadcrumbProps) {
  const pathname = usePathname();

  // Don't show breadcrumbs on home page
  if (pathname === "/") {
    return null;
  }

  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <nav
      aria-label="Breadcrumb"
      className={`w-full border-b border-border bg-background/95 backdrop-blur ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center space-x-2 text-sm">
          {showHome && pathname !== "/" && (
            <>
              <Link
                href="/"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Go to home page"
              >
                <HomeIcon className="h-4 w-4" />
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
            </>
          )}

          {breadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center space-x-2">
              {item.isCurrentPage ? (
                <span
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                  <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
