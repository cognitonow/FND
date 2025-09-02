
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { NavLinks } from './NavLinks';
import { ChevronUp, ChevronDown } from 'lucide-react';


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


    const scrollToSectionById = (id: string) => {
        if (!containerRef.current) return;
        const sectionElement = document.getElementById(id);
        if (sectionElement) {
             sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const scrollToSectionByIndex = (index: number) => {
        const sectionId = sections[index]?.id;
        if (sectionId) {
            scrollToSectionById(sectionId);
        }
    }

    return (
        <>
            {/* Side Dots */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
                {sections.map((section, index) => {
                     if (index === 0) {
                        return (
                             <button
                                key={section.id}
                                onClick={() => scrollToSectionByIndex(index)}
                                className={cn(
                                    "transition-colors duration-300 text-primary hover:text-primary/70",
                                    currentSectionIndex !== index && "opacity-50"
                                )}
                                aria-label={`Go to ${section.name} section`}
                            >
                                <ChevronUp className="w-5 h-5" />
                            </button>
                        )
                    }
                    if (index === sections.length - 1) {
                         return (
                             <button
                                key={section.id}
                                onClick={() => scrollToSectionByIndex(index)}
                                className={cn(
                                    "transition-colors duration-300 text-primary hover:text-primary/70",
                                    currentSectionIndex !== index && "opacity-50"
                                )}
                                aria-label={`Go to ${section.name} section`}
                            >
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        )
                    }
                    return (
                        <button
                            key={section.id}
                            onClick={() => scrollToSectionByIndex(index)}
                            className={cn(
                                "w-2.5 h-2.5 rounded-full transition-all duration-300 border-2 border-primary",
                                currentSectionIndex === index ? "bg-primary scale-125" : "bg-transparent hover:bg-primary/50"
                            )}
                            aria-label={`Go to ${section.name} section`}
                        />
                    )
                })}
            </div>

            {/* Header Links Update (by proxy) */}
            <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
                <div className="container mx-auto flex h-16 items-center justify-center px-4">
                    <div className="hidden md:flex pointer-events-auto">
                        <NavLinks sections={sections} activeSection={sections[currentSectionIndex]?.id} onLinkClick={scrollToSectionById} />
                    </div>
                </div>
            </div>
        </>
    );
}
