import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingInput } from '@/components/ui/floating-input';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - just close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-foreground/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md mx-4 bg-gradient-to-b from-card to-card/95 rounded-3xl shadow-2xl border border-border/50 overflow-hidden"
      >
        {/* Decorative top gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
        
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2.5 hover:bg-muted rounded-xl transition-all duration-200 hover:scale-105"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to continue to Q-AI Hub
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          <FloatingInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
          />

          <FloatingInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            showPasswordToggle
          />

          <div className="flex justify-end">
            <button type="button" className="text-sm text-primary hover:underline">
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow" size="lg">
            Sign In
          </Button>

          {/* Divider */}
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-4 text-muted-foreground">or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base rounded-xl border-2 hover:bg-muted/50 transition-all"
            size="lg"
            onClick={onClose}
          >
            <Chrome className="w-5 h-5 mr-3" />
            Login with Google
          </Button>

          <p className="text-center text-xs text-muted-foreground pt-2">
            By signing in, you agree to Qualogy's{' '}
            <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginModal;
