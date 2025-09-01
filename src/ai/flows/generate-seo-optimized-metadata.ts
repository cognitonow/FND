'use server';
/**
 * @fileOverview AI flow to generate SEO-friendly titles and keywords for blog articles.
 *
 * - generateSeoOptimizedMetadata - A function that generates SEO-optimized metadata for a given article.
 * - GenerateSeoOptimizedMetadataInput - The input type for the generateSeoOptimizedMetadata function.
 * - GenerateSeoOptimizedMetadataOutput - The return type for the generateSeoOptimizedMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoOptimizedMetadataInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the article to generate metadata for.'),
});
export type GenerateSeoOptimizedMetadataInput = z.infer<
  typeof GenerateSeoOptimizedMetadataInputSchema
>;

const GenerateSeoOptimizedMetadataOutputSchema = z.object({
  title: z.string().describe('The SEO-friendly title for the article.'),
  keywords: z
    .string()
    .describe('Comma-separated keywords for the article.'),
});
export type GenerateSeoOptimizedMetadataOutput = z.infer<
  typeof GenerateSeoOptimizedMetadataOutputSchema
>;

export async function generateSeoOptimizedMetadata(
  input: GenerateSeoOptimizedMetadataInput
): Promise<GenerateSeoOptimizedMetadataOutput> {
  return generateSeoOptimizedMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoOptimizedMetadataPrompt',
  input: {schema: GenerateSeoOptimizedMetadataInputSchema},
  output: {schema: GenerateSeoOptimizedMetadataOutputSchema},
  prompt: `You are an SEO expert. Generate an SEO-friendly title and keywords for the following article content.\n\nArticle Content: {{{articleContent}}}\n\nTitle: \nKeywords: `,
});

const generateSeoOptimizedMetadataFlow = ai.defineFlow(
  {
    name: 'generateSeoOptimizedMetadataFlow',
    inputSchema: GenerateSeoOptimizedMetadataInputSchema,
    outputSchema: GenerateSeoOptimizedMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
