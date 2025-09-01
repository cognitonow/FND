import { config } from 'dotenv';
config();

import '@/ai/flows/generate-article-draft-from-youtube.ts';
import '@/ai/flows/generate-seo-optimized-metadata.ts';
import '@/services/youtube-scraper.ts';