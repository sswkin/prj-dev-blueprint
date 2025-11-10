import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blueprintfordev.xyz"),
  title: {
    default: "BlueprintForDev - Development Project Blueprints",
    template: "%s | BlueprintForDev",
  },
  description:
    "Generate comprehensive development project blueprints with architecture, components, database design, and implementation guidance. Streamline your development process with AI-powered project planning.",
  keywords: [
    "development",
    "blueprint",
    "project planning",
    "architecture",
    "components",
    "database design",
    "development guide",
    "software development",
    "project templates",
    "development workflow"
  ],
  authors: [{ name: "BlueprintForDev Team" }],
  creator: "BlueprintForDev",
  publisher: "BlueprintForDev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // metadataMap is not a valid property, using viewport in head instead
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blueprintfordev.xyz",
    siteName: "BlueprintForDev",
    title: "BlueprintForDev - Development Project Blueprints",
    description:
      "Generate comprehensive development project blueprints with architecture, components, database design, and implementation guidance.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "BlueprintForDev - Development Project Blueprints",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BlueprintForDev",
    creator: "@BlueprintForDev",
    title: "BlueprintForDev - Development Project Blueprints",
    description:
      "Generate comprehensive development project blueprints with architecture, components, database design, and implementation guidance.",
    images: ["/assets/og-image.png"],
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
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  classification: "Software Development, Project Management, Technical Planning",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://blueprintfordev.xyz" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/logo-transparent.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="color-scheme" content="light dark" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BlueprintForDev" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
