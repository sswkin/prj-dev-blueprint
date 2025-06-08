import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevBlueprint AI - Go from idea to code blueprint in minutes',
  description: 'AI-powered workflow for solo developers, startups & early adopters. Transform your ideas into detailed code blueprints with our intelligent platform.',
  keywords: 'AI, code blueprint, development, startup, solo developer, planning, ideation',
  openGraph: {
    title: 'DevBlueprint AI - Go from idea to code blueprint in minutes',
    description: 'AI-powered workflow for solo developers, startups & early adopters',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevBlueprint AI - Go from idea to code blueprint in minutes',
    description: 'AI-powered workflow for solo developers, startups & early adopters',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}