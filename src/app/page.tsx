
"use client";

import { useRef, useEffect, useState } from 'react';
import { HeroContent } from '@/components/home/HeroContent';
import { HeroVisuals } from '@/components/home/HeroVisuals';
import { Services } from '@/components/home/Services';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { RevitTutorialsSection } from '@/components/home/RevitTutorialsSection';
import { ContactSection } from '@/components/home/ContactSection';
import { PageNavigation } from '@/components/home/PageNavigation';
import { getArticles } from '@/lib/actions';
import type { Article } from '@/types';

const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'experience', name: 'Work Experience' },
  { id: 'portfolio', name: 'Selected work' },
  { id: 'tutorials', 'name': 'Revit Tutorials' },
  { id: 'contact', name: 'Get In Touch' },
];

export default function HomePage() {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    async function fetchArticles() {
        const articles = await getArticles(4);
        setLatestArticles(articles);
    }
    fetchArticles();
  }, []);

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
  }, []);

  const scrollToSectionByIndex = (index: number) => {
    const sectionId = sections[index]?.id;
    if (sectionId) {
       if (!containerRef.current) return;
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
             sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }

  const scrollToTop = () => {
    if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  return (
    <>
      <div className="flex h-full">
        <div ref={containerRef} className="flex-grow h-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
          <section id="hero" className="h-full w-full snap-start flex items-center justify-center">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
              <HeroContent />
              <HeroVisuals articles={latestArticles} />
            </div>
          </section>

          <div className="border-t"></div>

          <section id="experience" className="h-full w-full snap-start flex items-center justify-center">
            <Services />
          </section>
          
          <div className="border-t"></div>

          <section id="portfolio" className="h-full w-full snap-start flex items-center justify-center">
            <PortfolioSection />
          </section>
          
          <div className="border-t"></div>

          <section id="tutorials" className="h-full w-full snap-start flex items-center justify-center">
            <RevitTutorialsSection articles={latestArticles} />
          </section>

          <div className="border-t"></div>

          <section id="contact" className="h-full w-full snap-start flex items-center justify-center">
            <ContactSection onScrollToTop={scrollToTop} />
          </section>
        </div>
        <div className="relative h-full hidden md:flex items-center">
            <PageNavigation 
                sections={sections} 
                currentSectionIndex={currentSectionIndex} 
                scrollToSectionByIndex={scrollToSectionByIndex} 
            />
        </div>
      </div>
    </>
  );
}
