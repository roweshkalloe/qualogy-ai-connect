import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, FileText, Blocks, Briefcase, Brain, Coffee, Code, Database, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import PageTransition from '@/components/PageTransition';
import { getChannelBySlug } from '@/services/channelService';
import { getPostsByChannelSlug } from '@/services/postService';
import { getChannelGuidedPractices, getChannelTools, getChannelPrompts, getChannelShowcases } from '@/data/mockChannelContent';
import { ChannelWithDetails } from '@/types/database';
import { Post } from '@/services/postService';
import ChannelFeedTab from '@/components/channel/ChannelFeedTab';
import ChannelGuidedTab from '@/components/channel/ChannelGuidedTab';
import ChannelToolsTab from '@/components/channel/ChannelToolsTab';
import ChannelPromptsTab from '@/components/channel/ChannelPromptsTab';
import ChannelShowcasesTab from '@/components/channel/ChannelShowcasesTab';

const iconMap: Record<string, React.ElementType> = {
  Blocks, Briefcase, Brain, Coffee, Code, Database, Server, Users,
};

const tabs = [
  { id: 'feed', label: 'Feed' },
  { id: 'guided', label: 'Guided Practice' },
  { id: 'tools', label: 'Tool Library' },
  { id: 'prompts', label: 'Prompt Library' },
  { id: 'showcases', label: 'Showcases' },
];

const ChannelDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('feed');
  const [channel, setChannel] = useState<ChannelWithDetails | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      
      const [channelData, postsData] = await Promise.all([
        getChannelBySlug(slug),
        getPostsByChannelSlug(slug),
      ]);
      
      setChannel(channelData);
      setPosts(postsData);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-16 lg:pt-18 pb-20 md:pb-8">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="flex items-start gap-4">
              <Skeleton className="w-16 h-16 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Channel not found</h1>
          <Button variant="outline" onClick={() => navigate('/channels')}>
            Back to Channels
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[channel.icon] || Blocks;
  const guidedPractices = getChannelGuidedPractices(channel.id);
  const tools = getChannelTools(channel.id);
  const prompts = getChannelPrompts(channel.id);
  const showcases = getChannelShowcases(channel.id);

  const handleJoinToggle = () => {
    setJoined(!joined);
  };

  return (
    <PageTransition>
    <div className="min-h-screen pt-16 lg:pt-18 pb-20 md:pb-8">
      {/* Channel Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full bg-gradient-to-br from-primary/5 via-background to-accent/20 border-b border-primary/10"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/channels')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Channels</span>
          </motion.button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-sm" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-transparent border border-primary/10 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                </div>
              </motion.div>
              
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl lg:text-3xl font-bold text-foreground"
                >
                  {channel.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-muted-foreground mt-1 max-w-xl"
                >
                  {channel.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 mt-3 text-sm text-muted-foreground"
                >
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {channel.member_count} members
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {channel.post_count} posts
                  </span>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant={joined ? 'outline' : 'default'}
                size="lg"
                onClick={handleJoinToggle}
                className={joined ? 'border-primary/30 hover:bg-primary/5' : ''}
              >
                {joined ? 'Leave Channel' : 'Join Channel'}
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </motion.header>

      {/* Channel Navigation */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-12 bg-transparent p-0 gap-1 overflow-x-auto flex-nowrap justify-start">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="px-4 py-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-lg transition-all whitespace-nowrap"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'feed' && <ChannelFeedTab posts={posts} channelName={channel.name} />}
            {activeTab === 'guided' && <ChannelGuidedTab practices={guidedPractices} />}
            {activeTab === 'tools' && <ChannelToolsTab tools={tools} />}
            {activeTab === 'prompts' && <ChannelPromptsTab prompts={prompts} />}
            {activeTab === 'showcases' && <ChannelShowcasesTab showcases={showcases} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </PageTransition>
  );
};

export default ChannelDetail;
