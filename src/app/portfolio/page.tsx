
"use client";

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';


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
    {
        name: 'Accenture Office Refurbishment',
        company: 'Accenture',
        country: 'South Africa',
        countryCode: 'za',
        sector: 'Commercial',
        projectType: ['Refurbishment'],
        year: '2022',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop',
        dataAiHint: 'corporate reception, office lobby',
    },
    {
        name: '140 West Street Fit-Out',
        company: 'Goldman Sachs',
        country: 'South Africa',
        countryCode: 'za',
        sector: 'Fintech',
        projectType: ['Fit-Out'],
        year: '2022',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1978&auto=format&fit=crop',
        dataAiHint: 'modern office building, teamwork',
    },
    {
        name: 'Stanbic IBTC Tower Fit-Out',
        company: 'Stanbic IBTC Pension Managers',
        country: 'Nigeria',
        countryCode: 'ng',
        sector: 'Fintech',
        projectType: ['Fit-Out'],
        year: '2022',
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop',
        dataAiHint: 'modern office atrium, collaborative workspace',
    },
    {
        name: "Therapy Sanctuary",
        company: "DRA / Minopex / Paragon Group",
        country: "South Africa",
        countryCode: "za",
        sector: "Wellness",
        projectType: ["Fit-Out"],
        year: "2022",
        imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
        dataAiHint: "modern office cafe, atrium"
    }
];


export default function PortfolioPage() {

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center mb-12">
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
                <Card key={project.name} className="bg-background p-6 transition-transform hover:scale-[1.02] shadow-md hover:shadow-xl">
                    <div className="aspect-video relative mb-6">
                        <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        className="rounded-2xl object-cover"
                        data-ai-hint={project.dataAiHint}
                        />
                    </div>
                    <div className="flex justify-between items-start text-sm text-muted-foreground mb-2">
                        <span>{project.name}</span>
                        <div className="flex flex-col items-end gap-1">
                            <span>{project.year}</span>
                            <Image 
                                src={`https://flagcdn.com/w20/${project.countryCode}.png`}
                                alt={`${project.country} flag`}
                                width={20}
                                height={15}
                                className="object-contain rounded-sm border border-muted"
                                title={project.country}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                         <Badge variant="outline" className="font-light bg-accent/10">{project.sector}</Badge>
                        {project.projectType.map(tag => (
                             <Badge key={tag} variant="outline" className="font-light bg-accent/10">{tag}</Badge>
                        ))}
                    </div>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
