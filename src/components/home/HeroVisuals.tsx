
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

const companyLogos = [
    { id: 'logo1', imageUrl: 'https://picsum.photos/seed/logo1/200/100?grayscale', alt: 'Company 1', dataAiHint: 'company logo' },
    { id: 'logo2', imageUrl: 'https://picsum.photos/seed/logo2/200/100?grayscale', alt: 'Company 2', dataAiHint: 'company logo' },
    { id: 'logo3', imageUrl: 'https://picsum.photos/seed/logo3/200/100?grayscale', alt: 'Company 3', dataAiHint: 'company logo' },
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
                        <Image key={tool.id} src={tool.imageUrl} alt={tool.alt} width={40} height={40} className="rounded-full object-contain" data-ai-hint={tool.dataAiHint} title={tool.alt} />
                    ))}
                </div>
            </Card>
            
            {/* Company Logos Card */}
            <Card className="absolute bottom-0 left-0 w-60 h-24 p-4 shadow-lg hover:scale-105 transition-transform duration-300">
                <p className="text-xs text-muted-foreground mb-2">Collaborated with</p>
                 <div className="flex gap-4 items-center">
                    {companyLogos.map(logo => (
                        <Image key={logo.id} src={logo.imageUrl} alt={logo.alt} width={40} height={40} className="object-contain" data-ai-hint={logo.dataAiHint} />
                    ))}
                </div>
            </Card>
        </div>
    )
}
