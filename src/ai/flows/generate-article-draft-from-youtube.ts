'use server';

/**
 * @fileOverview Generates an initial article draft from a YouTube video URL using AI.
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
  prompt: `You are an expert content writer who specializes in creating blog posts from YouTube videos.
  
  Your task is to generate a well-structured and comprehensive article draft based on the YouTube video URL provided.

  1. Use the getYoutubeVideoDetails tool to extract the video's title, description, and chapters. The URL to use is: {{{youtubeVideoUrl}}}
  2. The article's main title (H1) should be the video's title.
  3. Start the article by embedding the YouTube video for viewing. Use a Youtube video tag like this: <YoutubeVideo id="[the Youtube Video ID goes here]"></YoutubeVideo>. For example if the video id is "12345", the tag should be "<YoutubeVideo id="12345"></YoutubeVideo>". Do not include a Youtube video url in the text, just include the tag.
  4. After the video, write a brief introduction based on the video's description.
  5. Use the video's chapters as the main sections of the article. Each chapter title should be a subheading (H2).
  6. Under each subheading, write a few paragraphs that elaborate on the chapter's topic. You must watch the video content for that chapter to generate the text.
  7. The entire article should be written in clear, engaging markdown format. Do not include any concluding remarks or summaries at the end.
  
  Begin generating the article now.`,
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
