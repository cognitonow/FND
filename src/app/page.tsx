import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types';

const projects: Project[] = [
  {
    id: '1',
    title: 'AI Content Generator',
    description: 'A SaaS platform that uses generative AI to create blog posts from YouTube videos.',
    imageUrl: 'https://picsum.photos/600/400?grayscale',
    tags: ['Next.js', 'Firebase', 'GenAI'],
    link: '#',
    dataAiHint: 'technology code'
  },
  {
    id: '2',
    title: 'Modern E-commerce Store',
    description: 'A sleek, fast, and responsive e-commerce front-end with a custom CMS.',
    imageUrl: 'https://picsum.photos/600/400?grayscale',
    tags: ['React', 'GraphQL', 'Tailwind'],
    link: '#',
    dataAiHint: 'modern architecture'
  },
  {
    id: '3',
    title: 'Data Visualization Dashboard',
    description: 'An analytics dashboard for visualizing complex business intelligence data.',
    imageUrl: 'https://picsum.photos/600/400?grayscale',
    tags: ['D3.js', 'TypeScript', 'Node.js'],
    link: '#',
    dataAiHint: 'chart graph'
  },
   {
    id: '4',
    title: 'Branding for a Startup',
    description: 'Complete brand identity design, from logo to style guide, for a new tech startup.',
    imageUrl: 'https://picsum.photos/600/400?grayscale',
    tags: ['Figma', 'Branding', 'UI/UX'],
    link: '#',
    dataAiHint: 'design creative'
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Design & Technology Intersect
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mb-8">
          Welcome to my digital space. I build beautiful, functional, and AI-powered web experiences. Explore my work below.
        </p>
        <Button asChild size="lg">
          <Link href="/articles">
            Read My Articles <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
          Selected Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="overflow-hidden aspect-video">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={project.dataAiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-base">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                 <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={project.link}>
                      View Project <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
