
import { NewsPost, Comment } from '../types';
import { client } from './config';

// Fetch News from Backend with Pagination
export const getNews = async (page: number = 1, limit: number = 5): Promise<NewsPost[]> => {
  try {
    const data = await client(`/news?page=${page}&limit=${limit}`);

    // ADAPTER: Map backend news structure to frontend NewsPost interface
    return data.map((item: any) => ({
      id: item.id || Math.random().toString(36).substr(2, 9),
      title: item.title,
      excerpt: item.excerpt,
      category: item.category || 'Update',
      imageUrl: item.imageUrl || 'https://via.placeholder.com/800x600',
      date: item.date || new Date().toLocaleDateString(),
      readTime: item.readTime || '2 min read',
      likes: item.likes || 0,
      commentsCount: item.commentsCount || 0
    }));
  } catch (error) {
    console.warn("API Error (getNews): System is currently empty or backend is offline.", error);
    return [];
  }
};

// Post a Like
export const postLike = async (postId: string, userId: string): Promise<void> => {
  try {
    const payload = {
      likedBy: userId,
      value: 1
    };

    await client(`/news/${postId}/like`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    console.log(`[API] Like sent for post ${postId}:`, payload);
  } catch (error) {
    console.warn("[API] Failed to sync like (Backend offline)", error);
  }
};

// Post a Comment
export const postComment = async (postId: string, userId: string, allComments: Comment[]): Promise<void> => {
  try {
    // Structure requested: who commented, how many comments, and content of comments
    const clientComments = allComments.filter(c => c.user === 'You' || c.user === userId).map(c => ({
      text: c.text,
      timestamp: c.time
    }));

    const payload = {
      commentedBy: userId,
      totalComments: allComments.length,
      clientCommentsContent: clientComments
    };

    await client(`/news/${postId}/comment`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    console.log(`[API] Comment sent for post ${postId}:`, payload);
  } catch (error) {
    console.warn("[API] Failed to sync comment (Backend offline)", error);
  }
};
