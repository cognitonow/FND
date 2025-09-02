
import { Briefcase } from 'lucide-react';
import Image from 'next/image';

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
        company: 'Cognito Solution',
        role: 'Freelance/Interior Architect',
        details: '2023 | Dublin',
        logoUrl: 'https://img.logo.dev/cognito.ie?token=pk_TAknTcNzR4eGaBiUIH2_ew&format=png',
        countryCode: 'ie'
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
    <section className="bg-muted/30 py-24 sm:py-32">
        <div className="container mx-auto px-4">
            <div className="bg-primary text-primary-foreground p-12 rounded-3xl mb-24">
                <h2 className="text-4xl font-bold max-w-4xl mb-8">
                    My mission is to assist startups and enterprises in creating an emotional bond between their products and satisfied, engaged customers.
                </h2>
                <div className="flex items-center gap-x-8 gap-y-8 flex-wrap">
                    {logos.map(logo => (
                        <div key={logo.name} className="relative h-10 w-auto flex items-center justify-center">
                            <Image 
                                src={logo.src} 
                                alt={logo.name} 
                                className="object-contain h-full w-full"
                                width={100}
                                height={40}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 items-start gap-16">
                <div className="lg:col-span-1">
                    <h3 className="text-5xl font-bold tracking-tighter">Where have I worked?</h3>
                </div>
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {experiences.map((exp) => (
                        <div key={exp.company} className="group flex flex-col bg-background p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                           <div className="flex items-center gap-4 mb-4">
                             <div className="bg-muted p-2 rounded-full">
                                {exp.logoUrl ? (
                                    <Image src={exp.logoUrl} alt={`${exp.company} logo`} width={24} height={24} className="object-contain" />
                                ) : (
                                    <Briefcase className="w-6 h-6 text-primary" />
                                )}
                             </div>
                             <h4 className="text-xl font-bold">{exp.company}</h4>
                           </div>
                           
                           <p className="text-muted-foreground flex-grow mb-4">{exp.role}</p>
                           
                           <div className="border-t pt-4 flex justify-between items-center text-sm text-muted-foreground">
                             <span>{exp.details}</span>
                             <Image 
                                src={`https://flagcdn.com/w20/${exp.countryCode}.png`}
                                alt={`${exp.countryCode} flag`}
                                width={20}
                                height={15}
                                className="object-contain rounded-sm"
                             />
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}
