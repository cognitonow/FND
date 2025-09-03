
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import { Article } from "@/types";

type RevitTutorialsSectionProps = {
    articles: Article[];
}

export function RevitTutorialsSection({ articles }: RevitTutorialsSectionProps) {
    return (
        <section className="container mx-auto px-4 w-full h-full flex items-center">
            <div className="w-full lg:grid lg:grid-cols-3 lg:gap-12 items-start">
                <div className="flex flex-col gap-6 items-start h-fit lg:sticky lg:top-24 mb-12 lg:mb-0">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        Revit Tutorials
                    </h2>
                    <p className="text-base text-muted-foreground">
                        Explore tutorials and articles on BIM, Revit, and architectural design.
                    </p>
                    <Button asChild>
                        <Link href="/articles">
                            View All Articles <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((article) => (
                        <Link href={`/articles/${article.slug}`} key={article.id} className="group">
                            <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-background shadow-md">
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
                                    <CardTitle className="text-xl mb-2 group-hover:text-accent transition-colors">{article.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm">Read more &rarr;</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                     {articles.length === 0 && (
                        <div className="md:col-span-2 text-center py-16 flex items-center justify-center">
                            <p className="text-muted-foreground">No articles published yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
