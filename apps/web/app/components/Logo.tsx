import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 48, height: 48 },
};

export default function Logo({
  href = "/",
  className = "",
  size = "md",
}: LogoProps) {
  const { width, height } = sizeMap[size];

  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.jpg"
        alt="BlueprintForDev Logo"
        width={width}
        height={height}
        priority
        className="rounded-sm object-contain"
      />
      <span className="hidden font-bold text-lg sm:inline">
        BlueprintForDev
      </span>
    </div>
  );

  return (
    <Link
      href={href}
      className="inline-flex items-center hover:opacity-80 transition-opacity"
    >
      {logoContent}
    </Link>
  );
}
