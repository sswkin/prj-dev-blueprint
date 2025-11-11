import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface HeaderNavProps {
  links?: NavLink[];
  className?: string;
}

const defaultLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function HeaderNav({
  links = defaultLinks,
  className = "",
}: HeaderNavProps) {
  return (
    <nav className={`flex items-center gap-6 ${className}`}>
      <ul className="flex items-center gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

