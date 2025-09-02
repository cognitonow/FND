
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
    <div className="flex gap-2">
         <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-10 w-10 bg-background/50 backdrop-blur-sm"
            onClick={onUp}
            disabled={upDisabled}
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
        <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-10 w-10 bg-background/50 backdrop-blur-sm"
            onClick={onDown}
            disabled={downDisabled}
        >
            <ArrowDown className="h-5 w-5" />
        </Button>
    </div>
  );
}
