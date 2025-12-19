import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronRight, User, Settings, LogOut, Camera } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { currentUser } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Profile = () => {
  const { user, signOut } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fullName = user?.user_metadata?.full_name || currentUser.name;
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('user_id', user.id)
        .single();
      
      if (data?.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    };

    fetchProfile();
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    setUploading(true);

    try {
      // Create file path: user_id/avatar.ext
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const newAvatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(newAvatarUrl);
      toast.success('Profile picture updated!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

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
          {/* Avatar with upload overlay */}
          <div className="relative inline-block">
            <Avatar className="w-24 h-24 ring-4 ring-primary/10">
              <AvatarImage src={avatarUrl || undefined} alt={fullName} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <button
              onClick={handleAvatarClick}
              disabled={uploading}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-wait"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <h1 className="text-xl lg:text-2xl font-bold text-foreground mt-4">
            {fullName}
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
