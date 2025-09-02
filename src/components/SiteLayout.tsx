
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
    <div className="flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      {!isHomePage && <Footer />}
    </div>
  );
}
