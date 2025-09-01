
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import { getArticle, updateArticle, generateDraftAction, generateSeoAction } from "@/lib/actions";
import type { Article } from "@/types";
import { useLogs } from "@/context/LogContext";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Youtube } from "lucide-react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  slug: z.string().min(1, "Slug is required.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and contain only letters, numbers, and hyphens."),
  content: z.string().min(1, "Content is required."),
  keywords: z.string().optional(),
});

type EditArticlePageProps = {
    params: { id: string };
};

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [isAiLoading, setAiLoading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const { addLog } = useLogs();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      keywords: "",
    },
  });
  
  useEffect(() => {
    async function fetchArticle() {
      const article = await getArticle(params.id);
      if (article) {
        form.reset(article);
      } else {
        toast({ variant: 'destructive', title: 'Error', description: 'Article not found.' });
        router.push('/admin/articles');
      }
      setIsLoading(false);
    }
    fetchArticle();
  }, [params.id, form, router, toast]);

  const handleGenerateDraft = async () => {
    if (!youtubeUrl) {
      toast({ variant: 'destructive', description: "Please enter a YouTube URL." });
      return;
    }
    setAiLoading(true);
    addLog({ type: 'info', source: 'handleGenerateDraft', message: `Starting draft generation for: ${youtubeUrl}` });
    try {
      const result = await generateDraftAction({ youtubeVideoUrl: youtubeUrl });
      form.setValue('content', result.articleDraft);
      
      if (result.articleDraft.includes('was unable to retrieve')) {
         toast({ variant: 'destructive', title: "Draft Generation Failed", description: "Could not retrieve video details. Check URL." });
         addLog({ type: 'warning', source: 'handleGenerateDraft', message: `Could not retrieve video details. It's likely the URL is invalid or the video is private.` });
      } else {
        toast({ description: "Article draft generated successfully." });
        addLog({ type: 'success', source: 'handleGenerateDraft', message: `Draft generated successfully.` });
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unknown error occurred.";
      toast({ variant: 'destructive', title: "Draft Generation Failed", description: "See logs for details." });
      addLog({ type: 'error', source: 'handleGenerateDraft', message: errorMessage });
      console.error("Draft Generation Failed:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleGenerateSeo = async () => {
    const content = form.getValues('content');
    if (!content) {
      toast({ variant: 'destructive', description: "Article content is empty." });
      return;
    }
    setAiLoading(true);
    addLog({ type: 'info', source: 'handleGenerateSeo', message: `Starting SEO generation.` });
    try {
      const result = await generateSeoAction({ articleContent: content });
      form.setValue('title', result.title);
      form.setValue('keywords', result.keywords);
      const slug = result.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      form.setValue('slug', slug);
      toast({ description: "SEO metadata generated successfully." });
      addLog({ type: 'success', source: 'handleGenerateSeo', message: `SEO metadata generated successfully.` });
    } catch (error: any) {
        const errorMessage = error.message || "An unknown error occurred.";
        toast({ variant: 'destructive', title: "SEO Generation Failed", description: "See logs for details." });
        addLog({ type: 'error', source: 'handleGenerateSeo', message: errorMessage });
        console.error("SEO Generation Failed:", error);
    } finally {
      setAiLoading(false);
    }
  };


  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await updateArticle(params.id, values as Article);
      if (result.success) {
        toast({ description: "Article updated successfully." });
        router.push('/admin/articles');
      } else {
        toast({ variant: 'destructive', title: "Error", description: result.error });
      }
    });
  }

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-8 w-1/4 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-24" />
            </div>
             <div className="lg:col-span-1">
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
      </div>
    );
  }

  return (
     <>
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Article Content</CardTitle>
                    <CardDescription>Edit your article below. You can use markdown for formatting.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl><Input placeholder="Your amazing article title" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl><Input placeholder="your-amazing-article-title" {...field} /></FormControl>
                                <FormDescription>This is the URL-friendly version of the title.</FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field })=> (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl><Textarea placeholder="Once upon a time..." {...field} rows={15} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="keywords"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Keywords</FormLabel>
                                <FormControl><Input placeholder="tech, ai, design" {...field} /></FormControl>
                                <FormDescription>Comma-separated keywords for SEO.</FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending || isAiLoading}>
                            {isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>AI Tools</CardTitle>
                    <CardDescription>Use AI to accelerate your writing process.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Generate Draft from YouTube</Label>
                        <div className="flex gap-2">
                            <Input placeholder="https://youtube.com/watch?v=..." value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} />
                             <Button variant="outline" size="icon" onClick={handleGenerateDraft} disabled={isAiLoading}>
                                <Youtube className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Generate SEO Title & Keywords</Label>
                        <p className="text-sm text-muted-foreground">Generates a title, slug, and keywords based on the article content.</p>
                         <Button variant="outline" className="w-full" onClick={handleGenerateSeo} disabled={isAiLoading}>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate SEO Meta
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
