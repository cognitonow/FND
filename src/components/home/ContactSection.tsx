
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Linkedin, Mail, Youtube } from 'lucide-react';
import Link from 'next/link';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="flex flex-col gap-6 items-start lg:sticky lg:top-24">
                <h2 className="text-5xl font-bold tracking-tighter">
                Get In Touch
                </h2>
                <p className="text-base max-w-3xl text-muted-foreground">
                Have a project in mind? I&apos;d love to hear from you.
                </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="flex flex-col items-center text-center p-6 hover:shadow-xl transition-shadow">
                    <CardHeader>
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                            <Mail />
                        </div>
                        <CardTitle>Email</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
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
                        <Link href="https://linkedin.com/in/fanisa-mpofu-/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors block">
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
                        <Link href="https://www.youtube.com/@RevitInteriors" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors block">
                            @RevitInteriors
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
