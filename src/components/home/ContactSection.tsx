
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, Linkedin, Mail, Youtube } from 'lucide-react';
import Link from 'next/link';

type ContactSectionProps = {
    onScrollToTop: () => void;
};

export function ContactSection({ onScrollToTop }: ContactSectionProps) {
    const year = new Date().getFullYear();
  return (
    <section className="container mx-auto px-4 w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
            <div className="flex flex-col gap-6 items-start lg:sticky top-24 h-fit">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                Get In Touch
                </h2>
                <p className="text-base max-w-3xl text-muted-foreground">
                Have a project in mind? I&apos;d love to hear from you.
                </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="mailto:Fanisampofu@gmail.com" className="group">
                    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow h-full">
                        <CardHeader className="flex-row items-center gap-4 p-0">
                            <div className="bg-primary text-primary-foreground rounded-lg p-3 w-fit">
                                <Mail />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Email</CardTitle>
                                <p className="text-muted-foreground group-hover:text-primary transition-colors">Fanisampofu@gmail.com</p>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="https://linkedin.com/in/fanisa-mpofu-/" target="_blank" rel="noopener noreferrer" className="group">
                    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow h-full">
                        <CardHeader className="flex-row items-center gap-4 p-0">
                            <div className="bg-primary text-primary-foreground rounded-lg p-3 w-fit">
                                <Linkedin />
                            </div>
                            <div>
                                <CardTitle className="text-xl">LinkedIn</CardTitle>
                                <p className="text-muted-foreground group-hover:text-primary transition-colors">/in/fanisa-mpofu-/</p>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>
                 <Link href="https://www.youtube.com/@RevitInteriors" target="_blank" rel="noopener noreferrer" className="group">
                    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow h-full">
                        <CardHeader className="flex-row items-center gap-4 p-0">
                           <div className="bg-primary text-primary-foreground rounded-lg p-3 w-fit">
                                <Youtube />
                            </div>
                            <div>
                                <CardTitle className="text-xl">YouTube</CardTitle>
                                <p className="text-muted-foreground group-hover:text-primary transition-colors">@RevitInteriors</p>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>
                 <div className="md:col-span-2 border-t pt-8 mt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">&copy; {year} FND.ME. All rights reserved.</p>
                        <Button variant="ghost" onClick={onScrollToTop}>Back to Top <ArrowUp className="ml-2 h-4 w-4"/></Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
