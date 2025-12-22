import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Sparkles, Compass, ArrowRight, Users, Filter, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getTrendingPosts, getFeedPosts, Post } from "@/services/postService";
import { getUserJoinedChannelIds, getUserJoinedChannels } from "@/services/channelService";
import { ChannelWithDetails } from "@/types/database";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const greetings = ["Hey", "Hi", "Hello", "Welcome"];

const Home = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [forYouPosts, setForYouPosts] = useState<Post[]>([]);
  const [joinedChannels, setJoinedChannels] = useState<ChannelWithDetails[]>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const fullName = user?.user_metadata?.full_name || '';
  const firstName = fullName.split(' ')[0] || 'there';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch trending posts always
      const trending = await getTrendingPosts(4);
      setTrendingPosts(trending);
      
      // Fetch user's joined channels if logged in
      if (user?.id) {
        const channels = await getUserJoinedChannels(user.id);
        setJoinedChannels(channels);
        
        // Fetch personalized feed based on joined channels
        if (channels.length > 0) {
          const channelIds = channels.map(c => c.id);
          const forYou = await getFeedPosts(channelIds);
          setForYouPosts(forYou);
        }
      }
      
      setLoading(false);
    };
    fetchData();
  }, [user?.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Filter posts by selected channel
  const filteredPosts = useMemo(() => {
    if (!selectedChannelId) return forYouPosts;
    return forYouPosts.filter(post => post.channel_id === selectedChannelId);
  }, [forYouPosts, selectedChannelId]);

  const hasJoinedChannels = joinedChannels.length > 0;

  return (
    <PageTransition>
      <div className="min-h-screen pt-16 lg:pt-18 pb-20 md:pb-8">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background to-background pointer-events-none" />
          
          <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="h-14 lg:h-16 overflow-hidden mb-4">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentGreeting}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-tight"
                  >
                    {greetings[currentGreeting]},{" "}
                    <span className="text-primary">{firstName}</span>
                  </motion.h1>
                </AnimatePresence>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-muted-foreground text-lg lg:text-xl max-w-xl mx-auto leading-relaxed"
              >
                Your central place to explore, learn and apply AI at Qualogy
              </motion.p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
            
            {/* Trending This Week Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10">
                    <TrendingUp className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-semibold text-foreground">
                    Trending This Week
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground ml-12">
                  Most discussed AI insights across Qualogy this week
                </p>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-48 w-full rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {trendingPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
                      className="relative"
                    >
                      <div className="absolute right-3 sm:right-4 top-3 sm:top-4 z-10">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-sm">
                          <TrendingUp className="w-3 h-3 text-primary" />
                          <span className="text-xs font-medium text-primary">#{index + 1}</span>
                        </div>
                      </div>
                      <PostCard post={post} variant="trending" />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>

            {/* Visual separator */}
            <div className="relative pb-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
            </div>

            {/* For You Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent">
                      <Sparkles className="w-4.5 h-4.5 text-accent-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl lg:text-2xl font-semibold text-foreground">
                        For You
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Based on your channels
                      </p>
                    </div>
                  </div>
                </div>

                {/* Channel Filter Pills */}
                {hasJoinedChannels && (
                  <div className="flex flex-wrap items-center gap-2 ml-12">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
                      <Filter className="w-3.5 h-3.5" />
                      <span>Filter:</span>
                    </div>
                    
                    {/* All Channels Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedChannelId(null)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200",
                        !selectedChannelId
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                      )}
                    >
                      {!selectedChannelId && <Check className="w-3 h-3" />}
                      All
                    </motion.button>

                    {/* Channel Pills */}
                    {joinedChannels.map((channel) => (
                      <motion.button
                        key={channel.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedChannelId(
                          selectedChannelId === channel.id ? null : channel.id
                        )}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200",
                          selectedChannelId === channel.id
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                        )}
                      >
                        {selectedChannelId === channel.id && <Check className="w-3 h-3" />}
                        {channel.name}
                      </motion.button>
                    ))}

                    {/* Clear filter button */}
                    <AnimatePresence>
                      {selectedChannelId && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedChannelId(null)}
                          className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Show empty state if no channels joined */}
              {!hasJoinedChannels ? (
                <div className="rounded-2xl bg-gradient-to-br from-secondary/30 to-accent/20 border border-border/50 p-8 text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted mx-auto mb-4">
                    <Users className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No channels joined yet
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    Join channels that interest you to see personalized posts here. Explore our channels to get started!
                  </p>
                  <Link to="/channels">
                    <Button className="gap-2">
                      <Compass className="w-4 h-4" />
                      Explore Channels
                    </Button>
                  </Link>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedChannelId || 'all'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-4 lg:grid-cols-2"
                  >
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04, duration: 0.3 }}
                        >
                          <PostCard post={post} />
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-12">
                        <p className="text-muted-foreground">No posts in this channel yet.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.section>

            {/* Visual separator */}
            <div className="relative pb-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
            </div>

            {/* Explore More Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pb-8"
            >
              <div className="rounded-2xl bg-gradient-to-br from-secondary/50 to-accent/30 border border-border/50 p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/80 border border-border/50">
                      <Compass className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Explore More Channels
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Discover more AI topics and join conversations that match your interests
                      </p>
                    </div>
                  </div>
                  <Link to="/channels">
                    <Button variant="outline" className="gap-2 group bg-background/80 hover:bg-background">
                      <span>Browse Channels</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
