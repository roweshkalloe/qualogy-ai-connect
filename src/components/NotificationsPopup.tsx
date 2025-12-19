import { motion } from 'framer-motion';
import { Heart, Info, MessageSquare, Sparkles, X } from 'lucide-react';
import { notifications, getTimeAgo } from '@/data/mockData';

interface NotificationsPopupProps {
  onClose: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-4 h-4" />,
  Info: <Info className="w-4 h-4" />,
  MessageSquare: <MessageSquare className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
};

const NotificationsPopup = ({ onClose }: NotificationsPopupProps) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Popup */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card rounded-xl shadow-lg border border-border z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Notifications list */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border last:border-0 ${
                !notification.isRead ? 'bg-accent/30' : ''
              }`}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                notification.type === 'like' ? 'bg-primary/10 text-primary' :
                notification.type === 'comment' ? 'bg-blue-100 text-blue-600' :
                notification.type === 'system' ? 'bg-muted text-muted-foreground' :
                'bg-accent text-accent-foreground'
              }`}>
                {iconMap[notification.icon]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm text-foreground">
                    {notification.title}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {getTimeAgo(notification.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                  {notification.message}
                </p>
              </div>

              {/* Unread indicator */}
              {!notification.isRead && (
                <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border bg-muted/30">
          <button className="w-full text-sm text-primary font-medium hover:underline">
            View all notifications
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default NotificationsPopup;
