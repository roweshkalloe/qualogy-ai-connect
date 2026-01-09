import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bell, LogOut, Home, Grid3X3, User, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageToggler from "./LanguageToggler";
import ThemeToggler from "./ThemeToggler";
import { motion, AnimatePresence } from "framer-motion";
import qualologyLogo from "@/assets/qualogy-logo.png";
import NotificationsPopup from "./NotificationsPopup";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  // Extract first name from full_name
  const fullName = user?.user_metadata?.full_name || '';
  const firstName = fullName.split(' ')[0] || 'User';
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  // Fetch user profile with avatar
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setAvatarUrl(null);
        return;
      }
      
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

  const navItems = [
    { path: "/home", labelKey: "nav.home", icon: Home },
    { path: "/channels", labelKey: "nav.channels", icon: Grid3X3 },
    { path: "/profile", labelKey: "nav.profile", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/', { replace: true });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <img src={qualologyLogo} alt="Qualogy" className="h-8 lg:h-9" />
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link flex items-center gap-2 py-2 text-md ${
                    isActive(item.path) ? "active text-primary" : ""
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggler */}
              <LanguageToggler />

              {/* Theme Toggler */}
              <ThemeToggler />

              {/* Notifications */}
              <div className="relative ml-2">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="btn-icon"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="notification-dot" />
                </button>

                <AnimatePresence>
                  {showNotifications && <NotificationsPopup onClose={() => setShowNotifications(false)} />}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 text-md font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarImage src={avatarUrl || undefined} alt={firstName} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{firstName}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 z-[100]">
                  <DropdownMenuItem 
                    onClick={() => setShowLogoutDialog(true)}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("common.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 pb-safe">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium transition-colors ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? "text-primary" : ""}`} />
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("auth.logoutConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("auth.logoutConfirmDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut}>
              {t("common.logout")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Header;
