
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const projects = [
    {
        name: 'ZENPOINT',
        year: '2024',
        tags: ['UI DESIGN', 'WEB DEV'],
        imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop',
        dataAiHint: 'serene beach landscape',
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

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Portfolio
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          A selection of my best work.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
                <div key={project.name} className="bg-background/50 rounded-3xl p-6 transition-transform hover:scale-[1.02] hover:shadow-xl">
                    <div className="aspect-video relative mb-6">
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
      </section>
    </div>
  );
}
