import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Blocks, Palette, Coffee, Brain, Cloud, Users, TrendingUp, Megaphone } from 'lucide-react';
import { Channel } from '@/data/mockData';

interface ChannelCardProps {
  channel: Channel;
  isJoined?: boolean;
  delay?: number;
}

const iconMap: Record<string, React.ElementType> = {
  Blocks: Blocks,
  Palette: Palette,
  Coffee: Coffee,
  Brain: Brain,
  Cloud: Cloud,
  Users: Users,
  TrendingUp: TrendingUp,
  Megaphone: Megaphone,
};

const ChannelCard = ({ channel, isJoined = false, delay = 0 }: ChannelCardProps) => {
  const navigate = useNavigate();
  const IconComponent = iconMap[channel.icon] || Blocks;

  const handleClick = () => {
    navigate(`/channels/${channel.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={handleClick}
      className="group flex items-center gap-4 p-4 bg-card rounded-xl border border-border card-interactive cursor-pointer"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${channel.color}`}>
        <IconComponent className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground truncate">{channel.name}</h3>
          {isJoined && (
            <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate mt-0.5">
          {channel.description}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </motion.div>
  );
};

export default ChannelCard;
