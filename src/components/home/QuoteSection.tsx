import Image from 'next/image';
import { Quote } from 'lucide-react';

export function QuoteSection() {
  return (
    <section className="relative w-full h-[400px] my-16">
      <Image
        src="https://picsum.photos/seed/quote/1600/400"
        alt="Inspirational architectural background"
        fill
        className="object-cover grayscale"
        data-ai-hint="architecture abstract"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white p-8 max-w-4xl">
          <Quote className="mx-auto mb-4 w-12 h-12 text-white/50" />
          <blockquote className="text-3xl md:text-4xl font-semibold mb-4">
            &quot;The home should be the treasure chest of living.&quot;
          </blockquote>
          <cite className="text-lg text-white/80">- Le Corbusier</cite>
        </div>
      </div>
    </section>
  );
}
