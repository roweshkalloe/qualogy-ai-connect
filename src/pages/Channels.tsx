import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import PageTransition from '@/components/PageTransition';
import ChannelCard from '@/components/ChannelCard';
import { FloatingInput } from '@/components/ui/floating-input';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface Channel {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  member_count: number;
  post_count: number;
  color: string;
}

const Channels = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching channels:', error);
      } else {
        setChannels(data || []);
      }
      setLoading(false);
    };

    fetchChannels();
  }, []);

  const filterChannels = (channelList: Channel[]) => {
    if (!searchQuery.trim()) return channelList;
    return channelList.filter(
      (channel) =>
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (channel.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    );
  };

  const filteredChannels = filterChannels(channels);

  return (
    <PageTransition>
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Channels</h1>
          <p className="text-muted-foreground">
            Explore communities and find your tribe
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <FloatingInput
            id="channel-search"
            label="Search communities..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </button>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        )}

        {/* Channels */}
        {!loading && filteredChannels.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              All Channels
            </h2>
            <div className="space-y-3">
              {filteredChannels.map((channel, index) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {!loading && filteredChannels.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              {searchQuery ? `No channels found matching "${searchQuery}"` : 'No channels available'}
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
    </PageTransition>
  );
};

export default Channels;