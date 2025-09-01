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
        error: z.string().optional(),
      })
    },
    async (input) => {
        const details = await getYouTubeVideoDetails(input.url);
        if (!details.title) {
            return { error: 'Failed to retrieve video details. Please check the URL and ensure the video is public.' };
        }
        return details;
    }
);

const prompt = ai.definePrompt({
  name: 'generateArticleDraftFromYouTubePrompt',
  input: {schema: GenerateArticleDraftFromYouTubeInputSchema},
  output: {schema: GenerateArticleDraftFromYouTubeOutputSchema},
  tools: [getYoutubeVideoDetailsTool],
  prompt: `You are an expert content writer. Your task is to generate a comprehensive article draft based on the provided YouTube video URL.

First, use the 'getYoutubeVideoDetails' tool with the provided 'youtubeVideoUrl' to get the video's title, description, and chapters.

{{#if (lookup tool_response 'getYoutubeVideoDetails' 'title')}}
You have successfully retrieved the video details. Now, write a complete article in markdown format.

1.  Start by embedding the video. Use the format '<YoutubeVideo id="VIDEO_ID"></YoutubeVideo>'. You will need to extract the VIDEO_ID from the 'youtubeVideoUrl'.
2.  Write an introduction for the article. You can use the video's description for inspiration.
3.  Use the video's chapters as H2 subheadings (e.g., '## Chapter Title') for the main sections of the article.
4.  Under each chapter subheading, write a paragraph or two elaborating on the topic of that chapter.
5.  Do not add a concluding paragraph.
{{else}}
I was unable to retrieve the video details from the provided YouTube URL. Therefore, I cannot generate the article draft. Please ensure the URL is correct and the video is publicly accessible.
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
