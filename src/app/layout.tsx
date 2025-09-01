import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import SiteLayout from '@/components/SiteLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
      <body className={`${inter.variable} font-body antialiased`}>
        <SiteLayout>{children}</SiteLayout>
        <Toaster />
      </body>
    </html>
  );
}
