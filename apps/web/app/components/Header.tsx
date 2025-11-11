import Logo from "./Logo";
import HeaderNav from "./HeaderNav";

interface HeaderNavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  navLinks?: HeaderNavLink[];
  className?: string;
  sticky?: boolean;
}

export default function Header({
  navLinks,
  className = "",
  sticky = true,
}: HeaderProps) {
  const stickyClass = sticky ? "sticky top-0 z-50" : "";

  return (
    <header
      className={`w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${stickyClass} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo size="md" href="/" />
          <HeaderNav links={navLinks} className="hidden md:flex" />
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile menu button can be added here */}
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
