
"use client";

import React from 'react';
import Link from 'next/link';

interface NavLinksProps {
    sections: { id: string; name: string }[];
    activeSection?: string;
    onLinkClick?: (id: string) => void;
}

export function NavLinks({ sections, activeSection, onLinkClick }: NavLinksProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if(onLinkClick) {
            e.preventDefault();
            onLinkClick(id);
        }
    };

    return (
        <div className="flex items-center gap-4">
            {sections.map((section) => (
                <Link
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleClick(e, section.id)}
                    className="relative text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    {section.name}
                    {activeSection === section.id && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-primary rounded-full" />
                    )}
                </Link>
            ))}
        </div>
    );
}
