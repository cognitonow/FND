import { getArticle } from "@/lib/actions";
import { notFound } from "next/navigation";
import { format } from 'date-fns';
import { ArticleContent } from "@/components/ArticleContent";

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
          {article.title}
        </h1>
        <p className="text-muted-foreground">
          Published on {article.createdAt ? format(new Date(article.createdAt as string), 'MMMM d, yyyy') : ''}
        </p>
      </header>
      
      <ArticleContent content={article.content} />

    </article>
  );
}
