
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const projects = [
    {
        name: 'BWDC Residential Tower',
        company: 'Foster + Partners / BWDC',
        country: 'Philippines',
        countryCode: 'ph',
        sector: 'High End Residential',
        projectType: ['New Build'],
        year: '2022',
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41fa1299?q=80&w=2187&auto=format&fit=crop',
        dataAiHint: 'modern living room, kitchen',
        featured: true,
    },
    {
        name: 'Crown Safari Lodge',
        company: 'Crown Forest / Crown Safari',
        country: 'Ghana',
        countryCode: 'gh',
        sector: 'Hospitality',
        projectType: ['New Build'],
        year: '2022',
        imageUrl: 'https://images.unsplash.com/photo-1617850849332-ce8a77918177?q=80&w=2070&auto=format&fit=crop',
        dataAiHint: 'luxury safari lodge, reception',
    },
    {
        name: 'UN Zambia Office Refurb',
        company: 'Cognito Solution',
        country: 'Zambia',
        countryCode: 'zm',
        sector: 'Commercial',
        projectType: ['Refurbishment'],
        year: '2022',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
        dataAiHint: 'modern office interior, collaboration space',
    },
];

export function PortfolioSection() {
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured).slice(0,2);

  return (
    <section className="container mx-auto px-4 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col gap-6 items-start lg:sticky lg:top-24">
            <h2 className="text-5xl font-bold tracking-tighter">
              Selected work
            </h2>
            <Button size="lg" variant="secondary" asChild>
                <Link href="/portfolio">See All</Link>
            </Button>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProject && (
                <div key={featuredProject.name} className="md:col-span-2 bg-background/50 rounded-3xl p-6 transition-transform hover:scale-[1.02] hover:shadow-xl">
                    <div className="aspect-video relative mb-6">
                        <Image
                        src={featuredProject.imageUrl}
                        alt={featuredProject.name}
                        fill
                        className="rounded-2xl object-cover"
                        data-ai-hint={featuredProject.dataAiHint}
                        />
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                        <span>{featuredProject.name}</span>
                        <span>{featuredProject.year}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                         <Badge variant="outline" className="font-light bg-accent/10">{featuredProject.sector}</Badge>
                        {featuredProject.projectType.map(tag => (
                             <Badge key={tag} variant="outline" className="font-light bg-accent/10">{tag}</Badge>
                        ))}
                    </div>
                </div>
            )}
            {otherProjects.map((project) => (
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
                        <Badge variant="outline" className="font-light bg-accent/10">{project.sector}</Badge>
                        {project.projectType.map(tag => (
                             <Badge key={tag} variant="outline" className="font-light bg-accent/10">{tag}</Badge>
                        ))}
                    </div>
                </div>
            ))}
          </div>
        </div>
    </section>
  );
}
