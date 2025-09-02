
"use client";

import { cn } from '@/lib/utils';
import { NavLinks } from './NavLinks';
import { ChevronUp, ChevronDown } from 'lucide-react';


interface PageNavigationProps {
    sections: { id: string; name: string }[];
    currentSectionIndex: number;
    scrollToSectionByIndex: (index: number) => void;
}

export function PageNavigation({ sections, currentSectionIndex, scrollToSectionByIndex }: PageNavigationProps) {
    
    const scrollToSectionById = (id: string) => {
        const index = sections.findIndex(s => s.id === id);
        if (index !== -1) {
            scrollToSectionByIndex(index);
        }
    };
    
    return (
        <>
            {/* Side Dots */}
            <div className="relative h-full hidden md:flex items-center">
                <div className="flex flex-col items-center gap-3 border-l-2 pl-3 pr-4">
                    <button
                        onClick={() => scrollToSectionByIndex(Math.max(0, currentSectionIndex - 1))}
                        className={cn(
                            "transition-colors duration-300 text-primary hover:text-primary/70",
                            currentSectionIndex === 0 && "opacity-50 cursor-not-allowed"
                        )}
                        aria-label="Go to previous section"
                        disabled={currentSectionIndex === 0}
                    >
                        <ChevronUp className="w-6 h-6" />
                    </button>

                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSectionByIndex(index)}
                            className={cn(
                                "w-2.5 h-2.5 rounded-full transition-all duration-300 border-2 border-primary",
                                currentSectionIndex === index ? "bg-primary scale-125" : "bg-transparent hover:bg-primary/50"
                            )}
                            aria-label={`Go to ${section.name} section`}
                        />
                    ))}

                    <button
                        onClick={() => scrollToSectionByIndex(Math.min(sections.length - 1, currentSectionIndex + 1))}
                        className={cn(
                            "transition-colors duration-300 text-primary hover:text-primary/70",
                            currentSectionIndex === sections.length - 1 && "opacity-50 cursor-not-allowed"
                        )}
                        aria-label="Go to next section"
                        disabled={currentSectionIndex === sections.length - 1}
                    >
                        <ChevronDown className="w-6 h-6" />
                    </button>
                </div>
            </div>


            {/* Header Links Update (by proxy) */}
            <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
                <div className="container mx-auto flex h-16 items-center justify-center px-4">
                    <div className="hidden md:flex pointer-events-auto bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                        <NavLinks sections={sections} activeSection={sections[currentSectionIndex]?.id} onLinkClick={scrollToSectionById} />
                    </div>
                </div>
            </div>
        </>
    );
}
