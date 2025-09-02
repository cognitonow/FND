
"use client";

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const projects = [
    {
        name: 'ZENPOINT',
        company: 'Zenith',
        country: 'Singapore',
        sector: 'Wellness',
        projectType: ['UI DESIGN', 'WEB DEV'],
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop',
        dataAiHint: 'serene beach landscape',
    },
    {
        name: 'PAYU',
        company: 'PayU',
        country: 'South Africa',
        sector: 'Fintech',
        projectType: ['UI DESIGN', 'WEB DEV'],
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
        dataAiHint: 'modern office collaboration'
    },
    {
        name: 'COMPAI',
        company: 'CompAI',
        country: 'Ireland',
        sector: 'AI',
        projectType: ['UI DESIGN', 'MOBILE DEV', 'WEB DEV'],
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1573496774221-9d69a58405a4?q=80&w=2069&auto=format&fit=crop',
        dataAiHint: 'pocket companion device'
    },
    {
        name: 'CHATPIC.AI',
        company: 'ChatPic',
        country: 'Ghana',
        sector: 'AI',
        projectType: ['UI DESIGN', 'MOBILE DEV'],
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1694663361546-936528987483?q=80&w=1974&auto=format&fit=crop',
        dataAiHint: 'ai chat application'
    },
]

type FilterCategory = 'company' | 'country' | 'sector' | 'projectType';

export default function PortfolioPage() {
  const [filters, setFilters] = useState<Record<FilterCategory, string>>({
    company: 'All',
    country: 'All',
    sector: 'All',
    projectType: 'All'
  });

  const getUniqueValues = (category: FilterCategory) => {
    const values = new Set<string>();
    if (category === 'projectType') {
        projects.forEach(p => p.projectType.forEach(t => values.add(t)));
    } else {
        projects.forEach(p => values.add(p[category]));
    }
    return ['All', ...Array.from(values).sort()];
  };
  
  const filterOptions = useMemo(() => ({
    company: getUniqueValues('company'),
    country: getUniqueValues('country'),
    sector: getUniqueValues('sector'),
    projectType: getUniqueValues('projectType'),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  const handleFilterChange = (category: FilterCategory, value: string) => {
    setFilters(prev => ({ ...prev, [category]: value }));
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      return (Object.keys(filters) as FilterCategory[]).every(key => {
        if (filters[key] === 'All') return true;
        if (key === 'projectType') {
            return p.projectType.includes(filters[key]);
        }
        return p[key] === filters[key];
      });
    });
  }, [filters]);

  const FilterDropdown = ({ title, category, options }: { title: string, category: FilterCategory, options: string[] }) => (
      <Select value={filters[category]} onValueChange={(value) => handleFilterChange(category, value)}>
        <SelectTrigger className="w-full sm:w-auto h-8 rounded-full px-4 text-xs">
            <div className="flex items-center gap-2">
                 <span className="text-muted-foreground">{title}:</span>
                 <SelectValue />
            </div>
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
  );


  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Portfolio
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          A selection of my best work. Use the filters below to navigate through the projects.
        </p>
      </section>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          <FilterDropdown title="Company" category="company" options={filterOptions.company} />
          <FilterDropdown title="Country" category="country" options={filterOptions.country} />
          <FilterDropdown title="Sector" category="sector" options={filterOptions.sector} />
          <FilterDropdown title="Project Type" category="projectType" options={filterOptions.projectType} />
      </div>


      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
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
                        {project.projectType.map(tag => (
                             <Badge key={tag} variant="outline" className="font-light bg-accent/10">{tag}</Badge>
                        ))}
                    </div>
                </div>
            ))}
             {filteredProjects.length === 0 && (
                <div className="md:col-span-2 text-center py-16">
                    <p className="text-muted-foreground">No projects match the current filters.</p>
                </div>
             )}
        </div>
      </section>
    </div>
  );
}
