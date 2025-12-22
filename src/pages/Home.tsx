import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Sparkles, Zap, ArrowRight } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import PostCard from "@/components/PostCard";
import { currentUser, getTrendingPosts, getForYouPosts } from "@/data/mockData";

const greetings = ["Hey", "Hi", "Hello", "Welcome back"];

const Home = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const trendingPosts = getTrendingPosts();
  const forYouPosts = getForYouPosts(currentUser.id, currentUser.joinedChannels);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-16 lg:pt-18 pb-20 md:pb-8">
      {/* Hero Section - Full Width */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full bg-gradient-to-br from-primary/5 via-background to-accent/30 border-b border-primary/10 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/30 rounded-full blur-2xl"
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left content */}
            <div className="flex-1 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4"
              >
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">Welcome back</span>
              </motion.div>
              
              <div className="h-12 lg:h-14 overflow-hidden mb-2">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentGreeting}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight"
                  >
                    {greetings[currentGreeting]}, <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{currentUser.name.split(" ")[0]}</span> 👋
                  </motion.h1>
                </AnimatePresence>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-base lg:text-lg"
              >
                Discover what's happening in your AI community today
              </motion.p>
            </div>

            {/* Right content - Stats cards */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 lg:gap-4"
            >
              <div className="flex flex-col items-center justify-center px-5 py-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 min-w-[100px]">
                <span className="text-2xl font-bold text-foreground">{trendingPosts.length}</span>
                <span className="text-xs text-muted-foreground">Trending</span>
              </div>
              <div className="flex flex-col items-center justify-center px-5 py-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 min-w-[100px]">
                <span className="text-2xl font-bold text-primary">{forYouPosts.length}</span>
                <span className="text-xs text-muted-foreground">For You</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Trending Posts */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Trending This Week</h2>
            </div>
            <div className="grid gap-4">
              {trendingPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* For You Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">For You</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Personalized content from your joined channels</p>
            <div className="grid gap-4 lg:grid-cols-2">
              {forYouPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
