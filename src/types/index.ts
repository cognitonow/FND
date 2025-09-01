import type { Timestamp } from 'firebase/firestore';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
  dataAiHint?: string;
}

export interface Article {
  id?: string;
  title: string;
  slug: string;
  content: string;
  keywords: string;
  createdAt?: string | Timestamp;
  updatedAt?: string | Timestamp;
}
