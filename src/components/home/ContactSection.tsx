
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Linkedin, Mail, Youtube } from 'lucide-react';
import Link from 'next/link';

export function ContactSection() {
  return (
    <section className="container mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="flex flex-col gap-6 items-start lg:sticky lg:top-24">
                <h2 className="text-5xl font-bold tracking-tighter">
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
                            <CardTitle className="text-xl">Email</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pt-4">
                            <p className="text-muted-foreground group-hover:text-primary transition-colors">Fanisampofu@gmail.com</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="https://linkedin.com/in/fanisa-mpofu-/" target="_blank" rel="noopener noreferrer" className="group">
                    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow h-full">
                        <CardHeader className="flex-row items-center gap-4 p-0">
                            <div className="bg-primary text-primary-foreground rounded-lg p-3 w-fit">
                                <Linkedin />
                            </div>
                             <CardTitle className="text-xl">LinkedIn</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pt-4">
                            <p className="text-muted-foreground group-hover:text-primary transition-colors">linkedin.com/in/fanisa-mpofu-/</p>
                        </CardContent>
                    </Card>
                </Link>
                 <Link href="https://www.youtube.com/@RevitInteriors" target="_blank" rel="noopener noreferrer" className="group">
                    <Card className="p-6 shadow-md hover:shadow-xl transition-shadow h-full">
                        <CardHeader className="flex-row items-center gap-4 p-0">
                           <div className="bg-primary text-primary-foreground rounded-lg p-3 w-fit">
                                <Youtube />
                            </div>
                            <CardTitle className="text-xl">YouTube</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pt-4">
                            <p className="text-muted-foreground group-hover:text-primary transition-colors">@RevitInteriors</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    </section>
  );
}
