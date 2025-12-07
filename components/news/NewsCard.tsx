
import React, { useState } from 'react';
import { NewsPost, Comment } from '../../types';
import { api } from '../../services/api';
import { MOCK_COMMENTS } from '../../constants';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { ShareMenu } from '../ShareMenu';
import { CommentSection } from './CommentSection';

interface NewsCardProps {
  post: NewsPost;
  notify: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ post, notify }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [shareMenuOpen, setShareMenuOpen] = useState(false);
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS.slice(0, 2)); // Show subset initially
    const [newComment, setNewComment] = useState('');

    // Mock User ID for API calls since we are in Notice component
    const CURRENT_USER_ID = "u-client-123";

    const toggleLike = () => {
        // Optimistic UI update
        const newVal = !isLiked;
        setIsLiked(newVal);
        setLikesCount(prev => newVal ? prev + 1 : prev - 1);
        
        if (newVal) {
            notify('Added to liked posts', 'success');
            // Send to Backend
            api.postLike(post.id, CURRENT_USER_ID);
        }
    };

    const toggleSave = () => {
        setIsSaved(!isSaved);
        notify(isSaved ? 'Removed from saved' : 'Saved to collection', 'success');
    };

    const handlePostComment = () => {
        if (!newComment.trim()) return;
        
        const comment: Comment = {
            id: Date.now().toString(),
            user: 'You',
            avatar: 'https://i.pravatar.cc/150?img=68', // Placeholder for current user
            text: newComment,
            time: 'Just now'
        };
        
        const updatedComments = [comment, ...comments];
        setComments(updatedComments);
        setNewComment('');
        notify('Comment posted', 'success');

        // Send to Backend
        api.postComment(post.id, CURRENT_USER_ID, updatedComments);
    };

    return (
        <article 
            className={`group flex flex-col bg-white dark:bg-night-card rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-hover transition-all duration-500 ${shareMenuOpen ? 'z-30 relative' : 'relative'}`}
        >
            {/* Image Header */}
            <div className="relative h-64 md:h-[400px] overflow-hidden cursor-pointer rounded-t-[2.5rem]" onClick={() => notify(`Opening full story: ${post.title}`, 'info')}>
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/60 opacity-60"></div>
                
                <div className="absolute top-6 left-6">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white shadow-sm">
                        {post.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                <div className="flex items-center text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 space-x-2">
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                </div>
                <h2 
                    className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight cursor-pointer hover:text-apple-blue transition-colors"
                    onClick={() => notify(`Opening story: ${post.title}`, 'info')}
                >
                    {post.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                </p>

                {/* Footer Actions */}
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-6">
                    <div className="flex items-center space-x-6">
                        <button 
                            onClick={toggleLike} 
                            className={`flex items-center space-x-2 transition-colors group/btn ${isLiked ? 'text-red-500' : 'text-slate-500 dark:text-slate-400 hover:text-red-500'}`}
                            aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
                        >
                            <Heart size={24} className={`group-hover/btn:scale-110 transition-transform ${isLiked ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{likesCount}</span>
                        </button>
                        
                        <button 
                            onClick={() => setCommentsOpen(!commentsOpen)} 
                            className={`flex items-center space-x-2 transition-colors ${commentsOpen ? 'text-apple-blue' : 'text-slate-500 dark:text-slate-400 hover:text-apple-blue'}`}
                            aria-label="Toggle comments"
                        >
                            <MessageCircle size={24} />
                            <span className="text-sm font-medium">{post.commentsCount + (comments.length - 2)}</span>
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-4 relative">
                         <button 
                            onClick={toggleSave} 
                            className={`transition-colors ${isSaved ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                            aria-label={isSaved ? 'Remove from bookmarks' : 'Bookmark this post'}
                        >
                            <Bookmark size={24} className={isSaved ? 'fill-current' : ''} />
                        </button>
                        
                        <div className="relative">
                            <button 
                                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                aria-label="Share options"
                            >
                                <Share2 size={24} />
                            </button>
                            <ShareMenu 
                                isOpen={shareMenuOpen} 
                                onClose={() => setShareMenuOpen(false)} 
                                title={post.title}
                                onCopySuccess={() => notify('Link copied', 'success')}
                            />
                        </div>
                    </div>
                </div>

                {/* Expandable Comments Section */}
                {commentsOpen && (
                    <CommentSection 
                        comments={comments}
                        newComment={newComment}
                        setNewComment={setNewComment}
                        onPostComment={handlePostComment}
                    />
                )}
            </div>
        </article>
    );
};
