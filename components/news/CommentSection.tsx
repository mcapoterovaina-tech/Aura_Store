
import React from 'react';
import { Comment } from '../../types';
import { Send } from 'lucide-react';

interface CommentSectionProps {
  comments: Comment[];
  newComment: string;
  setNewComment: (val: string) => void;
  onPostComment: () => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ 
  comments, 
  newComment, 
  setNewComment, 
  onPostComment 
}) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 animate-fade-in">
      <h3 className="font-bold text-slate-900 dark:text-white mb-6">Comments</h3>
      
      {/* Comment List */}
      <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                  <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-white/10" />
                  <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm text-slate-900 dark:text-white">{comment.user}</span>
                          <span className="text-xs text-slate-400">{comment.time}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{comment.text}</p>
                      <div className="flex items-center gap-4 mt-2">
                          <button className="text-xs text-slate-400 font-medium hover:text-slate-600 dark:hover:text-slate-200">Reply</button>
                      </div>
                  </div>
              </div>
          ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-3 items-end">
          <img src="https://i.pravatar.cc/150?img=68" className="w-8 h-8 rounded-full mb-2" alt="You" />
          <div className="flex-1 relative">
              <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full bg-gray-50 dark:bg-white/5 rounded-2xl px-4 py-3 pr-12 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-apple-blue/50 resize-none h-12 min-h-[48px] focus:min-h-[80px] transition-all"
              />
              <button 
                  onClick={onPostComment}
                  disabled={!newComment.trim()}
                  className="absolute right-2 bottom-2 p-2 bg-apple-blue text-white rounded-full disabled:opacity-50 disabled:bg-gray-300 dark:disabled:bg-white/10 transition-all hover:bg-blue-600"
              >
                  <Send size={14} />
              </button>
          </div>
      </div>
    </div>
  );
};
