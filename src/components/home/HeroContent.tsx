import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function HeroContent() {
    return (
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
    )
}
