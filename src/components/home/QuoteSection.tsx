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
      <div className="absolute inset-0 bg-black/50 flex items-center justify-end">
        <div className="text-right text-white p-8 md:p-16 max-w-2xl">
          <Quote className="ml-auto mr-0 mb-4 w-10 h-10 text-white/30" />
          <blockquote className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">
            &quot;The home should be the treasure chest of living.&quot;
          </blockquote>
          <cite className="text-md text-white/60">- Le Corbusier</cite>
        </div>
      </div>
    </section>
  );
}
