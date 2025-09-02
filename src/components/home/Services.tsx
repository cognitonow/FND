
import { Briefcase, Download } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
];

const logos = [
    { name: 'Foster + Partners', src: 'https://img.logo.dev/fosterandpartners.com?theme=dark&format=png&token=pk_TAknTcNzR4eGaBiUIH2_ew' },
    { name: 'Accenture', src: 'https://img.logo.dev/accenture.com?theme=dark&format=png&token=pk_TAknTcNzR4eGaBiUIH2_ew' },
    { name: 'Goldman Sachs', src: 'https://img.logo.dev/gs.com?theme=dark&format=png&token=pk_TAknTcNzR4eGaBiUIH2_ew' },
    { name: 'Stanbic IBTC', src: 'https://img.logo.dev/stanbicibtc.com?theme=dark&format=png&token=pk_TAknTcNzR4eGaBiUIH2_ew' },
    { name: 'Minopex', src: 'https://img.logo.dev/minopex.com?theme=dark&format=png&token=pk_TAknTcNzR4eGaBiUIH2_ew' },
    { name: 'Paragon Group', src: 'https://img.logo.dev/paragongroup.co.za?theme=dark&format=png&token=pk_TAknTcNzR4eGaBiUIH2_ew' },
]

export function Services() {
  return (
    <>
    <section className="bg-muted/30 py-24 sm:py-32">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="flex flex-col justify-center items-start text-left p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-3xl font-bold tracking-tighter mb-4">Wanna see my experience?</h3>
                    <p className="text-muted-foreground mb-6">Download my full CV to see my full jouney.</p>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download my CV
                    </Button>
                </Card>

                {experiences.map((exp) => (
                    <div key={exp.company} className="group flex flex-col bg-background p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                       <div className="flex-grow">
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
    </>
  )
}
