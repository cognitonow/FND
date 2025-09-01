
'use server';
/**
 * @fileOverview A flow that orchestrates generating an article draft and its SEO metadata from a YouTube URL.
 *
 * - generateArticleFromYouTube - A function that handles the entire article creation process.
 * - GenerateArticleFromYouTubeInput - The input type for the generateArticleFromYouTube function.
 * - GenerateArticleFromYouTubeOutput - The return type for the generateArticleFromYouTube function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { generateArticleDraftFromYouTube, type GenerateArticleDraftFromYouTubeOutput } from './generate-article-draft-from-youtube';
import { generateSeoOptimizedMetadata } from './generate-seo-optimized-metadata';
import { getVideoDetails } from '@/services/youtube';


const GenerateArticleFromYouTubeInputSchema = z.object({
  youtubeVideoUrl: z
    .string()
    .describe('The URL of the YouTube video to generate an article from.'),
  writingRules: z.string().optional().describe('A set of rules or instructions to guide the AI writing style.')
});
export type GenerateArticleFromYouTubeInput = z.infer<
  typeof GenerateArticleFromYouTubeInputSchema
>;

const GenerateArticleFromYouTubeOutputSchema = z.object({
  articleDraft: z.string().describe('The generated article draft.'),
  title: z.string().describe('The SEO-friendly title for the article.'),
  keywords: z.string().describe('Comma-separated keywords for the article.'),
  thumbnailUrl: z.string().optional().describe('The URL of the video thumbnail.'),
  error: z.string().optional().describe('An error message if the process failed.'),
});
export type GenerateArticleFromYouTubeOutput = z.infer<
  typeof GenerateArticleFromYouTubeOutputSchema
>;


export async function generateArticleFromYouTube(
  input: GenerateArticleFromYouTubeInput
): Promise<GenerateArticleFromYouTubeOutput> {
  return generateArticleFromYouTubeFlow(input);
}


const generateArticleFromYouTubeFlow = ai.defineFlow(
  {
    name: 'generateArticleFromYouTubeFlow',
    inputSchema: GenerateArticleFromYouTubeInputSchema,
    outputSchema: GenerateArticleFromYouTubeOutputSchema,
  },
  async (input) => {
    
    // Step 1: Get Video Details (including thumbnail)
    const videoId = new URL(input.youtubeVideoUrl).searchParams.get('v');
    if (!videoId) {
        return { articleDraft: '', title: '', keywords: '', error: 'Could not extract video ID from URL.' };
    }
    const videoDetails = await getVideoDetails(videoId);
    if (!videoDetails) {
        return { articleDraft: '', title: '', keywords: '', error: 'Could not retrieve video details.' };
    }

    // Step 2: Generate the article draft
    const draftResult = await generateArticleDraftFromYouTube({
      youtubeVideoUrl: input.youtubeVideoUrl,
      writingRules: input.writingRules,
    });
    
    if (draftResult.error || !draftResult.articleDraft) {
        return {
            articleDraft: '',
            title: '',
            keywords: '',
            error: draftResult.error || 'Failed to generate article draft.',
        };
    }
    
    // Step 3: Generate SEO metadata from the draft
    const seoResult = await generateSeoOptimizedMetadata({ articleContent: draftResult.articleDraft });

    // Step 4: Combine the results
    return {
        articleDraft: draftResult.articleDraft,
        title: seoResult.title,
        keywords: seoResult.keywords,
        thumbnailUrl: videoDetails.thumbnailUrl,
    };
  }
);
