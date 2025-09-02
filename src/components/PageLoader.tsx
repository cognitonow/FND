
'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { usePathname, useSearchParams } from 'next/navigation';

// This is a workaround to correctly trigger nprogress on route changes.
// Next.js App Router doesn't have a clean way to hook into the start of a route change yet.
// See: https://github.com/vercel/next.js/discussions/41934
import { useRouter } from 'next/navigation';

export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleStop = () => {
      NProgress.done();
    };

    handleStop(); // Stop on initial load

    return () => {
      handleStop(); // Stop on unmount
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args) => {
      NProgress.start();
      originalPush(...args);
    };

    router.replace = (...args) => {
      NProgress.start();
      originalReplace(...args);
    };

    // Also handle Link clicks
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href && anchor.target !== '_blank') {
        const targetUrl = new URL(anchor.href);
        const currentUrl = new URL(window.location.href);
        if (targetUrl.origin === currentUrl.origin && targetUrl.pathname !== currentUrl.pathname) {
          NProgress.start();
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
      document.removeEventListener('click', handleLinkClick);
    };
  }, [router]);

  return null;
}
