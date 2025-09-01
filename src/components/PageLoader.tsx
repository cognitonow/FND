
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

    handleStop(); // Stop progress on initial load

    return () => {
      handleStop(); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  // We can also wrap the Link component to start progress on click
  // This is a more advanced pattern but can feel more responsive.
  // For now, relying on Next.js router events is sufficient.
  
  return null; // This component does not render anything itself
}
