
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
import { Wand2, Youtube } from "lucide-react";
import { useLogs } from "@/context/LogContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  slug: z.string().min(1, "Slug is required.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and contain only letters, numbers, and hyphens."),
  content: z.string().min(1, "Content is required."),
  keywords: z.string().optional(),
});


export default function NewArticlePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAiLoading, setAiLoading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [writingRules, setWritingRules] = useState('');
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

  const handleGenerateDraft = async () => {
    if (!youtubeUrl) {
      toast({ variant: 'destructive', description: "Please enter a YouTube URL." });
      return;
    }
    setAiLoading(true);
    addLog({ type: 'info', source: 'handleGenerateDraft', message: `Starting draft generation for: ${youtubeUrl}` });
    try {
      const result = await generateDraftAction({ youtubeVideoUrl: youtubeUrl, writingRules });
      
      if (result.error) {
        toast({ variant: 'destructive', title: "Draft Generation Failed", description: result.error });
        addLog({ type: 'warning', source: 'handleGenerateDraft', message: `Draft generation failed: ${result.error}` });
      } else {
        form.setValue('content', result.articleDraft);
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
      const result = await createArticle(values as Article);
      if (result.success) {
        toast({ description: "Article created successfully." });
        router.push('/admin/articles');
      } else {
        toast({ variant: 'destructive', title: "Error", description: result.error });
      }
    });
  }

 return (
     <>
      <h1 className="text-3xl font-bold mb-8">New Article</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Article Content</CardTitle>
                    <CardDescription>Create your new article below. You can use the AI tools on the right to get started.</CardDescription>
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
                            {isPending ? 'Saving...' : 'Save Article'}
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
                  <Tabs defaultValue="youtube">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="youtube">From YouTube</TabsTrigger>
                        <TabsTrigger value="rules">Writing Rules</TabsTrigger>
                    </TabsList>
                    <TabsContent value="youtube" className="pt-4">
                      <div className="space-y-2">
                          <Label>Generate Draft from YouTube</Label>
                          <div className="flex gap-2">
                              <Input placeholder="https://youtube.com/watch?v=..." value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} />
                              <Button variant="outline" size="icon" onClick={handleGenerateDraft} disabled={isAiLoading}>
                                  <Youtube className="h-4 w-4" />
                              </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Requires a YouTube Data API Key.</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="rules" className="pt-4">
                      <div className="space-y-2">
                          <Label>Writing Rules & Style Guide</Label>
                          <Textarea 
                            placeholder="e.g., Write in a friendly and approachable tone. Use short sentences. Avoid jargon." 
                            value={writingRules} 
                            onChange={(e) => setWritingRules(e.target.value)}
                            rows={6}
                          />
                           <p className="text-sm text-muted-foreground">These rules will guide the AI's writing style.</p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="border-t pt-6 space-y-2">
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
