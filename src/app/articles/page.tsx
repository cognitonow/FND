import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/actions';
import type { Article } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

export default async function ArticlesPage() {
  const articles: Article[] = await getArticles();

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Thoughts & Insights
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          A collection of articles on design, technology, and AI.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article.id} className="group">
              <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                 {article.thumbnailUrl && (
                    <div className="aspect-video overflow-hidden">
                        <Image
                            src={article.thumbnailUrl}
                            alt={article.title}
                            width={400}
                            height={225}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                        />
                    </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl mb-2 group-hover:text-accent transition-colors">{article.title}</CardTitle>
                  <CardDescription>
                    {article.createdAt ? format(new Date(article.createdAt as string), 'MMMM d, yyyy') : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    {/* Could add an excerpt here later */}
                </CardContent>
              </Card>
            </Link>
          ))}
           {articles.length === 0 && (
            <p className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground">No articles published yet. Check back soon!</p>
           )}
        </div>
      </section>
    </div>
  );
}
