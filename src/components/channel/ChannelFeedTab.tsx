import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/PostCard';
import { Post } from '@/services/postService';

interface ChannelFeedTabProps {
  posts: Post[];
  channelName: string;
}

const ChannelFeedTab = ({ posts, channelName }: ChannelFeedTabProps) => {
  const [sortBy, setSortBy] = useState<'recent' | 'liked'>('recent');

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'liked') {
      return b.likes_count - a.likes_count;
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  if (posts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-4"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <MessageSquareText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Be the first to share something in {channelName}!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Sort controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-6"
      >
        <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
        <Button
          variant={sortBy === 'recent' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setSortBy('recent')}
          className="gap-1.5"
        >
          <Clock className="w-3.5 h-3.5" />
          Recent
        </Button>
        <Button
          variant={sortBy === 'liked' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setSortBy('liked')}
          className="gap-1.5"
        >
          <Heart className="w-3.5 h-3.5" />
          Most Liked
        </Button>
      </motion.div>

      {/* Posts */}
      <div className="space-y-4">
        {sortedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChannelFeedTab;
