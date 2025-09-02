
import { getArticles } from '@/lib/actions';
import { HeroContent } from '@/components/home/HeroContent';
import { HeroVisuals } from '@/components/home/HeroVisuals';

export default async function HomePage() {
  const latestArticles = await getArticles(3);
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <HeroContent />
        <HeroVisuals articles={latestArticles} />
      </section>
    </div>
  );
}
