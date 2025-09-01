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
