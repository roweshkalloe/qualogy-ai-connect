import { motion } from 'framer-motion';
import { Star, ChevronRight, User, Settings, LogOut } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { currentUser } from '@/data/mockData';

const Profile = () => {
  const stats = [
    { label: 'Posts', value: currentUser.stats.posts },
    { label: 'Likes', value: currentUser.stats.likes },
    { label: 'Following', value: currentUser.stats.following },
  ];

  const contentItems = [
    { icon: Star, label: 'Favorite Posts' },
  ];

  const settingsItems = [
    { icon: User, label: 'Edit Profile' },
    { icon: Settings, label: 'App Settings' },
    { icon: LogOut, label: 'Sign Out', danger: true },
  ];

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-6 lg:p-8 text-center"
        >
          <Avatar className="w-24 h-24 mx-auto ring-4 ring-primary/10">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <h1 className="text-xl lg:text-2xl font-bold text-foreground mt-4">
            {currentUser.name}
          </h1>
          <p className="text-primary font-medium mt-1">{currentUser.profession}</p>
          
          <Badge variant="secondary" className="mt-3 text-sm font-medium">
            {currentUser.badge}
          </Badge>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-4 text-center"
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-2xl lg:text-3xl font-bold text-foreground"
              >
                {stat.value}
              </motion.p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.section>

        {/* Content Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-3">Content</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {contentItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 text-left font-medium text-foreground">
                  {item.label}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </motion.section>

        {/* Settings Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-3">Settings</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            {settingsItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 transition-colors ${
                  item.danger ? 'text-destructive' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.danger ? 'bg-destructive/10' : 'bg-muted'
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    item.danger ? 'text-destructive' : 'text-muted-foreground'
                  }`} />
                </div>
                <span className={`flex-1 text-left font-medium ${
                  item.danger ? 'text-destructive' : 'text-foreground'
                }`}>
                  {item.label}
                </span>
                <ChevronRight className={`w-5 h-5 ${
                  item.danger ? 'text-destructive/50' : 'text-muted-foreground'
                }`} />
              </button>
            ))}
          </div>
        </motion.section>
      </div>
    </MainLayout>
  );
};

export default Profile;
