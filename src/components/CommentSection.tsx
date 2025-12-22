import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Loader2, Reply, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { PostComment, getCommentsByPost, addComment, deleteComment } from '@/services/postService';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface CommentSectionProps {
  postId: string;
  commentsCount: number;
  onCommentCountChange: (delta: number) => void;
}

interface CommentItemProps {
  comment: PostComment;
  user: { id: string } | null;
  onReply: (comment: PostComment) => void;
  onDelete: (commentId: string, replyCount: number) => void;
  deletingId: string | null;
  isNested?: boolean;
}

const getInitials = (name: string | null) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const CommentItem = ({ comment, user, onReply, onDelete, deletingId, isNested = false }: CommentItemProps) => {
  const replyCount = comment.replies?.length || 0;
  
  return (
    <div className={cn("space-y-2", isNested && "ml-8 border-l-2 border-border/30 pl-3")}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="group flex gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
      >
        <Avatar className={cn("flex-shrink-0", isNested ? "w-6 h-6" : "w-8 h-8")}>
          <AvatarImage src={comment.author?.avatar_url || undefined} />
          <AvatarFallback className="text-xs bg-primary/10 text-primary">
            {getInitials(comment.author?.full_name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("font-medium text-foreground truncate", isNested ? "text-xs" : "text-sm")}>
              {comment.author?.full_name || 'Anonymous'}
            </span>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className={cn("text-muted-foreground leading-relaxed break-words", isNested ? "text-xs" : "text-sm")}>
            {comment.content}
          </p>
          
          {/* Reply button for root comments */}
          {!isNested && user && (
            <button
              onClick={() => onReply(comment)}
              className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Reply className="w-3 h-3" />
              Reply
            </button>
          )}
        </div>

        {user?.id === comment.user_id && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(comment.id, replyCount)}
            disabled={deletingId === comment.id}
          >
            {deletingId === comment.id ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </Button>
        )}
      </motion.div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              user={user}
              onReply={onReply}
              onDelete={onDelete}
              deletingId={deletingId}
              isNested
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ postId, commentsCount, onCommentCountChange }: CommentSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<PostComment | null>(null);

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    setIsLoading(true);
    const data = await getCommentsByPost(postId);
    setComments(data);
    setIsLoading(false);
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to comment on posts.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const comment = await addComment(postId, user.id, newComment.trim(), replyingTo?.id);
    
    if (comment) {
      if (replyingTo) {
        // Add reply to existing comment
        setComments(prev => prev.map(c => {
          if (c.id === replyingTo.id) {
            return { ...c, replies: [...(c.replies || []), comment] };
          }
          return c;
        }));
        setReplyingTo(null);
      } else {
        // Add new root comment
        setComments(prev => [...prev, comment]);
      }
      setNewComment('');
      onCommentCountChange(1);
      toast({
        title: replyingTo ? "Reply added" : "Comment added",
        description: replyingTo ? "Your reply has been posted." : "Your comment has been posted.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const handleDeleteComment = async (commentId: string, replyCount: number) => {
    setDeletingId(commentId);
    const success = await deleteComment(commentId);
    
    if (success) {
      // Remove from root or from nested replies
      setComments(prev => {
        // Check if it's a root comment
        const isRoot = prev.some(c => c.id === commentId);
        if (isRoot) {
          return prev.filter(c => c.id !== commentId);
        }
        // It's a nested reply
        return prev.map(c => ({
          ...c,
          replies: c.replies?.filter(r => r.id !== commentId) || [],
        }));
      });
      // Account for the comment + its replies being deleted
      onCommentCountChange(-(1 + replyCount));
      toast({
        title: "Comment deleted",
        description: "Your comment has been removed.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      });
    }
    setDeletingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
    if (e.key === 'Escape' && replyingTo) {
      setReplyingTo(null);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
      {/* Comments list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                user={user}
                onReply={setReplyingTo}
                onDelete={handleDeleteComment}
                deletingId={deletingId}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Reply indicator */}
      <AnimatePresence>
        {replyingTo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20"
          >
            <Reply className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">
              Replying to <span className="font-medium text-foreground">{replyingTo.author?.full_name || 'Anonymous'}</span>
            </span>
            <button
              onClick={() => setReplyingTo(null)}
              className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add comment input */}
      <div className="flex items-center gap-2 pt-2">
        <Input
          placeholder={
            !user 
              ? "Sign in to comment..." 
              : replyingTo 
                ? `Reply to ${replyingTo.author?.full_name || 'Anonymous'}...`
                : "Write a comment..."
          }
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!user || isSubmitting}
          className="flex-1 text-sm h-9 bg-secondary/30 border-border/50"
        />
        <Button 
          size="icon"
          onClick={handleSubmitComment}
          disabled={!user || !newComment.trim() || isSubmitting}
          className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ease-out disabled:opacity-50 disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
