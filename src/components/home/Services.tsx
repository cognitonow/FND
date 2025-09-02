
import { Briefcase, Download } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const experiences = [
    {
        icon: <Briefcase className="w-8 h-8 text-primary" />,
        company: 'Studio NVS',
        role: 'Design Consultant/Interior Architect',
        details: '2025 | Singapore',
        logoUrl: null,
        countryCode: 'sg'
    },
    {
        icon: null,
        company: 'Reddy Architecture + Urbanism',
        role: 'Construction Project Manager – Interiors',
        details: '2024 | Dublin',
        logoUrl: 'https://img.logo.dev/reddyarchitecture.com?token=pk_TAknTcNzR4eGaBiUIH2_ew&format=png',
        countryCode: 'ie'
    },
    {
        icon: null,
        company: 'Cognito Solution',
        role: 'Freelance/Interior Architect',
        details: '2023 | Dublin',
        logoUrl: 'https://img.logo.dev/cognito.ie?token=pk_TAknTcNzR4eGaBiUIH2_ew&format=png',
        countryCode: 'ie'
    },
    {
        icon: null,
        company: 'Foster + Partners',
        role: 'Interior Architect',
        details: '2022 | Hong Kong',
        logoUrl: 'https://img.logo.dev/fosterandpartners.com?token=pk_TAknTcNzR4eGaBiUIH2_ew&format=png',
        countryCode: 'hk'
    },
    {
        icon: null,
        company: 'Paragon Group',
        role: 'Interior Architect',
        details: '2021 | Johannesburg',
        logoUrl: 'https://img.logo.dev/paragongroup.co.za?token=pk_TAknTcNzR4eGaBiUIH2_ew&format=png',
        countryCode: 'za'
    },
     {
        icon: null,
        company: 'Atomic',
        role: 'Head of Design',
        details: '2020 | Johannesburg',
        logoUrl: 'https://img.logo.dev/atomic.design?token=pk_TAknTcNzR4eGaBiUIH2_ew&format=png',
        countryCode: 'za'
    },
];

export function Services() {
  return (
    <section className="container mx-auto px-4 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start w-full">
            <div className="flex flex-col gap-6 items-start lg:sticky lg:top-24">
                <h2 className="text-5xl font-bold tracking-tighter">
                  Work Experience
                </h2>
                <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download my CV
                </Button>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {experiences.map((exp) => (
                    <div key={exp.company} className="group flex flex-col bg-background p-4 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                       <div>
                           <div className="flex items-start gap-4 mb-4">
                             <div className="bg-white p-2 rounded-full mt-1">
                                {exp.logoUrl ? (
                                    <Image src={exp.logoUrl} alt={`${exp.company} logo`} width={24} height={24} className="object-contain" />
                                ) : (
                                    <Briefcase className="w-6 h-6 text-primary" />
                                )}
                             </div>
                             <div className="flex-grow">
                                 <p className="text-muted-foreground text-sm">{exp.company}</p>
                                 <h4 className="text-lg font-bold">{exp.role}</h4>
                             </div>
                           </div>
                       </div>
                       
                       <div className="border-t pt-4 flex justify-between items-center text-sm text-muted-foreground">
                         <span>{exp.details}</span>
                         <Image 
                            src={`https://flagcdn.com/w20/${exp.countryCode}.png`}
                            alt={`${exp.countryCode} flag`}
                            width={20}
                            height={15}
                            className="object-contain rounded-sm border border-muted"
                         />
                       </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
