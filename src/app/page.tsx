
"use client";

import { useRef } from 'react';
import { HeroContent } from '@/components/home/HeroContent';
import { HeroVisuals } from '@/components/home/HeroVisuals';
import { Services } from '@/components/home/Services';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { ContactSection } from '@/components/home/ContactSection';
import { PageNavigation } from '@/components/home/PageNavigation';
import { SectionNav } from '@/components/home/SectionNav';

const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'experience', name: 'Experience' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'contact', name: 'Contact' },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const latestArticles = []; // Assuming this will be populated later
  
  const scrollToSection = (index: number) => {
    if (!containerRef.current) return;
    const sectionElements = containerRef.current.querySelectorAll('section[data-section-id]');
    const targetSection = sectionElements[index];
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div ref={containerRef} className="h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <PageNavigation containerRef={containerRef} sections={sections} />
      
      <section id="hero" data-section-id="hero" className="h-full snap-start flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <HeroContent />
          <HeroVisuals articles={latestArticles} />
        </div>
      </section>

      <div className="py-8 flex justify-center">
        <SectionNav onUp={() => scrollToSection(0)} onDown={() => scrollToSection(1)} />
      </div>

      <section id="experience" data-section-id="experience" className="h-full snap-start flex items-center">
        <Services />
      </section>

      <div className="py-8 flex justify-center">
        <SectionNav onUp={() => scrollToSection(1)} onDown={() => scrollToSection(2)} />
      </div>

      <section id="portfolio" data-section-id="portfolio" className="h-full snap-start flex items-center">
        <PortfolioSection />
      </section>
      
      <div className="py-8 flex justify-center">
        <SectionNav onUp={() => scrollToSection(2)} onDown={() => scrollToSection(3)} />
      </div>

      <section id="contact" data-section-id="contact" className="h-full snap-start flex items-center">
        <ContactSection />
      </section>
    </div>
  );
}
