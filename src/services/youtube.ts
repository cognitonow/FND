'use server';

import {google} from 'googleapis';

export async function getVideoDetails(videoId: string) {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
        throw new Error('YouTube API key is not configured. Please set the YOUTUBE_API_KEY environment variable.');
    }
    
    const youtube = google.youtube({
        version: 'v3',
        auth: apiKey,
    });

    try {
        const response = await youtube.videos.list({
            part: ['snippet'],
            id: [videoId],
        });

        const video = response.data.items?.[0];

        if (!video || !video.snippet) {
            return null;
        }

        return {
            title: video.snippet.title || '',
            description: video.snippet.description || '',
        };
    } catch (error: any) {
        console.error('Error fetching YouTube video details:', error.message);
        return {
            error: `Failed to fetch video details from YouTube API: ${error.message}`
        }
    }
}
