
"use client";

import { useRef, useState, useEffect } from 'react';
import { HeroContent } from '@/components/home/HeroContent';
import { HeroVisuals } from '@/components/home/HeroVisuals';
import { Services } from '@/components/home/Services';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { ContactSection } from '@/components/home/ContactSection';
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
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
        const scrollPosition = container.scrollTop;
        const sectionElements = sections.map(s => document.getElementById(s.id));
        
        let activeIndex = 0;
        for (let i = sectionElements.length - 1; i >= 0; i--) {
            const section = sectionElements[i];
            if (section && scrollPosition >= section.offsetTop - window.innerHeight / 2) {
                activeIndex = i;
                break;
            }
        }
        setCurrentSectionIndex(activeIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);
  
  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return;

    const sectionId = sections[index].id;
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
      <div ref={containerRef} className="h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <section id="hero" data-section-id="hero" className="h-full snap-start flex items-center">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            <HeroContent />
            <HeroVisuals articles={latestArticles} />
          </div>
        </section>

        <section id="experience" data-section-id="experience" className="h-full snap-start flex items-center">
          <Services />
        </section>

        <section id="portfolio" data-section-id="portfolio" className="h-full snap-start flex items-center">
          <PortfolioSection />
        </section>
        
        <section id="contact" data-section-id="contact" className="h-full snap-start flex items-center">
          <ContactSection />
        </section>
      </div>
      <SectionNav 
        onUp={() => scrollToSection(currentSectionIndex - 1)}
        onDown={() => scrollToSection(currentSectionIndex + 1)}
        upDisabled={currentSectionIndex === 0}
        downDisabled={currentSectionIndex === sections.length - 1}
      />
    </>
  );
}
