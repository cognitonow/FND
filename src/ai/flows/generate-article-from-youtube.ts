
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
import { generateArticleDraftFromYouTube, type GenerateArticleDraftFromYouTubeInput, type GenerateArticleDraftFromYouTubeOutput } from './generate-article-draft-from-youtube';
import { generateSeoOptimizedMetadata, type GenerateSeoOptimizedMetadataInput, type GenerateSeoOptimizedMetadataOutput } from './generate-seo-optimized-metadata';


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
    // Step 1: Generate the article draft
    const draftResult = await generateArticleDraftFromYouTube(input);
    
    if (draftResult.error || !draftResult.articleDraft) {
        return {
            articleDraft: '',
            title: '',
            keywords: '',
            error: draftResult.error || 'Failed to generate article draft.',
        };
    }
    
    // Step 2: Generate SEO metadata from the draft
    const seoResult = await generateSeoOptimizedMetadata({ articleContent: draftResult.articleDraft });

    // Step 3: Combine the results
    return {
        articleDraft: draftResult.articleDraft,
        title: seoResult.title,
        keywords: seoResult.keywords,
    };
  }
);
