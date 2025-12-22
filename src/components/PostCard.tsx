import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, MessageSquare, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Post, getTimeAgo } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'trending';
}

const PostCard = ({ post, variant = 'default' }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isFavorited, setIsFavorited] = useState(post.isFavorited);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

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
          <AvatarImage src={post.authorAvatar} alt={post.authorName} />
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            {post.authorName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground">{post.authorName}</span>
            <span className="text-xs text-muted-foreground/60">•</span>
            <span className="text-sm text-muted-foreground">{post.authorProfession}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <span className="text-primary font-medium hover:underline cursor-pointer">
              {post.channelName}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span>{getTimeAgo(post.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-semibold text-foreground mb-2 leading-snug">{post.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{post.content}</p>
      </div>

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
          <span>{post.comments.length}</span>
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
              {post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <motion.div 
                    key={comment.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                      <AvatarFallback className="text-xs bg-secondary">
                        {comment.authorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-secondary/50 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{comment.authorName}</span>
                        <span className="text-xs text-muted-foreground">
                          {getTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{comment.content}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}

              {/* Add comment */}
              <div className="flex items-center gap-2 pt-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 text-sm bg-secondary/30 border-border/50 focus:border-primary/50"
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-primary hover:bg-primary/10"
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
