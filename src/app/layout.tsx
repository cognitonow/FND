import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import SiteLayout from '@/components/SiteLayout';
import { PageLoader } from '@/components/PageLoader';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

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
    <html lang="en" className={`${inter.variable} !scroll-smooth`}>
      <body className={`font-sans antialiased`}>
        <PageLoader />
        <SiteLayout>{children}</SiteLayout>
        <Toaster />
      </body>
    </html>
  );
}
