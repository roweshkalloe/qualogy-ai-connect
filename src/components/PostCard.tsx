import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, MessageSquare, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Post, getTimeAgo } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-5 card-interactive"
    >
      {/* Author header */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar className="w-10 h-10 ring-2 ring-border">
          <AvatarImage src={post.authorAvatar} alt={post.authorName} />
          <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground">{post.authorName}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{post.authorProfession}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <span className="text-primary font-medium">{post.channelName}</span>
            <span>•</span>
            <span>{getTimeAgo(post.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-border">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            isLiked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </button>

        <button
          onClick={handleFavorite}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            isFavorited ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'
          }`}
        >
          <Star className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{post.comments.length}</span>
          {showComments ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-border space-y-3"
        >
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                  <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{comment.authorName}</span>
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2">
              No comments yet. Be the first to comment!
            </p>
          )}

          {/* Add comment */}
          <div className="flex items-center gap-2 pt-2">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 text-sm"
            />
            <Button size="icon" variant="ghost" className="text-primary">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </motion.article>
  );
};

export default PostCard;
