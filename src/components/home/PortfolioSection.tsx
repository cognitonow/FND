
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function PortfolioSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col gap-6 items-start">
            <h2 className="text-5xl font-bold tracking-tighter">
              Selected work
            </h2>
            <Button size="lg" variant="secondary" asChild>
                <Link href="#">See All</Link>
            </Button>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-muted/30 rounded-3xl p-8">
              <div className="aspect-[4/3] relative mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1618225247898-79a40c31365d?q=80&w=2070&auto=format&fit=crop"
                  alt="Selected Work"
                  fill
                  className="rounded-2xl object-cover"
                  data-ai-hint="mobile application ui"
                />
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>DIGITAL AGENCY</span>
                <span>2021</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">UI DESIGN</Badge>
                <Badge variant="outline">MOBILE DEV</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
