import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";

interface LayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
}

export default function Layout({ children, showBreadcrumb = true }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header sticky={true} />
      
      {showBreadcrumb && <Breadcrumb />}
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}