# Build Journey

This document tracks the features we've built and the steps taken to implement them.

1.  **Initial Setup**: Project started with a Next.js boilerplate, including basic page structure and UI components from ShadCN.

2.  **Firebase Integration & Debugging**:
    *   Encountered a `PERMISSION_DENIED` error from Firestore.
    *   **Action**: Connected the application to a new Firebase project to resolve credential issues.
    *   Encountered a `NOT_FOUND` error from Firestore.
    *   **Action**: Manually created the Firestore database instance via the Firebase Console and set it to test mode.

3.  **Admin UI & Layout Fixes**:
    *   Addressed a bug causing a blank admin page due to incorrect authentication handling.
    *   Disabled authentication requirement for the admin section to simplify development.
    *   Fixed layout issues where the main site header was overlapping the admin panel content.

4.  **AI-Powered Article Generation from YouTube**:
    *   The initial implementation used a scraping tool (`yt-dlp`) which proved unreliable, leading to "unable to retrieve video details" errors.
    *   **Action**: Refactored the feature to use the official YouTube Data API v3 for robust and reliable video data fetching.
    *   **Action**: Integrated the `googleapis` library and created a new YouTube service to handle API requests.
    *   **Action**: Updated the Genkit flow to explicitly call the new YouTube service before calling the AI prompt, making the logic more reliable.
    *   **Action**: Required the user to enable the YouTube Data API in Google Cloud Console and add the API key to the project's environment variables.
    *   **Result**: The "Generate from YouTube" feature is now fully functional, successfully creating article drafts from public YouTube videos.
