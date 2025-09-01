'use server';

/**
 * @fileOverview Generates an initial article draft from a YouTube video using AI.
 *
 * - generateArticleDraftFromYouTube - A function that generates an article draft from a YouTube video URL.
 * - GenerateArticleDraftFromYouTubeInput - The input type for the generateArticleDraftFromYouTube function.
 * - GenerateArticleDraftFromYouTubeOutput - The return type for the generateArticleDraftFromYouTube function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleDraftFromYouTubeInputSchema = z.object({
  videoId: z.string().describe('The ID of the YouTube video.'),
  title: z.string().describe('The title of the YouTube video.'),
  description: z.string().describe('The description of the YouTube video.'),
  writingRules: z.string().optional().describe('A set of rules or instructions to guide the AI writing style.')
});
export type GenerateArticleDraftFromYouTubeInput = z.infer<
  typeof GenerateArticleDraftFromYouTubeInputSchema
>;

const GenerateArticleDraftFromYouTubeOutputSchema = z.object({
  articleDraft: z
    .string()
    .describe('The generated article draft based on the YouTube video.'),
});
export type GenerateArticleDraftFromYouTubeOutput = z.infer<
  typeof GenerateArticleDraftFromYouTubeOutputSchema
>;

export async function generateArticleDraftFromYouTube(
  input: GenerateArticleDraftFromYouTubeInput
): Promise<GenerateArticleDraftFromYouTubeOutput> {
  const {output} = await generateArticleDraftFromYouTubePrompt(input);
  return { articleDraft: output!.articleDraft };
}

const generateArticleDraftFromYouTubePrompt = ai.definePrompt({
  name: 'generateArticleDraftFromYouTubePrompt',
  input: {schema: GenerateArticleDraftFromYouTubeInputSchema},
  output: {schema: z.object({ articleDraft: z.string() })},
  prompt: `You are an expert content writer. Your task is to generate a placeholder article draft based on the provided YouTube video details.

Your entire response will be the article content.

First, on its own line, include the YouTube video embed tag like this:
<YoutubeVideo id="{{videoId}}"></YoutubeVideo>

Then, write the rest of the article based on the video details.

The video title is "{{title}}".
The video description is "{{description}}".

{{#if writingRules}}
Please follow these writing rules:
{{writingRules}}
{{/if}}

## Introduction

Write a brief introduction based on the video's description.

## Key Takeaways

Based on the video's description, create a few H2 subheadings with a short paragraph under each. Do not add a conclusion.
`,
});
