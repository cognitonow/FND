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
import {getVideoDetails} from '@/services/youtube';

const YoutubeVideoDetailsSchema = z.object({
  title: z.string().describe('The title of the YouTube video.'),
  description: z.string().describe('The description of the YouTube video.'),
});

// This tool is now for internal use within the flow, not for the LLM to decide to call.
const getYoutubeVideoDetails = async (url: string): Promise<z.infer<typeof YoutubeVideoDetailsSchema> & { error?: string }> => {
    try {
        const videoId = new URL(url).searchParams.get('v');
        if (!videoId) {
            return { error: "Could not extract video ID from the URL. Please ensure it's a valid YouTube watch URL."};
        }
        const details = await getVideoDetails(videoId);
        if (!details) {
            return { error: "Could not retrieve video details. Please check the URL and ensure the video is public."};
        }
        return details;
    } catch (e: any) {
        return { error: `An unexpected error occurred: ${e.message}` };
    }
}


const GenerateArticleDraftFromYouTubeInputSchema = z.object({
  youtubeVideoUrl: z
    .string()
    .describe('The URL of the YouTube video to generate an article draft from.'),
  writingRules: z.string().optional().describe('A set of rules or instructions to guide the AI writing style.')
});
export type GenerateArticleDraftFromYouTubeInput = z.infer<
  typeof GenerateArticleDraftFromYouTubeInputSchema
>;

const GenerateArticleDraftFromYouTubeOutputSchema = z.object({
  articleDraft: z
    .string()
    .describe('The generated article draft based on the YouTube video.'),
  error: z.string().optional().describe('An error message if the draft could not be generated.'),
});
export type GenerateArticleDraftFromYouTubeOutput = z.infer<
  typeof GenerateArticleDraftFromYouTubeOutputSchema
>;

export async function generateArticleDraftFromYouTube(
  input: GenerateArticleDraftFromYouTubeInput
): Promise<GenerateArticleDraftFromYouTubeOutput> {
  return generateArticleDraftFromYouTubeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleDraftFromYouTubePrompt',
  input: {schema: YoutubeVideoDetailsSchema.extend({
    videoId: z.string(),
    writingRules: z.string().optional(),
  })},
  output: {schema: z.object({ articleDraft: z.string() })},
  prompt: `<YoutubeVideo id="{{videoId}}"></YoutubeVideo>

You are an expert content writer. Your task is to generate a placeholder article draft based on the provided YouTube video details.

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

const generateArticleDraftFromYouTubeFlow = ai.defineFlow(
  {
    name: 'generateArticleDraftFromYouTubeFlow',
    inputSchema: GenerateArticleDraftFromYouTubeInputSchema,
    outputSchema: GenerateArticleDraftFromYouTubeOutputSchema,
  },
  async (input) => {
    const videoDetails = await getYoutubeVideoDetails(input.youtubeVideoUrl);

    if (videoDetails.error) {
      return { 
        articleDraft: `I am unable to generate an article draft. Reason: ${videoDetails.error}`,
        error: videoDetails.error,
      };
    }

    const videoId = new URL(input.youtubeVideoUrl).searchParams.get('v');
    if (!videoId) {
         return { 
            articleDraft: "I am unable to generate an article draft. Reason: Could not extract video ID from the URL.",
            error: "Could not extract video ID from the URL.",
        };
    }
    
    const {output} = await prompt({
        title: videoDetails.title || '',
        description: videoDetails.description || '',
        videoId: videoId,
        writingRules: input.writingRules,
    });
    
    return { articleDraft: output!.articleDraft };
  }
);
