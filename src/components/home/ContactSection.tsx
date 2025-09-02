
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Linkedin, Mail, Phone, Youtube } from 'lucide-react';
import Link from 'next/link';

const contactInfo = [
    {
        icon: <Phone />,
        title: 'Phone',
        value: '+353 87 719 7486',
        href: 'tel:+353877197486'
    },
    {
        icon: <Mail />,
        title: 'Email',
        value: 'Fanisampofu@gmail.com',
        href: 'mailto:Fanisampofu@gmail.com'
    },
    {
        icon: <Linkedin />,
        title: 'LinkedIn',
        value: 'linkedin.com/in/fanisa-mpofu-/',
        href: 'https://linkedin.com/in/fanisa-mpofu-/'
    },
    {
        icon: <Youtube />,
        title: 'YouTube',
        value: '@RevitInteriors',
        href: 'https://www.youtube.com/@RevitInteriors'
    }
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-5xl font-bold tracking-tighter">
              Get In Touch
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mt-4">
              Have a project in mind? I&apos;d love to hear from you.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="flex flex-col items-center text-center p-6 hover:shadow-xl transition-shadow">
                <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                        <Phone />
                    </div>
                    <CardTitle>Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                     <Link href="tel:+353877197486" className="text-muted-foreground hover:text-primary transition-colors block">+353 87 719 7486</Link>
                     <Link href="mailto:Fanisampofu@gmail.com" className="text-muted-foreground hover:text-primary transition-colors block">Fanisampofu@gmail.com</Link>
                </CardContent>
            </Card>
             <Card className="flex flex-col items-center text-center p-6 hover:shadow-xl transition-shadow">
                <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                        <Linkedin />
                    </div>
                    <CardTitle>LinkedIn</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                     <Link href="https://linkedin.com/in/fanisa-mpofu-/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        linkedin.com/in/fanisa-mpofu-/
                     </Link>
                </CardContent>
            </Card>
             <Card className="flex flex-col items-center text-center p-6 hover:shadow-xl transition-shadow">
                <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                        <Youtube />
                    </div>
                    <CardTitle>YouTube</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                     <Link href="https://www.youtube.com/@RevitInteriors" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        @RevitInteriors
                     </Link>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
