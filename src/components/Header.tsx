import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Bell, LogIn, Home, Grid3X3, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import qualologyLogo from "@/assets/qualogy-logo.png";
import NotificationsPopup from "./NotificationsPopup";
import LoginModal from "./LoginModal";

const Header = () => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/channels", label: "Channels", icon: Grid3X3 },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border py-2">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
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
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative">
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

              {/* Login */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-accent rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </button>
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
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <AnimatePresence>{showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}</AnimatePresence>
    </>
  );
};

export default Header;
