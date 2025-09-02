
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavLinks } from './NavLinks';

interface PageNavigationProps {
    containerRef: React.RefObject<HTMLDivElement>;
    sections: { id: string; name: string }[];
}

export function PageNavigation({ containerRef, sections }: PageNavigationProps) {
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
    }, [containerRef, sections]);


    const scrollToSection = (index: number) => {
        if (!containerRef.current) return;
        const sectionId = sections[index]?.id;
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            containerRef.current.scrollTo({
                top: sectionElement.offsetTop,
                behavior: 'smooth'
            });
        }
    };
    
    const handleLinkClick = (id: string) => {
        const index = sections.findIndex(s => s.id === id);
        if (index !== -1) {
            scrollToSection(index);
        }
    };

    return (
        <>
            {/* Side Dots */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
                {sections.map((section, index) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(index)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300 border-2 border-primary",
                            currentSectionIndex === index ? "bg-primary scale-125" : "bg-transparent hover:bg-primary/50"
                        )}
                        aria-label={`Go to ${section.name} section`}
                    />
                ))}
            </div>

            {/* Up/Down Arrows */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
                 <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-10 w-10 bg-background/50 backdrop-blur-sm"
                    onClick={() => scrollToSection(currentSectionIndex - 1)}
                    disabled={currentSectionIndex === 0}
                >
                    <ArrowUp className="h-5 w-5" />
                </Button>
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-10 w-10 bg-background/50 backdrop-blur-sm"
                    onClick={() => scrollToSection(currentSectionIndex + 1)}
                    disabled={currentSectionIndex === sections.length - 1}
                >
                    <ArrowDown className="h-5 w-5" />
                </Button>
            </div>
            
            {/* Header Links Update (by proxy) */}
            <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
                <div className="container mx-auto flex h-16 items-center justify-center px-4">
                    <div className="hidden md:flex pointer-events-auto">
                        <NavLinks sections={sections} activeSection={sections[currentSectionIndex]?.id} onLinkClick={handleLinkClick} />
                    </div>
                </div>
            </div>
        </>
    );
}
