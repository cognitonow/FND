
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createArticle, generateDraftAction, generateSeoAction } from "@/lib/actions";
import type { Article } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Youtube, ArrowLeft, Loader2 } from "lucide-react";
import { useLogs } from "@/context/LogContext";

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  slug: z.string().min(1, "Slug is required.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and contain only letters, numbers, and hyphens."),
  content: z.string().min(1, "Content is required."),
  keywords: z.string().optional(),
});

enum PageState {
  EnterUrl,
  Editing,
}

export default function NewArticlePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAiLoading, setAiLoading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const { addLog } = useLogs();
  const [pageState, setPageState] = useState<PageState>(PageState.EnterUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      keywords: "",
    },
  });

  const handleGenerateArticle = async () => {
    if (!youtubeUrl) {
      toast({ variant: 'destructive', description: "Please enter a YouTube URL." });
      return;
    }
    setAiLoading(true);
    addLog({ type: 'info', source: 'handleGenerateArticle', message: `Starting article generation for: ${youtubeUrl}` });
    
    try {
      // Step 1: Generate Draft
      const draftResult = await generateDraftAction({ youtubeVideoUrl: youtubeUrl });
      
      if (draftResult.error) {
        toast({ variant: 'destructive', title: "Draft Generation Failed", description: draftResult.error });
        addLog({ type: 'error', source: 'handleGenerateArticle', message: `Draft generation failed: ${draftResult.error}` });
        setAiLoading(false);
        return;
      }
      
      form.setValue('content', draftResult.articleDraft);
      addLog({ type: 'success', source: 'handleGenerateArticle', message: `Draft content generated.` });

      // Step 2: Generate SEO
      addLog({ type: 'info', source: 'handleGenerateArticle', message: `Starting SEO generation.` });
      const seoResult = await generateSeoAction({ articleContent: draftResult.articleDraft });
      form.setValue('title', seoResult.title);
      form.setValue('keywords', seoResult.keywords);
      const slug = seoResult.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      form.setValue('slug', slug);
      addLog({ type: 'success', source: 'handleGenerateArticle', message: `SEO metadata generated.` });
      
      toast({ description: "Article generated successfully. You can now edit and save." });
      setPageState(PageState.Editing);

    } catch (error: any) {
      const errorMessage = error.message || "An unknown error occurred.";
      toast({ variant: 'destructive', title: "Article Generation Failed", description: "See logs for details." });
      addLog({ type: 'error', source: 'handleGenerateArticle', message: errorMessage });
      console.error("Article Generation Failed:", error);
    } finally {
      setAiLoading(false);
    }
  };


  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await createArticle(values as Article);
      if (result.success) {
        toast({ description: "Article created successfully." });
        router.push('/admin/articles');
      } else {
        toast({ variant: 'destructive', title: "Error", description: result.error });
      }
    });
  }

  if (pageState === PageState.EnterUrl) {
    return (
        <>
            <h1 className="text-3xl font-bold mb-8">New Article from YouTube</h1>
            <Card className="max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Generate Article from YouTube</CardTitle>
                    <CardDescription>Enter a YouTube video URL to automatically generate a full article draft with a title, keywords, and content.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="youtube-url">YouTube Video URL</Label>
                        <div className="flex gap-2">
                            <Input id="youtube-url" placeholder="https://youtube.com/watch?v=..." value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} disabled={isAiLoading} />
                        </div>
                         <p className="text-sm text-muted-foreground">Requires a public video and a valid YouTube Data API Key.</p>
                    </div>
                     <Button className="w-full" onClick={handleGenerateArticle} disabled={isAiLoading}>
                        {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                        {isAiLoading ? 'Generating...' : 'Generate Article'}
                    </Button>
                </CardContent>
            </Card>
        </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" onClick={() => setPageState(PageState.EnterUrl)} disabled={isPending}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">New Article</h1>
      </div>
      <Card>
          <CardHeader>
              <CardTitle>Edit Generated Article</CardTitle>
              <CardDescription>Review and edit the AI-generated article below. When you're ready, save it to publish.</CardDescription>
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
                      render={({ field }) => (
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
                      {isPending ? 'Saving...' : 'Save Article'}
                  </Button>
                  </form>
              </Form>
          </CardContent>
      </Card>
    </>
  );
}
