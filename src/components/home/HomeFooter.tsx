
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

type HomeFooterProps = {
    onScrollToTop: () => void;
};

export function HomeFooter({ onScrollToTop }: HomeFooterProps) {
    const year = new Date().getFullYear();
    return (
         <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">&copy; {year} FND.ME. All rights reserved.</p>
                <Button variant="ghost" onClick={onScrollToTop}>Back to Top <ArrowUp className="ml-2 h-4 w-4"/></Button>
            </div>
        </div>
    );
}
