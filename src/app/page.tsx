
"use client";

import { useRef } from 'react';
import { HeroContent } from '@/components/home/HeroContent';
import { HeroVisuals } from '@/components/home/HeroVisuals';
import { Services } from '@/components/home/Services';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { ContactSection } from '@/components/home/ContactSection';
import { PageNavigation } from '@/components/home/PageNavigation';

const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'experience', name: 'Experience' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'contact', name: 'Contact' },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const latestArticles = []; // Assuming this will be populated later

  return (
    <div ref={containerRef} className="h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <PageNavigation containerRef={containerRef} sections={sections} />
      
      <section id="hero" className="container mx-auto px-4 h-[calc(100vh-4rem)] snap-start flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <HeroContent />
          <HeroVisuals articles={latestArticles} />
        </div>
      </section>

      <section id="experience" className="h-[calc(100vh-4rem)] snap-start flex items-center">
        <Services />
      </section>

      <section id="portfolio" className="h-[calc(100vh-4rem)] snap-start flex items-center">
        <PortfolioSection />
      </section>
      
      <section id="contact" className="h-[calc(100vh-4rem)] snap-start flex items-center">
        <ContactSection />
      </section>
    </div>
  );
}
