import { Linkedin, Mail, Youtube } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t flex-shrink-0">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {year} FND.ME. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
           <a href="mailto:Fanisampofu@gmail.com" className="text-muted-foreground hover:text-foreground">
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
          <a href="https://linkedin.com/in/fanisa-mpofu-/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </a>
           <a href="https://www.youtube.com/@RevitInteriors" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Youtube size={20} />
            <span className="sr-only">YouTube</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
