
"use client";

import { HeroContent } from '@/components/home/HeroContent';
import { HeroVisuals } from '@/components/home/HeroVisuals';
import { Services } from '@/components/home/Services';
import { PortfolioSection } from '@/components/home/PortfolioSection';
import { ContactSection } from '@/components/home/ContactSection';

export default function HomePage() {
  const latestArticles = []; // Assuming this will be populated later

  return (
    <>
      <div className="h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scroll-smooth">
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

        <section id="contact" className="h-full w-full snap-start flex items-center justify-center">
          <ContactSection />
        </section>
      </div>
    </>
  );
}
