
"use client";

import { usePathname } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { PageLoader } from '@/components/PageLoader';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // This logic was moved from the root layout to this client component.
  // We add a class to the body tag directly to control scrolling on the homepage.
  if (typeof window !== 'undefined') {
    if (isHomePage) {
      document.body.classList.add('homepage-body-lock');
    } else {
      document.body.classList.remove('homepage-body-lock');
    }
  }

  return (
    <>
      <PageLoader />
      <SiteLayout>{children}</SiteLayout>
    </>
  );
}
