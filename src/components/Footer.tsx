import { Github, Twitter } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {year} FND.ME. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
