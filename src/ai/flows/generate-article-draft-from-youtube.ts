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
  input: {schema: GenerateArticleDraftFromYouTubeInputSchema},
  output: {schema: GenerateArticleDraftFromYouTubeOutputSchema},
  prompt: `You are an AI assistant that generates article drafts from YouTube video URLs.

  Based on the content of the YouTube video at the following URL: {{{youtubeVideoUrl}}},
  generate an initial article draft that captures the key insights and information presented in the video.

  The article draft should be well-structured and suitable for use as a starting point for a blog post.
  Incorporate the video content and embed it in the article.
  Make sure to add headings, subheadings and use markdown.
  Do not include any disclaimers or introductory phrases like "Here is an article draft".
  Start immediately with the content of the article.
  Do not include a conclusion.
  Just generate the content. Do not summarize it or do anything else.
  Embed the original YouTube video using a Youtube video tag.
  Youtube video tags look like this:
  <YoutubeVideo id="[the Youtube Video ID goes here]"></YoutubeVideo>
  For example if the video id is "12345", the tag should be "<YoutubeVideo id="12345"></YoutubeVideo>".
  Do not include a Youtube video url in the text, just include the tag.
  Be concise and do not embellish any of the information.

  Article Draft:`,
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
