
"use client"

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import type { Article } from '@/types';
import type { Collaboration } from '@/types';
import Link from 'next/link';
import { Quote } from 'lucide-react';


const collaborations: Collaboration[] = [
    { id: 'collab1', company: 'Foster + Partners / BWDC', project: 'Project: BWDC Residential Tower, Manila', imageUrl: 'https://picsum.photos/seed/collab1/400/400', dataAiHint: 'modern skyscraper architecture' },
    { id: 'collab2', company: 'Crown Forest / Crown Safari', project: 'Project: Crown Safari Lodge, Ghana', imageUrl: 'https://picsum.photos/seed/collab2/400/400', dataAiHint: 'luxury safari lodge' },
    { id: 'collab3', company: 'Cognito Solution', project: 'Project: UN Zambia office refurb', imageUrl: 'https://picsum.photos/seed/collab3/400/400', dataAiHint: 'modern office interior' },
    { id: 'collab4', company: 'Accenture', project: 'Project: Commercial refurbishment, Johannesburg', imageUrl: 'https://picsum.photos/seed/collab4/400/400', dataAiHint: 'corporate building exterior' },
    { id: 'collab5', company: 'Goldman Sachs', project: 'Project: Commercial fit-out at 140 West Street, Sandton', imageUrl: 'https://picsum.photos/seed/collab5/400/400', dataAiHint: 'financial district building' },
    { id: 'collab6', company: 'Stanbic IBTC Pension Managers', project: 'Project: Commercial fit-out for the tallest building in West Africa', imageUrl: 'https://picsum.photos/seed/collab6/400/400', dataAiHint: 'tall skyscraper africa' },
    { id: 'collab7', company: 'DRA / Minopex / Paragon Group', project: 'Project: Therapy Sanctuary / Meeting Suite', imageUrl: 'https://picsum.photos/seed/collab7/400/400', dataAiHint: 'calm sanctuary interior' },
    { id: 'collab8', company: 'Intra Design', project: 'Project: Various office receptions during internship', imageUrl: 'https://picsum.photos/seed/collab8/400/400', dataAiHint: 'office reception design' },
];

const toolsetLogos = [
    { id: 'tool1', imageUrl: 'https://img.logo.dev/graphisoft.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'ArchiCAD' },
    { id: 'tool2', imageUrl: 'https://img.logo.dev/autodesk.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'Dynamo' },
    { id: 'tool3', imageUrl: 'https://img.logo.dev/autodesk.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'BIM 360' },
    { id: 'tool4', imageUrl: 'https://img.logo.dev/rhino3d.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'Rhino' },
    { id: 'tool5', imageUrl: 'https://img.logo.dev/adobe.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'Adobe Suite' },
    { id: 'tool6', imageUrl: 'https://img.logo.dev/rayon.design?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'Rayon' },
    { id: 'tool7', imageUrl: 'https://img.logo.dev/twinmotion.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'Twinmotion' },
    { id: 'tool8', imageUrl: 'https://img.logo.dev/d5render.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'D5 Render' },
    { id: 'tool9', imageUrl: 'https://img.logo.dev/enscape3d.com?token=pk_TAknTcNzR4eGaBiUIH2_ew', alt: 'Enscape' },
];

type HeroVisualsProps = {
    articles: Article[];
}

export function HeroVisuals({ articles }: HeroVisualsProps) {
    return (
        <div className="relative h-[500px] flex items-center justify-center">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/50 to-primary/20 rounded-full blur-3xl -z-10"></div>
            
            <div className="w-full h-full flex flex-col gap-4">
                {/* Row 1 */}
                <div className="flex-[0.9] flex gap-4">
                    {/* Latest Articles Card */}
                    <div className="w-2/5">
                         <Card className="w-full h-full shadow-xl hover:scale-105 transition-transform duration-300">
                            <Carousel className="w-full h-full" opts={{ loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
                                <CarouselContent>
                                    {articles.length > 0 ? articles.map(article => (
                                        <CarouselItem key={article.id}>
                                            <Link href={`/articles/${article.slug}`} className="group h-full flex flex-col">
                                                <div className="relative w-full h-full">
                                                    {article.thumbnailUrl ? (
                                                        <Image src={article.thumbnailUrl} alt={article.title} fill className="object-cover rounded-lg" data-ai-hint="article thumbnail" />
                                                    ) : (
                                                        <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                                                            <span className="text-muted-foreground">No Image</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg"></div>
                                                    <div className="absolute bottom-0 left-0 p-4">
                                                        <h3 className="text-white font-bold text-lg group-hover:underline">{article.title}</h3>
                                                        <p className="text-white/80 text-sm mt-1">Read Now &rarr;</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </CarouselItem>
                                    )) : (
                                        <CarouselItem>
                                            <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center p-4 text-center">
                                                <span className="text-muted-foreground">No articles published yet.</span>
                                            </div>
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                            </Carousel>
                        </Card>
                    </div>
                     {/* Top of Mind Quote */}
                    <div className="w-3/5">
                        <Card className="w-full h-full p-6 shadow-lg hover:rotate-1 transition-transform duration-300 flex flex-col justify-center items-center text-center relative overflow-hidden">
                           <Quote className="absolute -top-4 -left-4 text-primary/10 w-24 h-24" />
                           <h4 className="text-lg font-semibold mb-2">Quote of the Day</h4>
                           <p className="text-lg text-muted-foreground mt-2">&quot;The home should be the treasure chest of living.&quot;</p>
                           <p className="text-sm font-medium mt-4">- Le Corbusier</p>
                           <Quote className="absolute -bottom-4 -right-4 text-primary/10 w-24 h-24" />
                        </Card>
                    </div>
                </div>

                 {/* Row 2 */}
                <div className="flex-1 flex gap-4">
                    {/* Collaborations Card */}
                    <div className="w-3/5">
                        <Card className="w-full h-full p-4 shadow-lg hover:scale-105 transition-transform duration-300">
                            <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }} plugins={[Autoplay({ delay: 4000 })]}>
                                <CarouselContent>
                                    {collaborations.map((collab) => (
                                        <CarouselItem key={collab.id}>
                                            <div className="flex flex-col h-full text-left">
                                                <div className="w-full aspect-video relative mb-4">
                                                     <Image src={collab.imageUrl} alt={collab.company} fill className="rounded-md object-cover" data-ai-hint={collab.dataAiHint} />
                                                </div>
                                                <div className="px-2">
                                                    <p className="font-semibold text-sm">{collab.company}</p>
                                                    <p className="text-xs text-muted-foreground">{collab.project}</p>
                                                </div>
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
                                      <Image src={tool.imageUrl} alt={tool.alt} width={40} height={40} className="rounded-full object-contain bg-white p-1" data-ai-hint="software logo" title={tool.alt} />
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
