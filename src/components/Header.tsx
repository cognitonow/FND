
"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { NavLinks } from './home/NavLinks';
import { usePathname } from 'next/navigation';


const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'experience', name: 'Experience' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'contact', name: 'Contact' },
];


export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          FND.ME
        </Link>
        <nav className="flex items-center gap-4">
          {isHomePage ? <NavLinks sections={sections} /> : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/portfolio">Portfolio</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/articles">Articles</Link>
              </Button>
            </>
          )}
          <Button variant="outline" asChild>
            <Link href="/admin/login">Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
