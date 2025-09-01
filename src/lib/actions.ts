"use server";

import { revalidatePath } from "next/cache";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy, limit, DocumentData, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Article } from "@/types";
import { generateArticleDraftFromYouTube, GenerateArticleDraftFromYouTubeInput } from "@/ai/flows/generate-article-draft-from-youtube";
import { generateSeoOptimizedMetadata, GenerateSeoOptimizedMetadataInput } from "@/ai/flows/generate-seo-optimized-metadata";

function articleToJSON(doc: DocumentData): Article {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate().toISOString(),
    updatedAt: data.updatedAt?.toDate().toISOString(),
  } as Article;
}

export async function getArticles(articleLimit?: number) {
  let q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
  if (articleLimit) {
    q = query(q, limit(articleLimit));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(articleToJSON);
}

export async function getArticle(idOrSlug: string) {
    const docRefById = doc(db, 'articles', idOrSlug);
    const docSnapById = await getDoc(docRefById);

    if (docSnapById.exists()) {
        return articleToJSON(docSnapById);
    }
    
    // Fallback to querying by slug
    const q = query(collection(db, 'articles'), where('slug', '==', idOrSlug), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return articleToJSON(querySnapshot.docs[0]);
    }

    return null;
}

export async function createArticle(data: Omit<Article, 'id'>) {
  try {
    await addDoc(collection(db, 'articles'), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    revalidatePath('/articles');
    revalidatePath('/admin/articles');
    return { success: true };
  } catch (error) {
    console.error("Error creating article:", error);
    return { success: false, error: "Failed to create article." };
  }
}

export async function updateArticle(id: string, data: Partial<Article>) {
  try {
    const articleRef = doc(db, 'articles', id);
    await updateDoc(articleRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    const updatedArticle = await getDoc(articleRef);
    revalidatePath(`/articles/${updatedArticle.data()?.slug}`);
    revalidatePath('/admin/articles');
    return { success: true };
  } catch (error)
  {
    console.error("Error updating article:", error);
    return { success: false, error: "Failed to update article." };
  }
}

export async function deleteArticle(id: string) {
  try {
    await deleteDoc(doc(db, 'articles', id));
    revalidatePath('/articles');
    revalidatePath('/admin/articles');
    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    return { success: false, error: "Failed to delete article." };
  }
}

export async function generateDraftAction(input: GenerateArticleDraftFromYouTubeInput) {
    return await generateArticleDraftFromYouTube(input);
}

export async function generateSeoAction(input: GenerateSeoOptimizedMetadataInput) {
    return await generateSeoOptimizedMetadata(input);
}
