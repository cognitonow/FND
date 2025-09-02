
"use client";

import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SectionNavProps {
    onUp: () => void;
    onDown: () => void;
    upDisabled?: boolean;
    downDisabled?: boolean;
}

export function SectionNav({ onUp, onDown, upDisabled, downDisabled }: SectionNavProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <div className="flex gap-2 p-2 bg-background/50 backdrop-blur-sm border rounded-full shadow-lg">
            <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-10 w-10"
                onClick={onUp}
                disabled={upDisabled}
                aria-label="Scroll Up"
            >
                <ArrowUp className="h-5 w-5" />
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-10 w-10"
                onClick={onDown}
                disabled={downDisabled}
                aria-label="Scroll Down"
            >
                <ArrowDown className="h-5 w-5" />
            </Button>
        </div>
    </div>
  );
}
