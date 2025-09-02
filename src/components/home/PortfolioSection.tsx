
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const projects = [
    {
        name: 'ZENPOINT',
        year: '2024',
        tags: ['UI DESIGN', 'WEB DEV'],
        imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop',
        dataAiHint: 'serene beach landscape'
    },
    {
        name: 'PAYU',
        year: '2024',
        tags: ['UI DESIGN', 'WEB DEV'],
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
        dataAiHint: 'modern office collaboration'
    },
    {
        name: 'COMPAI',
        year: '2024',
        tags: ['UI DESIGN', 'MOBILE DEV', 'WEB DEV'],
        imageUrl: 'https://images.unsplash.com/photo-1573496774221-9d69a58405a4?q=80&w=2069&auto=format&fit=crop',
        dataAiHint: 'pocket companion device'
    },
    {
        name: 'CHATPIC.AI',
        year: '2024',
        tags: ['UI DESIGN', 'MOBILE DEV'],
        imageUrl: 'https://images.unsplash.com/photo-1694663361546-936528987483?q=80&w=1974&auto=format&fit=crop',
        dataAiHint: 'ai chat application'
    },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-muted/30 py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col gap-6 items-start lg:sticky lg:top-24">
            <h2 className="text-5xl font-bold tracking-tighter">
              Selected work
            </h2>
            <Button size="lg" variant="secondary" asChild>
                <Link href="#">See All</Link>
            </Button>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
                <div key={project.name} className="bg-background/50 rounded-3xl p-6 transition-transform hover:scale-[1.02] hover:shadow-xl">
                    <div className="aspect-[4/3] relative mb-6">
                        <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        className="rounded-2xl object-cover"
                        data-ai-hint={project.dataAiHint}
                        />
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                        <span>{project.name}</span>
                        <span>{project.year}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {project.tags.map(tag => (
                             <Badge key={tag} variant="outline" className="font-light bg-accent/10">{tag}</Badge>
                        ))}
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
