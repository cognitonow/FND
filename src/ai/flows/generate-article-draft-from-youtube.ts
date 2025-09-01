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
import { getYouTubeVideoDetails } from '@/services/youtube-scraper';

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

const getYoutubeVideoDetailsTool = ai.defineTool(
    {
      name: 'getYoutubeVideoDetails',
      description: 'Returns the title, description, and chapters of a YouTube video.',
      inputSchema: z.object({
        url: z.string().describe('The URL of the YouTube video.'),
      }),
      outputSchema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        chapters: z.array(z.object({
            title: z.string(),
            start_time: z.number(),
        })).optional(),
      })
    },
    async (input) => {
        return getYouTubeVideoDetails(input.url);
    }
);

const prompt = ai.definePrompt({
  name: 'generateArticleDraftFromYouTubePrompt',
  input: {schema: GenerateArticleDraftFromYouTubeInputSchema},
  output: {schema: GenerateArticleDraftFromYouTubeOutputSchema},
  tools: [getYoutubeVideoDetailsTool],
  prompt: `You are an expert content writer. Your task is to generate a comprehensive article draft based on a YouTube video.

Use the 'getYoutubeVideoDetails' tool with the provided '{{{youtubeVideoUrl}}}' to get the video's title, description, and chapters.

{{#if (lookup tool_response 'getYoutubeVideoDetails' 'title')}}
Write a complete article in markdown format. Start by embedding the video using the '<YoutubeVideo id="VIDEO_ID"></YoutubeVideo>' tag (extract the VIDEO_ID from the URL). Then, write an introduction based on the description, and use the chapters as H2 subheadings for the main sections of the article. Elaborate on each chapter's topic. Do not add a conclusion.
{{else}}
I was unable to retrieve the video details (title, description, and chapters) from the provided YouTube URL. Therefore, I cannot generate the article draft. Please ensure the URL is correct and the video is publicly accessible.
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
    const {output} = await prompt(input);
    return output!;
  }
);
