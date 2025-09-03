
"use client"

import { usePathname } from 'next/navigation'
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    return <>{children}</>;
  }
  
  const isHomePage = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${isHomePage ? 'h-screen overflow-hidden' : ''}`}>
        {children}
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
}
