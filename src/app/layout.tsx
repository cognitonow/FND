import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import SiteLayout from '@/components/SiteLayout';
import { PageLoader } from '@/components/PageLoader';


export const metadata: Metadata = {
  title: 'FND.ME - Design & Technology',
  description: 'A portfolio and blog by a passionate creator.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`font-sans antialiased`}>
        <PageLoader />
        <SiteLayout>{children}</SiteLayout>
        <Toaster />
      </body>
    </html>
  );
}
