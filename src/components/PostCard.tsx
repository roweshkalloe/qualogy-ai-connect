import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, MessageSquare, ChevronDown, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Post } from '@/services/postService';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'trending';
}

const PostCard = ({ post, variant = 'default' }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [isFavorited, setIsFavorited] = useState(post.is_favorited || false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        "bg-card rounded-xl border p-5 transition-shadow duration-300",
        variant === 'trending' 
          ? "border-primary/20 shadow-[0_0_0_1px_hsl(var(--primary)/0.05)] hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.15)]" 
          : "border-border hover:shadow-[0_8px_30px_-12px_hsl(var(--foreground)/0.1)]"
      )}
    >
      {/* Author header */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar className="w-10 h-10 ring-2 ring-border/50 transition-all duration-200 hover:ring-primary/30">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            Q
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground">Qualogy Team</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <span className="text-primary font-medium hover:underline cursor-pointer">
              {post.channel_name || 'Channel'}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-semibold text-foreground mb-2 leading-snug">{post.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-border/50">
        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200",
            isLiked 
              ? 'text-primary bg-primary/10' 
              : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
          )}
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={cn("w-4 h-4", isLiked && 'fill-current')} />
          </motion.div>
          <span>{likesCount}</span>
        </motion.button>

        <motion.button
          onClick={handleFavorite}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200",
            isFavorited 
              ? 'text-amber-500 bg-amber-500/10' 
              : 'text-muted-foreground hover:text-amber-500 hover:bg-amber-500/5'
          )}
        >
          <motion.div
            animate={isFavorited ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Star className={cn("w-4 h-4", isFavorited && 'fill-current')} />
          </motion.div>
        </motion.button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{post.comments_count}</span>
          <motion.div
            animate={{ rotate: showComments ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3 h-3" />
          </motion.div>
        </button>
      </div>

      {/* Comments section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
              {post.comments_count === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {post.comments_count} comment{post.comments_count !== 1 ? 's' : ''}
                </p>
              )}

              {/* Add comment */}
              <div className="flex items-center gap-2 pt-2 pb-1">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 text-sm h-9 bg-secondary/30 border-border/50 focus:border-primary/50"
                />
                <Button 
                  size="icon" 
                  variant="soft" 
                  className="h-9 w-9 rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default PostCard;
