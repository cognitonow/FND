
"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { PageLoader } from '@/components/PageLoader';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isHomePage = pathname === '/';

  // This logic is in a useEffect hook to prevent hydration errors.
  // It runs only on the client, after the initial render.
  useEffect(() => {
    if (isHomePage) {
      document.body.classList.add('homepage-body-lock');
    } else {
      document.body.classList.remove('homepage-body-lock');
    }

    // Cleanup function to remove the class when the component unmounts
    // or when the path changes and it's no longer the homepage.
    return () => {
        document.body.classList.remove('homepage-body-lock');
    }
  }, [isHomePage]);

  return (
    <>
      <PageLoader />
      {isAdminPage || isHomePage ? (
        children
      ) : (
        <SiteLayout>{children}</SiteLayout>
      )}
    </>
  );
}
