"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Define auth pages that should not show sidebar/header
  const authPages = ['/login', '/signup', '/forgot-password', '/reset-password'];
  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage) {
    // For auth pages, render just the children without sidebar/header
    return <>{children}</>;
  }

  // For all other pages, render with sidebar and header
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}