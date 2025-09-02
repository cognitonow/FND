
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

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

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          <Badge variant="outline" className="w-fit">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for Work
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Interior Architect
          </h1>
          <p className="text-lg md:text-xl max-w-xl text-muted-foreground">
            I build and manage beautiful, functional spaces from concept to completion. My unique background in design, BIM technology, and construction project management ensures a seamless process and visionary results.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="mailto:hello@example.com">Contact Me <Mail className="ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#">View Portfolio <ArrowUpRight className="ml-2" /></Link>
            </Button>
          </div>
           <div className='flex gap-2 items-center text-muted-foreground'>
            <MapPin size={18}/>
            <span>London, UK</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative h-[500px] flex items-center justify-center">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/50 to-primary/20 rounded-full blur-3xl -z-10"></div>
            
            {/* Profile Picture */}
             <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden shadow-2xl z-10 border-4 border-background">
                <Image src="https://picsum.photos/seed/profile/400/400" alt="Profile Picture" width={200} height={200} className="object-cover" data-ai-hint="professional headshot" />
            </Card>

            {/* Project Carousel Card */}
            <Card className="absolute top-0 left-0 w-80 h-52 shadow-xl hover:scale-105 transition-transform duration-300">
                <Carousel className="w-full h-full" opts={{ loop: true }}>
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

            {/* Construction PM Badge */}
             <Card className="absolute bottom-24 right-0 w-52 p-4 shadow-lg hover:-rotate-3 transition-transform duration-300">
                <h3 className="font-bold">Construction PM</h3>
                <p className="text-sm text-muted-foreground">Execution & Strategy</p>
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
      </section>
    </div>
  );
}
