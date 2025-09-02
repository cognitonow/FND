
import { Paintbrush, Code, Pencil, Type } from 'lucide-react';
import Image from 'next/image';

const services = [
    {
        icon: <Paintbrush className="w-8 h-8 text-primary" />,
        title: 'UI Design',
        description: 'We create intuitive, visually appealing interfaces that enhance user experience and navigation, ensuring your app is both beautiful and functional across all devices.',
        number: '01',
    },
    {
        icon: <Code className="w-8 h-8 text-primary" />,
        title: 'Development',
        description: 'Our team builds reliable, scalable solutions, delivering clean code that powers websites and mobile apps with top-notch performance and security.',
        number: '02',
    },
    {
        icon: <Pencil className="w-8 h-8 text-primary" />,
        title: 'Graphic Design',
        description: "We design responsive, user-friendly websites that blend aesthetics with functionality, providing a seamless experience across devices and reflecting your brand's identity.",
        number: '03',
    },
    {
        icon: <Type className="w-8 h-8 text-primary" />,
        title: 'Branding',
        description: 'We craft memorable brand identities, from logos to complete strategies, ensuring consistency and a strong connection with your audience across all platforms.',
        number: '04',
    },
];

const logos = [
    { name: 'Foster + Partners', src: 'https://logo.clearbit.com/fosterandpartners.com' },
    { name: 'Accenture', src: 'https://logo.clearbit.com/accenture.com' },
    { name: 'Goldman Sachs', src: 'https://logo.clearbit.com/gs.com' },
    { name: 'Stanbic IBTC', src: 'https://logo.clearbit.com/stanbicibtc.com' },
    { name: 'Minopex', src: 'https://logo.clearbit.com/minopex.com' },
    { name: 'Paragon Group', src: 'https://logo.clearbit.com/paragongroup.co.za' },
]

export function Services() {
  return (
    <section className="bg-muted/30 py-24 sm:py-32">
        <div className="container mx-auto px-4">
            <div className="bg-primary text-primary-foreground p-12 rounded-3xl mb-24">
                <h2 className="text-4xl font-bold max-w-4xl mb-8">
                    My mission is to assist startups and enterprises in creating an emotional bond between their products and satisfied, engaged customers.
                </h2>
                <div className="flex items-center gap-x-12 gap-y-8 flex-wrap">
                    {logos.map(logo => (
                        <div key={logo.name} className="relative h-8 w-32">
                            <Image 
                                src={logo.src} 
                                alt={logo.name} 
                                fill
                                className="object-contain brightness-0 invert" 
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 items-start gap-16">
                <div className="lg:col-span-1">
                    <h3 className="text-5xl font-bold tracking-tighter">How Can I Assist You?</h3>
                </div>
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                    {services.map((service) => (
                        <div key={service.title} className="group relative bg-background p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                           <div className="flex items-start justify-between mb-4">
                             <div className="bg-primary/10 p-3 rounded-full">
                                {service.icon}
                             </div>
                           </div>
                           <p className="text-muted-foreground mb-6 h-24">{service.description}</p>
                           <div className="flex justify-between items-end">
                             <h4 className="text-2xl font-bold">{service.title}</h4>
                             <span className="text-5xl font-bold text-muted/20 group-hover:text-primary transition-colors duration-300">{service.number}</span>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}
