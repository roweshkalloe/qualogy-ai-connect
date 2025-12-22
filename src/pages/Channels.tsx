import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import PageTransition from '@/components/PageTransition';
import ChannelCard from '@/components/ChannelCard';
import { FloatingInput } from '@/components/ui/floating-input';
import { currentUser, getJoinedChannels, getDiscoverChannels } from '@/data/mockData';

const Channels = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const joinedChannels = getJoinedChannels(currentUser.joinedChannels);
  const discoverChannels = getDiscoverChannels(currentUser.joinedChannels);

  const filterChannels = (channels: typeof joinedChannels) => {
    if (!searchQuery.trim()) return channels;
    return channels.filter(
      (channel) =>
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredJoined = filterChannels(joinedChannels);
  const filteredDiscover = filterChannels(discoverChannels);

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

        {/* Your Channels */}
        {filteredJoined.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Your Profession
            </h2>
            <div className="space-y-3">
              {filteredJoined.map((channel, index) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  isJoined
                  delay={index * 0.05}
                />
              ))}
            </div>
          </section>
        )}

        {/* Discover */}
        {filteredDiscover.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Discover
            </h2>
            <div className="space-y-3">
              {filteredDiscover.map((channel, index) => (
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
        {filteredJoined.length === 0 && filteredDiscover.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              No channels found matching "{searchQuery}"
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
    </PageTransition>
  );
};

export default Channels;
