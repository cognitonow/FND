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

const getYoutubeVideoDetailsTool = ai.defineTool(
  {
    name: 'getYoutubeVideoDetails',
    description: 'Retrieves the title and description of a YouTube video from its URL.',
    inputSchema: z.object({
      url: z.string().describe('The URL of the YouTube video.'),
    }),
    outputSchema: YoutubeVideoDetailsSchema.extend({
        error: z.string().optional().describe("An error message if the video details could not be retrieved."),
    }),
  },
  async ({url}) => {
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
);


const GenerateArticleDraftFromYouTubeInputSchema = z.object({
  youtubeVideoUrl: z
    .string()
    .describe('The URL of the YouTube video to generate an article draft from.'),
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
  return generateArticleDraftFromYouTubeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleDraftFromYouTubePrompt',
  input: {schema: GenerateArticleDraftFromYouTubeInputSchema.extend({
    videoId: z.string().optional(),
  })},
  output: {schema: GenerateArticleDraftFromYouTubeOutputSchema},
  tools: [getYoutubeVideoDetailsTool],
  prompt: `You are an expert content writer. Your task is to generate a placeholder article draft based on the provided YouTube video.

First, call the getYoutubeVideoDetails tool with the youtubeVideoUrl.

{{#if tool_response.error}}
  I am unable to generate an article draft. Reason: {{tool_response.error}}
{{else}}
  <YoutubeVideo id="{{videoId}}"></YoutubeVideo>

  ## Introduction

  Write a brief introduction based on the video's description.

  ## Key Takeaways

  Based on the video's description: "{{tool_response.description}}", create a few H2 subheadings with a short paragraph under each. Do not add a conclusion.
{{/if}}
`,
});

const generateArticleDraftFromYouTubeFlow = ai.defineFlow(
  {
    name: 'generateArticleDraftFromYouTubeFlow',
    inputSchema: GenerateArticleDraftFromYouTubeInputSchema,
    outputSchema: GenerateArticleDraftFromYouTubeOutputSchema,
  },
  async input => {
    const videoId = new URL(input.youtubeVideoUrl).searchParams.get('v');
    const {output} = await prompt({...input, videoId: videoId || ''});
    return output!;
  }
);
