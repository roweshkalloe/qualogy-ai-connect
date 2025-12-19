import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";
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
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/5 via-background to-accent/30 rounded-2xl p-6 lg:p-8 border border-primary/10"
        >
          <p className="text-muted-foreground text-sm mb-1">Welcome back</p>
          <div className="h-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentGreeting}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-2xl lg:text-3xl font-bold text-foreground"
              >
                {greetings[currentGreeting]}, <span className="text-primary">{currentUser.name.split(" ")[0]}</span> 👋
              </motion.h1>
            </AnimatePresence>
          </div>
          <p className="text-muted-foreground mt-2 text-sm lg:text-base">
            Discover what's happening in your AI community today
          </p>
        </motion.section>

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
    </MainLayout>
  );
};

export default Home;
