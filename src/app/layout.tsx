import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import RootLayoutClient from '@/components/RootLayoutClient';
import { ThemeProvider } from '@/components/ThemeProvider';


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
    <html lang="en" className={`${inter.variable} !scroll-smooth`} suppressHydrationWarning>
      <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <RootLayoutClient>{children}</RootLayoutClient>
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
