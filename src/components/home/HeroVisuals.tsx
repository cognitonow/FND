
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
    { id: 'tool1', imageUrl: 'https://img.logo.dev/graphisoft.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'ArchiCAD' },
    { id: 'tool2', imageUrl: 'https://img.logo.dev/autodesk.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'Dynamo' },
    { id: 'tool3', imageUrl: 'https://img.logo.dev/autodesk.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'BIM 360' },
    { id: 'tool4', imageUrl: 'https://img.logo.dev/rhino3d.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'Rhino' },
    { id: 'tool5', imageUrl: 'https://img.logo.dev/adobe.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'Adobe Suite' },
    { id: 'tool6', imageUrl: 'https://img.logo.dev/rayon.design?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'Rayon' },
];


export function HeroVisuals() {
    return (
        <div className="relative h-[550px] flex items-center justify-center">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/50 to-primary/20 rounded-full blur-3xl -z-10"></div>
            
            <div className="w-full h-full flex flex-col gap-4">
                {/* Row 1 */}
                <div className="flex-1 flex gap-4">
                    {/* Project Carousel Card */}
                    <div className="w-2/5">
                        <Card className="w-full h-full shadow-xl hover:scale-105 transition-transform duration-300">
                            <Carousel className="w-full h-full" opts={{ loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
                                <CarouselContent>
                                    {projects.map(p => (
                                        <CarouselItem key={p.id}>
                                            <Image src={p.imageUrl} alt="Project Snippet" width={480} height={270} className="object-cover rounded-lg w-full h-full" data-ai-hint={p.dataAiHint} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </Card>
                    </div>
                     {/* BIM Specialist Badge */}
                    <div className="w-3/5">
                        <Card className="w-full h-full p-4 shadow-lg hover:rotate-3 transition-transform duration-300 flex flex-col justify-center items-center">
                            <h3 className="text-2xl font-bold">BIM Specialist</h3>
                            <p className="text-lg text-muted-foreground">Revit, Archicad</p>
                        </Card>
                    </div>
                </div>

                 {/* Row 2 */}
                <div className="flex-1 flex gap-4">
                    {/* Collaborations Card */}
                    <div className="w-3/5">
                        <Card className="w-full h-full p-4 shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                            <Carousel className="w-full" opts={{ loop: true, align: "start" }} plugins={[Autoplay({ delay: 4000 })]}>
                                <CarouselContent>
                                    {collaborations.map((collab) => (
                                        <CarouselItem key={collab.id}>
                                            <div className="text-left">
                                                <p className="text-xs text-muted-foreground">{collab.project}</p>
                                                <p className="font-semibold text-sm">{collab.company}</p>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </Card>
                    </div>
                     {/* Toolset Card */}
                    <div className="w-2/5">
                        <div className="w-full h-full flex flex-col justify-center">
                            <div className="grid grid-cols-3 gap-4 p-2">
                                {toolsetLogos.map((tool) => (
                                    <div key={tool.id} className="flex justify-center items-center">
                                      <Image src={tool.imageUrl} alt={tool.alt} width={60} height={60} className="rounded-full object-contain bg-white p-1" data-ai-hint="software logo" title={tool.alt} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
