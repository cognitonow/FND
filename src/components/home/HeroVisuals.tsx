
"use client"

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"


const projects = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/project1/1600/900',
    dataAiHint: 'modern living room'
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/project2/1600/900',
    dataAiHint: 'corporate office lobby'
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/seed/project3/1600/900',
    dataAiHint: 'boutique hotel interior'
  },
];

const collaborations = [
    { id: 'collab1', company: 'Foster + Partners / BWDC', project: 'Project: BWDC Residential Tower, Manila' },
    { id: 'collab2', company: 'Crown Forest / Crown Safari', project: 'Project: Crown Safari Lodge, Ghana' },
    { id: 'collab3', company: 'Cognito Solution', project: 'Project: UN Zambia office refurb' },
    { id: 'collab4', company: 'Accenture', project: 'Project: Commercial refurbishment, Johannesburg' },
    { id: 'collab5', company: 'Goldman Sachs', project: 'Project: Commercial fit-out at 140 West Street, Sandton' },
    { id: 'collab6', company: 'Stanbic IBTC Pension Managers', project: 'Project: Commercial fit-out for the tallest building in West Africa' },
    { id: 'collab7', company: 'DRA / Minopex / Paragon Group', project: 'Project: Therapy Sanctuary / Meeting Suite' },
    { id: 'collab8', company: 'Intra Design', project: 'Project: Various office receptions during internship' },
];

const toolsetLogos = [
    { id: 'tool1', imageUrl: 'https://picsum.photos/seed/archicad/100/100', alt: 'ArchiCAD', dataAiHint: 'software logo' },
    { id: 'tool2', imageUrl: 'https://picsum.photos/seed/dynamo/100/100', alt: 'Dynamo', dataAiHint: 'software logo' },
    { id: 'tool3', imageUrl: 'https://picsum.photos/seed/bim360/100/100', alt: 'BIM 360', dataAiHint: 'software logo' },
    { id: 'tool4', imageUrl: 'https://picsum.photos/seed/rhino/100/100', alt: 'Rhino', dataAiHint: 'software logo' },
    { id: 'tool5', imageUrl: 'https://picsum.photos/seed/adobesuite/100/100', alt: 'Adobe Suite', dataAiHint: 'software logo' },
    { id: 'tool6', imageUrl: 'https://picsum.photos/seed/rayon/100/100', alt: 'Rayon', dataAiHint: 'software logo' },
    { id: 'tool7', imageUrl: 'https://picsum.photos/seed/revit/100/100', alt: 'Revit', dataAiHint: 'software logo' },
    { id: 'tool8', imageUrl: 'https://picsum.photos/seed/pyrevit/100/100', alt: 'Pyrevit', dataAiHint: 'software logo' },
];


export function HeroVisuals() {
    return (
        <div className="relative h-[500px] flex items-center justify-center">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/50 to-primary/20 rounded-full blur-3xl -z-10"></div>
            
            {/* Profile Picture */}
             <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden shadow-2xl z-10 border-4 border-background">
                <Image src="https://picsum.photos/seed/profile/400/400" alt="Profile Picture" width={200} height={200} className="object-cover" data-ai-hint="professional headshot" />
            </Card>

            {/* Project Carousel Card */}
            <Card className="absolute top-0 left-0 w-80 h-52 shadow-xl hover:scale-105 transition-transform duration-300">
                <Carousel className="w-full h-full" opts={{ loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
                    <CarouselContent>
                        {projects.map(p => (
                            <CarouselItem key={p.id}>
                                <Image src={p.imageUrl} alt="Project Snippet" width={320} height={208} className="object-cover rounded-lg" data-ai-hint={p.dataAiHint} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </Card>

            {/* BIM Specialist Badge */}
            <Card className="absolute top-16 right-0 w-48 p-4 shadow-lg hover:rotate-3 transition-transform duration-300">
                <h3 className="font-bold">BIM Specialist</h3>
                <p className="text-sm text-muted-foreground">Revit, Archicad</p>
            </Card>

            {/* Toolset Card */}
             <Card className="absolute bottom-16 right-0 w-64 p-4 shadow-lg hover:-rotate-3 transition-transform duration-300">
                <h3 className="font-bold mb-2 text-center">My Toolset</h3>
                <div className="grid grid-cols-4 gap-4 p-2">
                    {toolsetLogos.map((tool) => (
                        <Image key={tool.id} src={tool.imageUrl} alt={tool.alt} width={40} height={40} className="rounded-full object-contain bg-white" data-ai-hint={tool.dataAiHint} title={tool.alt} />
                    ))}
                </div>
            </Card>
            
            {/* Collaborations Card */}
            <Card className="absolute bottom-0 left-0 w-72 h-28 p-4 shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                 <Carousel className="w-full" opts={{ loop: true, align: "start" }} plugins={[Autoplay({ delay: 3000 })]}>
                    <CarouselContent>
                        {collaborations.map((collab) => (
                            <CarouselItem key={collab.id}>
                                <div className="text-center">
                                    <p className="font-semibold text-sm">{collab.company}</p>
                                    <p className="text-xs text-muted-foreground">{collab.project}</p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </Card>
        </div>
    )
}
