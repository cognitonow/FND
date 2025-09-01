
'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { usePathname, useSearchParams } from 'next/navigation';

export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // This is a simplified approach. For a more robust solution,
    // you might need to wrap `next/link` or use a different strategy
    // if you have navigations not triggered by standard links.
    // For now, we'll listen to all clicks on `<a>` tags.
    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        handleStart();
      }
    };

    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest('a');
        if (anchor) {
            handleAnchorClick(event as any);
        }
    });

    // Initial stop in case it's stuck from a previous page
    handleStop();

    return () => {
      // Cleanup logic if needed, though for nprogress it's minimal
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  
  return null; // This component does not render anything itself
}
